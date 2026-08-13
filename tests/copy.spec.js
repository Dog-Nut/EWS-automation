import { test, expect } from "../fixtures";
import { SignInProcess } from "../pages/signIn-process";
import { CopySettingsPage } from "../pages/copy-settings-page";

test.use({
  ignoreHTTPSErrors: true,
});

test.beforeEach(async ({ signInProcess, page }) => {
  const copySettings = new CopySettingsPage(page);
  await copySettings.goToCopySettings();
  await signInProcess.enterPIN();
});

const invalidCopyValues = ["-1", "100"];
const expectedLabels = [
  "Content Type",
  "Original Paper Type",
  "Color Mode",
  "Lighter/Darker",
  "Background Color Removal",
  "Background Noise Removal",
  "Automatically Straighten",
  "Edge-to-Edge Output",
  "Number of Copies",
  "Output Scale",
  "Paper Source",
  "Print Margins",
  "Quality",
];
const comboBoxOptions = [
  { combobox: "Content Type", options: ["Lines", "Mixed", "Image"] },
  {
    combobox: "Original Paper Type",
    options: ["White", "Blueprint", "Translucent"],
  },
  {
    combobox: "Color Mode",
    options: ["Color", "Grayscale", "Black-and-White"],
  },
  {
    combobox: "Lighter/Darker",
    options: ["1", "2", "3", "4", "5 - (Normal)", "6", "7", "8", "9"],
  },
  {
    combobox: "Output Scale",
    options: ["None", "Custom", "Loaded Paper", "Standard Sizes"],
  },
  { combobox: "Paper Source", options: ["Automatic", "Roll", "Sheet"] },
  {
    combobox: "Print Margins",
    options: ["Clip Contents by Margins", "Add to Contents"],
  },
  { combobox: "Quality", options: ["Fast", "Normal", "Best"] },
];

for (const value of invalidCopyValues) {
  test(`copies validation - rejects ${value}`, async ({ page }) => {
    await page.getByRole("textbox", { name: "Number of Copies" }).click();
    await page.getByRole("textbox", { name: "Number of Copies" }).fill(value);
    await page.getByRole("button", { name: "Apply" }).click();
    await expect(page.getByText("This option is unavailable.")).toBeVisible();
  });
}

test("label is present", async ({ page }) => {
  for (const label of expectedLabels) {
    await expect(page.getByText(label)).toBeVisible();
  }
});

test("Check corresponging labels buttons are present", async ({ page }) => {
  for (const { combobox, options } of comboBoxOptions) {
    await page.getByRole("combobox", { name: combobox }).click();
    for (const option of options) {
      await expect(page.getByLabel(option, { exact: true })).toBeVisible();
    }

    await page.keyboard.press("Escape");
  }
});
