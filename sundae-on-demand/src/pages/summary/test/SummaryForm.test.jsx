import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

describe("Summary Form", () => {
	test("최초에는 체크되지 않은 체크박스와 비활성화된 버튼이 있다.", () => {
		render(<SummaryForm />);

		const checkbox = screen.getByRole("checkbox", {
			name: "I agree to Terms and Conditions",
		});

		expect(checkbox).not.toBeChecked();

		const button = screen.getByRole("button");

		expect(button).toHaveTextContent("Confirm order");
		expect(button).toBeDisabled();
	});

	test("체크박스를 한 번 클릭하면 버튼이 활성화되고, 두번 째 클릭하면 비활성화 된다.", async () => {
		render(<SummaryForm />);

		const checkbox = screen.getByRole("checkbox");
		const button = screen.getByRole("button");
		const user = userEvent.setup();

		await user.click(checkbox);
		expect(checkbox).toBeChecked();
		expect(button).toBeEnabled();

		await user.click(checkbox);
		expect(checkbox).not.toBeChecked();
		expect(button).toBeDisabled();
	});
});
