import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("서버에서 스쿱 옵션들의 이미지를 가져와 표시한다.", () => {
	render(<Options optionType="scoops" />);

	// 이미지 찾기
	const scoopImages = screen.getAllByRole("img", { name: /scoop$/i });
	expect(scoopImages).toHaveLength(2);

	// 이미지의 대체 텍스트를 확인한다.
	const altText = scoopImages.map((element) => element.alt);
	expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
