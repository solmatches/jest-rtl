// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { server } from "./mocks/server";

// 테스트가 시작하기전에 API mocking 설정
beforeAll(() => server.listen());

// 테스트 중에 추가할 수 있는 모든 request handlers를 재설정하여
// 다른 테스트에 영향을 미치지 않도록 한다
afterEach(() => server.resetHandlers());

// 테스트 종료 후 정리
afterAll(() => server.close());
