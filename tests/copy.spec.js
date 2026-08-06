import { test, expect } from "@playwright/test";
import { SignInProcess } from "../pages/signIn-process";
import { CopySettingsPage } from "../pages/copy-settings-page";

test.use({
  ignoreHTTPSErrors: true,
});

test.beforeEach(async ({ page }) => {
  const signInProcess = new SignInProcess(page);
  const copySettings = new CopySettingsPage(page);
  await signInProcess.goto();
  await copySettings.goToCopySettings();
  await signInProcess.enterPIN();
});

const invalidCopyValues = ["-1", "100"];

for (const value of invalidCopyValues) {
  test(`copies validation - rejects ${value}`, async ({ page }) => {
    await page.getByRole("textbox", { name: "Number of Copies" }).click();
    await page.getByRole("textbox", { name: "Number of Copies" }).fill(value);
    await page.getByRole("button", { name: "Apply" }).click();
    await expect(page.getByText("This option is unavailable.")).toBeVisible();
  });
}
