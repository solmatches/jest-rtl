import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { replaceCamelWithSpaces, colors } from "./App";

test("button has correct initial color", () => {
	render(<App />);

	const colorButton = screen.getByRole("button", {
		name: `Change to ${colors.changed}`,
	});
	expect(colorButton).toHaveStyle({ backgroundColor: colors.initial });

	fireEvent.click(colorButton);
	expect(colorButton).toHaveStyle({ backgroundColor: colors.changed });

	expect(colorButton.textContent).toBe(`Change to ${colors.initial}`);
});

test("initial conditions", () => {
	render(<App />);

	const colorButton = screen.getByRole("button", {
		name: `Change to ${colors.changed}`,
	});

	expect(colorButton).toBeEnabled();

	const checkbox = screen.getByRole("checkbox");
	expect(checkbox).not.toBeChecked();

	fireEvent.click(checkbox);
	expect(checkbox).toBeChecked();
});

test("Checkbox disables button on first click and enables on second click", () => {
	render(<App />);

	const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
	const colorButton = screen.getByRole("button", {
		name: `Change to ${colors.changed}`,
	});

	fireEvent.click(checkbox);
	expect(colorButton).toBeDisabled();

	fireEvent.click(checkbox);
	expect(colorButton).toBeEnabled();
});

test("버튼이 비활성화되면 회색이되고 활성화되면 붉은색으로 변한다.", async () => {
	render(<App />);

	const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
	const colorButton = screen.getByRole("button", {
		name: `Change to ${colors.changed}`,
	});
	const user = userEvent.setup();

	await user.click(checkbox);
	expect(colorButton).toBeDisabled();
	expect(colorButton).toHaveStyle({ backgroundColor: colors.disabled });

	await user.click(checkbox);
	expect(colorButton).toBeEnabled();
	expect(colorButton).toHaveStyle({ backgroundColor: colors.initial });
});

test("버튼이 비활성화되면 회색이되고 활성화되면 파란색으로 변한다.", async () => {
	render(<App />);

	const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
	const colorButton = screen.getByRole("button", {
		name: `Change to ${colors.changed}`,
	});
	const user = userEvent.setup();

	await user.click(colorButton);

	await user.click(checkbox);
	expect(colorButton).toBeDisabled();
	expect(colorButton).toHaveStyle({ backgroundColor: colors.disabled });

	await user.click(checkbox);
	expect(colorButton).toBeEnabled();
	expect(colorButton).toHaveStyle({ backgroundColor: colors.changed });
});

describe("카멜케이스에서 대문자 앞에 공백을 추가한다.", () => {
	test("내부에 대문자가 없는 경우", () => {
		expect(replaceCamelWithSpaces("Red")).toBe("Red");
	});
	test("내부에 대문자가 하나가 있는 경우", () => {
		expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
	});
	test("내부에 여러개의 대문자가 있는 경우", () => {
		expect(replaceCamelWithSpaces("MediumVioletRed")).toBe(
			"Medium Violet Red"
		);
	});
});
