import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetail";
import Options from "./Options";

export default function OrderEntry({ setOrderPhase }) {
	const [orderDetail] = useOrderDetails();

	return (
		<div>
			<h1>당신의 Sundae 아이스크림을 골라보세요!</h1>
			<Options optionType="scoops" />
			<Options optionType="toppings" />
			<h2>총 합계: {orderDetail.totals.grandTotal}</h2>
			<Button onClick={() => setOrderPhase("review")}>주문하기</Button>
		</div>
	);
}
