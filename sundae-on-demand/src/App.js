import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetail";

function App() {
	return (
		<Container>
			<OrderDetailsProvider>
				{/* Summary page, entry page에서 provider가 필요하다 */}
				<OrderEntry />
			</OrderDetailsProvider>
			{/* 확인 페이지는 provider가 필요하지 않다. */}
		</Container>
	);
}

export default App;
