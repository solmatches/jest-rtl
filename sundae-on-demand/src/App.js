import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetail";
import { useState } from "react";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import OrderSummary from "./pages/summary/OrderSummary";

function App() {
	const [orderPhase, setOrderPhase] = useState();

	let Component = OrderEntry;
	switch (orderPhase) {
		case "inProgress":
			Component = OrderEntry;
			break;
		case "review":
			Component = OrderSummary;
			break;
		case "completed":
			Component = OrderConfirmation;
			break;
		default:
			Component = OrderEntry;
	}
	return (
		<OrderDetailsProvider>
			<Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
		</OrderDetailsProvider>
	);
}

export default App;
