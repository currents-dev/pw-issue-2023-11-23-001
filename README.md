# PW Serial Mode Example

Reporter results are ambiguous for the following group that runs in serial mode:

```ts
import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "serial", retries: 1 });

test("A", async ({ page }, { retry }) => {
  if (retry === 0) {
    throw new Error("oh!");
  }
  if (retry === 1) {
    expect(true).toBe(true);
  }
});

test("B", async ({ page }, { retry }) => {
  throw new Error("oh!");
});
```

`1.39` creates the following results for the simple [`reporter`](./packages/shared/reporter.ts) - it seems the correct behavior according to the [documentation](https://playwright.dev/docs/test-retries#serial-mode)

```plain
onTestBegin A 0/1: expected passed,  test results: [0: skipped]
A result: failed
onTestEnd A 0/1: expected passed, test results: [0: failed]

onTestBegin B 0/1: expected passed,  test results: [0: skipped]
B result: skipped
onTestEnd B 0/1: expected passed, test results: [0: skipped]

onTestBegin A 1/1: expected passed,  test results: [0: failed], [1: skipped]
A result: passed
onTestEnd A 1/1: expected passed, test results: [0: failed], [1: passed]

onTestBegin B 1/1: expected passed,  test results: [0: skipped], [1: skipped]
B result: failed
onTestEnd B 1/1: expected passed, test results: [0: skipped], [1: failed]
```

`1.40` sends different results:

```plain
onTestBegin A 0/1: expected passed,  test results: [0: skipped]
A result: failed
onTestEnd A 0/1: expected passed, test results: [0: failed]

onTestBegin A 1/1: expected passed,  test results: [0: failed], [1: skipped]
A result: passed
onTestEnd A 1/1: expected passed, test results: [0: failed], [1: passed]

onTestBegin B 0/1: expected passed,  test results: [0: skipped]
B result: failed
onTestEnd B 0/1: expected passed, test results: [0: failed]
```

The problems are:

- after test `A` fails, the subsequent test results in a serial group should be marked as `skipped` and invoke `onTestBegin`. `1.40` doesn't invoke `onTestBegin` for test `B` when `A` fails.

- test `B` doesn't run according to the configured # of retries in `1.40` - `onTestEnd` only runs one for test `B`. Working correctly in `1.39` - it runs 1 configured retry.

## How to reproduce

See the simple reporter at [`./packages/shared/reporter.ts`](./packages/shared/reporter.ts)

```sh
npm i
```

Correct result:

```sh
cd ./packages/1.39
npx playwright test

```

Incorrect result:

```sh
cd ./packages/1.40
npx playwright test
```
