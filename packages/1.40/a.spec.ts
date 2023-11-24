import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "serial", retries: 1 });

test("A", async ({ page }, { retry }) => {
  if (retry === 0) {
    throw new Error("oh!");
  }
  if (retry === 1) {
    expect(true).toBe(true);
  }
  if (retry === 2) {
    expect(true).toBe(false);
  }
});

test("B", async ({ page }, { retry }) => {
  throw new Error("oh!");
});
