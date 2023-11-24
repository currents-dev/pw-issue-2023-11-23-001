import { Reporter } from "@playwright/test/reporter";
export default class DefaultReporter implements Reporter {
  onTestBegin(test, result) {
    console.log(
      `${test.title} started ${result.retry}/${test.retries}: expected ${
        test.expectedStatus
      }, actual: ${test.results
        .map((r) => `[${r.retry}: ${r.status}]`)
        .join(", ")}`
    );
  }

  onTestEnd(test, result) {
    console.log(`${test.title} result: ${result.status}`);
    console.log(
      `${test.title} ended ${result.retry}/${test.retries}: expected ${
        test.expectedStatus
      }, actual: ${test.results
        .map((r) => `[${r.retry}: ${r.status}]`)
        .join(", ")}\n`
    );
  }
}
