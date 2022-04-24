import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

describe("Summary Form", () => {
	test("최초에는 체크되지 않은 체크박스와 비활성화된 버튼이 있다.", () => {
		render(<SummaryForm />);

		const checkbox = screen.getByRole("checkbox", {
			name: "이용약관",
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

describe("Popover", () => {
	test("hover하면 popover가 응답한다.", async () => {
		render(<SummaryForm />);

		// 시작할 때는 popover 숨김.
		// -- 화면에 없는 요소를 선택할 때는 'query'를 사용한다
		const nullPopover =
			screen.queryByText(/아이스크림이 배달되지 않습니다./);
		expect(nullPopover).not.toBeInTheDocument();

		// checkbox label에 mouseover를 할 때 popover가 나타남.
		const termsAndConditions = screen.getByText(/terms and conditions/i);
		const user = userEvent.setup();

		await user.hover(termsAndConditions);
		const popover = screen.getByText(/아이스크림이 배달되지 않습니다./);
		expect(popover).toBeInTheDocument();

		// mouseout을 하면 popover가 사라짐.
		await user.unhover(termsAndConditions);

		const nullPopoverAgain =
			screen.queryByText(/아이스크림이 배달되지 않습니다./);

		// -- popover가 사라질 때까지 기다림
		await waitFor(() => {
			expect(nullPopoverAgain).not.toBeInTheDocument();
		});
	});
});
