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

test("버튼이 비활성화되면 회색이되고 활성화되면 붉은색으로 변한다.", async () => {
	render(<App />);

	const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
	const colorButton = screen.getByRole("button", { name: "Change to blue" });
	const user = userEvent.setup();

	await user.click(checkbox);
	expect(colorButton).toBeDisabled();
	expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

	await user.click(checkbox);
	expect(colorButton).toBeEnabled();
	expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});

test("버튼이 비활성화되면 회색이되고 활성화되면 파란색으로 변한다.", async () => {
	render(<App />);

	const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
	const colorButton = screen.getByRole("button", { name: "Change to blue" });
	const user = userEvent.setup();

	await user.click(colorButton);

	await user.click(checkbox);
	expect(colorButton).toBeDisabled();
	expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

	await user.click(checkbox);
	expect(colorButton).toBeEnabled();
	expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
});
