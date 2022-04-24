import { useOrderDetails } from "../../contexts/OrderDetail";
import SummaryForm from "./SummaryForm";

export default function OrderSummary({ setOrderPhase }) {
	const [orderDetails] = useOrderDetails();

    // FIX: orderDetails.scoops.entries()
	const scoopArray = Array.from(orderDetails.scoops.entries());
	const scoopList = scoopArray.map(([key, value]) => (
		<li key={key}>
			{value} {key}
		</li>
	));

	const toppingArray = Array.from(orderDetails.toppings.keys());
	const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);

	return (
		<div>
			<h1>주문내역</h1>
			<h2>Scoops: {orderDetails.totals.scoops}</h2>
			<ul>{scoopList}</ul>
			<h2>Toppings: {orderDetails.totals.toppings}</h2>
			<ul>{toppingList}</ul>
			<SummaryForm setOrderPhase={setOrderPhase} />
		</div>
	);
}
