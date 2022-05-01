import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("올바른 주문 단계", async () => {
	// 앱이 렌더되면
	render(<App />);

	// 아이스크립 스쿱과 토핑이 추가되고
	const user = userEvent.setup();
	const vanillaInput = await screen.findByRole("spinbutton", {
		name: "Vanilla",
	});
	const cherriesCheckbox = await screen.findByRole("checkbox", {
		name: "Cherries",
	});

	await user.clear(vanillaInput);
	await user.type(vanillaInput, "2");
	await user.click(cherriesCheckbox);

	// 주문 버튼을 클릭
	const orderButton = screen.getByRole("button", { name: "주문하기" });
	await user.click(orderButton);

	// 주문 정보 요약을 확인
	const summaryHeading = screen.getByRole("heading", { name: "주문내역" });
	expect(summaryHeading).toBeInTheDocument();

	const scoopsSubtotal = screen.getByRole("heading", {
		name: "Scoops: 4,000원",
	});
	const toppingSubtotal = screen.getByRole("heading", {
		name: "Toppings: 1,500원",
	});
	expect(scoopsSubtotal).toBeInTheDocument();
	expect(toppingSubtotal).toBeInTheDocument();

	expect(screen.getByText("Vanilla 2개")).toBeInTheDocument();
	expect(screen.getByText("Cherries")).toBeInTheDocument();

	// // 다른 대안
	// const optionItems = screen.getAllByRole("listitem");
	// const optionItemsText = optionItems.map((item) => item.textContent);
	// expect(optionItemsText).toEqual(["Vanilla 2개", "Cherries"]);

	// 이용 약관에 동의하고 주문 확인 버튼 클릭
	const termsCheckbox = screen.getByRole("checkbox", { name: "이용약관" });
	await user.click(termsCheckbox);
	expect(termsCheckbox).toBeChecked();

	const orderConfirmButton = screen.getByRole("button", { name: "주문확인" });
	await user.click(orderConfirmButton);

	// "loading"이 보일 것
	const loading = screen.getByText(/loading/i);
	expect(loading).toBeInTheDocument();

	// 확인 페이지에서 주문번호 확인
	// 서버에 주문 내역 저장이 완료된 후 나타나는 페이지 이므로 비동기 처리 필요
	const thankYouHeader = await screen.findByRole("header", {
		name: "감사합니다!",
	});
	expect(thankYouHeader).toBeInTheDocument();

	// "loading"이 사라질 것
	const notLoading = screen.queryByText(/loading/i);
	expect(notLoading).not.toBeInTheDocument();

	const orderNumber = await screen.findByText("주문번호");
	expect(orderNumber).toBeInTheDocument();

	// 확인 페이지에서 재주문 버튼을 클릭
	const newOrderButton = await screen.findByRole("button", {
		name: "재주문",
	});
	await user.click(newOrderButton);

	// 스쿱과 토핑 소계가 재설정 되었는지 확인
	const scoopsTotal = screen.getByText("Scoops 합계: 0원");
	expect(scoopsTotal).toBeInTheDocument();

	const toppingsTotal = screen.getByText("Toppings 합계: 0원");
	expect(toppingsTotal).toBeInTheDocument();

	// 메뉴들이 잘 불러와졌는지 확인
	await screen.findByRole("spinbutton", { name: "Vanilla" });
	await screen.findByRole("checkbox", { name: "Cherries" });
});
