import { Reporter } from "@playwright/test/reporter";
export default class DefaultReporter implements Reporter {
  onTestBegin(test, result) {
    console.log(
      `onTestBegin ${test.title} ${result.retry}/${test.retries}: expected ${
        test.expectedStatus
      },  test results: ${test.results
        .map((r) => `[${r.retry}: ${r.status}]`)
        .join(", ")}`
    );
  }

  onTestEnd(test, result) {
    console.log(`${test.title} result: ${result.status}`);
    console.log(
      `onTestEnd ${test.title} ${result.retry}/${test.retries}: expected ${
        test.expectedStatus
      }, test results: ${test.results
        .map((r) => `[${r.retry}: ${r.status}]`)
        .join(", ")}\n`
    );
  }
}
