import { rest } from "msw";
import { render, screen, waitFor } from "@testing-library/react";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";

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

	render(<OrderEntry />);

	await waitFor(async () => {
		// role = alert 이 있는지 확인
		// 두개의 req를 요청했으니 두개의 alert이 있을 것.
		const alerts = await screen.findAllByRole("alert");
		expect(alerts).toHaveLength(2);
	});
});
