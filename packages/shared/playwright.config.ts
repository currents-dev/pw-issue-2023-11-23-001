import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  reporter: [["../shared/reporter.ts"]],
};

export default config;
