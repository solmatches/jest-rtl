import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("서버에서 스쿱 옵션들의 이미지를 가져와 표시한다.", async () => {
	render(<Options optionType="scoops" />);

	// 이미지 찾기
	const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
	expect(scoopImages).toHaveLength(2);

	// 이미지의 대체 텍스트를 확인한다.
	const altText = scoopImages.map((element) => element.alt);
	expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("서버에서 토핑 옵션들의 이미지를 가져와 표시한다.", async () => {
	render(<Options optionType="toppings" />);

	const toggingImages = await screen.findAllByRole("img", {
		name: /topping$/i,
	});
	expect(toggingImages).toHaveLength(3);

	const altText = toggingImages.map((element) => element.alt);
	expect(altText).toEqual([
		"Cherries topping",
		"M&Ms topping",
		"Hot fudge topping",
	]);
});
