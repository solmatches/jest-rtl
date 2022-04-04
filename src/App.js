import { useState } from "react";

const initialColor = "red";

function App() {
	const [buttonColor, setButtonColor] = useState(initialColor);
	const newButtonColor = buttonColor === initialColor ? "blue" : initialColor;
	return (
		<div>
			<button
				style={{ backgroundColor: buttonColor }}
				onClick={() => setButtonColor(newButtonColor)}>
				Change to {newButtonColor}
			</button>
		</div>
	);
}

export default App;
