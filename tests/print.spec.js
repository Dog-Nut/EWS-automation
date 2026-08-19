import { test, expect } from "../fixtures";
import { SignInProcess } from "../pages/signIn-process";

test.use({
  ignoreHTTPSErrors: true,
});

const defaultLabels = [
  "Number of Copies",
  "Color Mode",
  "Quality",
  "Output Scale",
  "Print Margins",
  "Paper Source",
];

const comboboxOptions = [
  {
    combobox: "Color Mode",
    options: ["Color", "Grayscale", "Black Only", "Black-and-White"],
  },
  { combobox: "Quality", options: ["Best", "Normal", "Fast"] },
  { combobox: "Output Scale", options: ["None", "Custom", "Standard Sizes"] },
  {
    combobox: "Print Margins",
    options: ["Clip Contents by Margins", "Add to Contents"],
  },
  { combobox: "Paper Source", options: ["Automatic", "Roll", "Sheet"] },
];

test.beforeEach(async ({ signInProcess, page }) => {});

test("Print from USB", async ({ page }) => {
  const signInProcess = new SignInProcess(page);

  await page.getByRole("menuitem", { name: "Print", exact: true }).click();
  await page
    .locator("#menu-print-printFromUsb")
    .getByRole("navigation", { name: "Print from USB" })
    .click();
  await signInProcess.enterPIN();

  for (const label of defaultLabels) {
    await expect(page.getByLabel(label, { exact: true })).toBeVisible();
  }

  for (const { combobox, options } of comboboxOptions) {
    await page.getByRole("combobox", { name: combobox }).click();
    for (const option of options) {
      await expect(page.getByLabel(option, { exact: true })).toBeVisible();
    }
    await page.keyboard.press("Escape");
  }
});

test("Default Print Options", async ({ page }) => {
  const signInProcess = new SignInProcess(page);

  await page.getByRole("menuitem", { name: "Print", exact: true }).click();
  await page
    .locator("#menu-print-defaultPrintOptions")
    .getByRole("navigation", { name: "Default Print Options" })
    .click();
  await signInProcess.enterPIN();

  for (const label of defaultLabels) {
    await expect(page.getByLabel(label, { exact: true })).toBeVisible();
  }

  for (const { combobox, options } of comboboxOptions) {
    await page.getByRole("combobox", { name: combobox }).click();
    for (const option of options) {
      await expect(page.getByLabel(option, { exact: true })).toBeVisible();
    }
    await page.keyboard.press("Escape");
  }
});
