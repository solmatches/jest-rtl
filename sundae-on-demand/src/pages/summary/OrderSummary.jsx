import { useOrderDetails } from "../../contexts/OrderDetail";
import SummaryForm from "./SummaryForm";

export default function OrderSummary({ setOrderPhase }) {
	const [orderDetails] = useOrderDetails();

	const scoopArray = Object.entries(orderDetails.scoops);
	const scoopList = scoopArray.map(([key, value]) => (
		<li key={key}>
			{key} {value}
		</li>
	));

	const toppingArray = Object.keys(orderDetails.toppings);
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
