import { server, startDb, stopDb } from "./utils/server";
import { createTestClient } from "apollo-server-testing";
import { GET_CLIENTS, GET_ORDERS, GET_STORE } from "./utils/queries";

beforeAll(() => {
  return startDb();
});

describe("test Clients", () => {
  const serverTest = server();

  test("query clients", async () => {
    const { query } = createTestClient(serverTest);
    const res = await query({ query: GET_CLIENTS });

    expect(res).toMatchSnapshot();
  });
});
describe("test Orders", () => {
  const serverTest = server();

  test("query Orders", async () => {
    const { query } = createTestClient(serverTest);
    const res = await query({ query: GET_ORDERS });

    expect(res).toMatchSnapshot();
  });
});
describe("test Orders", () => {
  const serverTest = server();

  test("query Orders", async () => {
    const { query } = createTestClient(serverTest);
    const res = await query({ query: GET_STORE });

    expect(res).toMatchSnapshot();
  });
});

afterAll(() => {
  return stopDb();
});
