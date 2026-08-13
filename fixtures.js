import { test as base } from "@playwright/test";
import { SignInProcess } from "./pages/signIn-process";

export const test = base.extend({
  signInProcess: async ({ page }, use) => {
    //Set up the fixture
    const signInProcess = new SignInProcess(page);
    await signInProcess.goto();

    //Use the fixture value in the test
    await use(signInProcess);
  },
});

export { expect } from "@playwright/test";
