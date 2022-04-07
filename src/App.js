import { useState } from "react";

export function replaceCamelWithSpaces(colorName) {
	const capitalLetterReg = /\B([A-Z])\B/g;
	return colorName.replace(capitalLetterReg, " $1");
}

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
				style={{ backgroundColor: disabled ? "gray" : buttonColor }}
				onClick={() => setButtonColor(newButtonColor)}>
				Change to {newButtonColor}
			</button>
			<input
				type="checkbox"
				id="disabled-button-checkbox"
				defaultChecked={disabled}
				aria-checked={disabled}
				onChange={handleButtonDisabled}
			/>
			<label htmlFor="disabled-button-checkbox">Disable button</label>
		</div>
	);
}

export default App;
