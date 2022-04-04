import { useState } from "react";

const initialColor = "red";

function App() {
	const [disabled, setDisabled] = useState(false);
	const [buttonColor, setButtonColor] = useState(initialColor);
	const newButtonColor = buttonColor === initialColor ? "blue" : initialColor;

	const handleButtonDisabled = (event) => {
		setDisabled(event.target.checked);
	};

	return (
		<div>
			<button
				disabled={disabled}
				style={{ backgroundColor: buttonColor }}
				onClick={() => setButtonColor(newButtonColor)}>
				Change to {newButtonColor}
			</button>
			<input
				type="checkbox"
				defaultChecked={disabled}
				aria-checked={disabled}
				onChange={handleButtonDisabled}
			/>
		</div>
	);
}

export default App;
