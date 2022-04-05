import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("button has correct initial color", () => {
	render(<App />);

	const colorButton = screen.getByRole("button", { name: "Change to blue" });
	expect(colorButton).toHaveStyle({ backgroundColor: "red" });

	fireEvent.click(colorButton);
	expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

	expect(colorButton.textContent).toBe("Change to red");
});

test("initial conditions", () => {
	render(<App />);

	const colorButton = screen.getByRole("button", { name: "Change to blue" });

	expect(colorButton).toBeEnabled();

	const checkbox = screen.getByRole("checkbox");
	expect(checkbox).not.toBeChecked();

	fireEvent.click(checkbox);
	expect(checkbox).toBeChecked();
});

test("Checkbox disables button on first click and enables on second click", () => {
	render(<App />);

	const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
	const colorButton = screen.getByRole("button", { name: "Change to blue" });

	fireEvent.click(checkbox);
	expect(colorButton).toBeDisabled();

	fireEvent.click(checkbox);
	expect(colorButton).toBeEnabled();
});

test("버튼이 비활성화되면 회색이되고 활성화되면 붉은색으로 변한다. 그리고 버튼 색상이 바뀌고 버튼이 비활성화 되면 다시 버튼은 회색. 버튼을 활성화 시키면 버튼은 파란색이다.", () => {
	render(<App />);

	const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
	const colorButton = screen.getByRole("button", { name: "Change to blue" });
	const user = userEvent.setup();

	user.click(checkbox);
	expect(colorButton).toBeDisabled();
	expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

	user.click(checkbox);
	expect(colorButton).toBeEnabled();
	expect(colorButton).toHaveStyle({ background: "red" });

	user.click(colorButton);
	user.click(checkbox);
	expect(colorButton).toBeDisabled();
	expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

	user.click(checkbox);
	expect(colorButton).toBeEnabled();
	expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
});
