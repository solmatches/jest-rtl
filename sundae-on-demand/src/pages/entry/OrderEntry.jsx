import { useOrderDetails } from "../../contexts/OrderDetail";
import Options from "./Options";

export default function OrderEntry() {
	const [orderDetail, updateItemCount] = useOrderDetails();

	return (
		<div>
			<Options optionType="scoops" />
			<Options optionType="toppings" />
			<h2>총 합계: {orderDetail.totals.grandTotal}원</h2>
		</div>
	);
}
