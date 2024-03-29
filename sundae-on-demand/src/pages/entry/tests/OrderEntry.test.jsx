import { rest } from "msw";
import {
    render,
    screen,
    waitFor,
} from "../../../test-utils/testing-library-utils";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";
import userEvent from "@testing-library/user-event";

test("scoops and toppings routes 에러 핸들링", async () => {
    server.resetHandlers(
        // scoops 호출
        // 응답으로 500 반환
        rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
            return res(ctx.status(500));
        }),
        // toppings 호출
        rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
            return res(ctx.status(500));
        })
    );

    render(<OrderEntry setOrderPhase={jest.fn()} />);

    // alert이 두개인데 하나만 인식하여 waitFor를 사용해 두개 요청을 모두 기다리게 한다.
    // 그런데 나는 waitFor 없이도 테스트 통과가 잘 됨...
    await waitFor(async () => {
        // role = alert 이 있는지 확인
        // 두개의 req를 요청했으니 두개의 alert이 있을 것.
        const alerts = await screen.findAllByRole("alert");
        expect(alerts).toHaveLength(2);
    });
});

test("스쿱을 선택하지 않으면 주문하기 버튼 비활성화", async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);

    const user = userEvent.setup();
    const orderButton = screen.getByRole("button", { name: /주문하기/ });
    expect(orderButton).toBeDisabled();

    const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(orderButton).toBeEnabled();

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "0");
    expect(orderButton).toBeDisabled();
});
