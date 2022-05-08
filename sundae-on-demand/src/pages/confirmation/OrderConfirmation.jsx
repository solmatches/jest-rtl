import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetail";

export default function OrderConfirmation({ setOrderPhase }) {
	const [, , resetOrder] = useOrderDetails();
	const [orderNumber, setOrderNumber] = useState(null);

	function handleClick() {
		resetOrder();

		setOrderPhase("inProgress");
	}

	useEffect(() => {
		axios
			.post(`http://localhost:3030/order`)
			.then((response) => {
				const { orderNumber } = response.data;

				if (orderNumber) {
					setOrderNumber(orderNumber);
				}
			})
			.catch((error) => {
				// TODO: handle error
				console.log(error);
			});
	}, []);

	if (orderNumber) {
		return (
			<div style={{ textAlign: "center" }}>
				<h1>감사합니다!</h1>
				<p>주문번호는 {orderNumber} 입니다.</p>
				<p style={{ fontSize: "25%" }}>
					이용 약관에따라 아무일도 일어나지 않을 것입니다.
				</p>
				<Button onClick={handleClick}>재주문</Button>
			</div>
		);
	}
	return <div>Loading</div>;
}
