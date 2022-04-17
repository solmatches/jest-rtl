import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetail";

// 스쿱이 변하면 스쿱의 합계를 업데이트 한다.
describe("스쿱의 input 개수가 변하면 스쿱의 합계를 업데이트한다.", () => {
	// -- 합계는 0원으로 시작.
	test("합계는 0원으로 시작한다.", () => {
		render(<Options optionType="scoops" />, {
			wrapper: OrderDetailsProvider,
		});

		// -- getBy.. 할 때 텍스트가 정확하지 않은 경우 option.exact를 false로 변경해야한다.
		const scoopSubTotal = screen.getByText("Scoops 합계:", {
			exact: false,
		});
		expect(scoopSubTotal).toHaveTextContent("0원");
	});
	// -- 바닐라 스쿱이 1로 변하면 합계를 확인한다.
	test("바닐라 스쿱이 1로 변하면 합계를 업데이트 한다.", async () => {
		render(<Options optionType="scoops" />, {
			wrapper: OrderDetailsProvider,
		});
		const user = userEvent.setup();
		const vanillaInput = await screen.findByRole("spinbutton", {
			// option을 렌더하기전에 서버에서 데이터를 받은 후 렌더하기 때문에 비동기로 처리해야함으로 `find`를 사용
			name: "Vanilla",
		});

		// input의 초기값이 0이겠지만 커서가 0의 앞, 뒤 어디에 있을지 모른다.
		// 만약 앞에 있을 경우 10 이 입력되는 문제가 발생할 수 있으므로 시작전 clear를 해준다.
		await user.clear(vanillaInput);
		await user.type(vanillaInput, "1");
		expect(vanillaInput).toHaveValue(1);

		const scoopSubTotal = screen.getByText("Scoops 합계:", {
			exact: false,
		});
		expect(scoopSubTotal).toHaveTextContent("2,000원");
	});

	test("초코렛 스쿱이 2로 변하면 합계를 업데이트 한다.", async () => {
		render(<Options optionType="scoops" />, {
			wrapper: OrderDetailsProvider,
		});
		const user = userEvent.setup();
		const chocolateInput = await screen.findByRole("spinbutton", {
			name: "Chocolate",
		});

		// input의 초기값이 0이겠지만 커서가 0의 앞, 뒤 어디에 있을지 모른다.
		// 만약 앞에 있을 경우 10 이 입력되는 문제가 발생할 수 있으므로 시작전 clear를 해준다.
		await user.clear(chocolateInput);
		await user.type(chocolateInput, "2");
		expect(chocolateInput).toHaveValue(2);

		const scoopSubTotal = screen.getByText("Scoops 합계:", {
			exact: false,
		});
		expect(scoopSubTotal).toHaveTextContent("4,000원");
	});
});
