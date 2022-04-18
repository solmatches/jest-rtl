import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { pricePerItem } from "../constants";

const zeroCurrency = formatCurrency(0);

function formatCurrency(amount) {
	return `${new Intl.NumberFormat().format(amount)}원`;
}
const OrderDetails = createContext();

export function useOrderDetails() {
	const context = useContext(OrderDetails);
	if (!context) {
		throw new Error(
			"useOrderDetails는 OrderDetailsProvider와 함께 사용되어야 합니다"
		);
	}
	return context;
}

function calculateSubtotal(optionType, optionCounts) {
	const optionCount = Object.values(optionCounts[optionType]).reduce(
		(pre, current) => (pre += current),
		0
	);

	return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
	const [optionCounts, setOptionCounts] = useState({
		scoops: [],
		toppings: [],
	});

	const [totals, setTotals] = useState({
		scoops: zeroCurrency,
		toppings: zeroCurrency,
		grandTotal: zeroCurrency,
	});

	useEffect(() => {
		const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
		const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
		const grandTotal = scoopsSubtotal + toppingsSubtotal;

		setTotals({
			scoops: formatCurrency(scoopsSubtotal),
			toppings: formatCurrency(toppingsSubtotal),
			grandTotal: formatCurrency(grandTotal),
		});
	}, [optionCounts]);

	const value = useMemo(() => {
		function updateItemCount(itemName, newItemCount, optionType) {
			setOptionCounts((counts) => ({
				...counts,
				[optionType]: {
					...counts[optionType],
					[itemName]: newItemCount,
				},
			}));
		}
		return [{ ...optionCounts, totals }, updateItemCount];
	}, [optionCounts, totals]);

	return <OrderDetails.Provider value={value} {...props} />;
}
