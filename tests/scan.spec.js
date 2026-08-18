import { test, expect } from "../fixtures";
import { SignInProcess } from "../pages/signIn-process";
import { ScanPage } from "../pages/scan-page";

test.use({
  ignoreHTTPSErrors: true,
});

const defaultScanLabels = [
  "Original Paper Type",
  "Color Mode",
  "Long Original",
  "Background Color Removal",
  "Background Noise Removal",
  "Automatically Straighten",
  "Edge-to-Edge Output",
  "File Type",
  "File Size",
];

const emailScanLabels = [
  "Address Field Restrictions",
  "From",
  "Default From",
  "Default Display Name",
  "To",
  "Subject",
  "Message",
];

const networkFolderDefaultLables = [
  "Default Network Folder Configuration",
  "Display Name",
  "Save to UNC Folder Path",
  "Sign-In Method",
  "Windows Domain",
  "User Name",
  "Password",
];

const comboBoxOptionsWebScan = [
  {
    combobox: "Original Paper Type",
    options: ["White", "Translucent", "Blueprint Paper"],
  },
  {
    combobox: "Color Mode",
    options: ["Black Only", "Grayscale", "Color"],
  },
  { combobox: "Resolution", options: ["200 dpi", "300 dpi", "600 dpi"] },
  {
    combobox: "Lighter/Darker",
    options: ["1", "2", "3", "4", "5 - (Normal)", "6", "7", "8", "9"],
  },
  {
    combobox: "File Type",
    options: ["PDF", "JPEG", "TIFF"],
  },
  {
    combobox: "File Size",
    options: ["Low", "Medium", "High", "Maximum"],
  },
];

const comboBoxOptionsShared = [
  {
    combobox: "Original Paper Type",
    options: ["White", "Translucent", "Blueprint"],
  },
  {
    combobox: "Color Mode",
    options: ["Black-and-White", "Grayscale", "Color"],
  },
  { combobox: "Resolution", options: ["200 dpi", "300 dpi", "600 dpi"] },
  {
    combobox: "Lighter/Darker",
    options: ["1", "2", "3", "4", "5 - (Normal)", "6", "7", "8", "9"],
  },
  {
    combobox: "File Size",
    options: [
      "Large",
      "Medium",
      "Small",
      "Largest (Highest Quality)",
      "Smallest (Highest Compression)",
    ],
  },
  {
    combobox: "File Type",
    options: ["JPEG", "PDF", "TIFF", "PDF/A (Archivable)"],
  },
];

test.beforeEach(async ({ signInProcess, page }) => {});

test("Web Scan", async ({ page }) => {
  const signInProcess = new SignInProcess(page);
  const scanPage = new ScanPage(page);
  await page.getByRole("menuitem", { name: "Scan" }).click();
  await page
    .locator("#menu-scan-webScan")
    .getByRole("navigation", { name: "Web Scan" })
    .click();
  await signInProcess.enterPIN();
  for (const label of defaultScanLabels) {
    await expect(page.getByLabel(label)).toBeVisible();
  }

  for (const { combobox, options } of comboBoxOptionsWebScan) {
    await page.getByRole("combobox", { name: combobox }).click();
    for (const option of options) {
      await expect(page.getByLabel(option, { exact: true })).toBeVisible();
    }
    await page.keyboard.press("Escape");
  }
});

test("Scan to Email", async ({ page }) => {
  const signInProcess = new SignInProcess(page);
  const scanPage = new ScanPage(page);
  await page.getByRole("menuitem", { name: "Scan" }).click();
  await page
    .locator("#menu-scan-email")
    .getByRole("navigation", { name: "Scan to Email" })
    .click();
  await signInProcess.enterPIN();
  for (const scanLabel of emailScanLabels) {
    await expect(page.getByLabel(scanLabel, { exact: true })).toBeVisible();
  }

  for (const label of defaultScanLabels) {
    await expect(page.getByLabel(label, { exact: true })).toBeVisible();
  }
});

test("Scan to Network Folder", async ({ page }) => {
  const signInProcess = new SignInProcess(page);
  const scanPage = new ScanPage(page);
  await page.getByRole("menuitem", { name: "Scan" }).click();
  await page
    .locator("#menu-scan-networkFolder")
    .getByRole("navigation", { name: "Scan to Network Folder" })
    .click();
  await signInProcess.enterPIN();

  for (const label of defaultScanLabels) {
    await expect(page.getByLabel(label, { exact: true })).toBeVisible();
  }

  for (const { combobox, options } of comboBoxOptionsShared) {
    await page.getByRole("combobox", { name: combobox }).click();
    for (const option of options) {
      await expect(page.getByLabel(option, { exact: true })).toBeVisible();
    }
    await page.keyboard.press("Escape");
  }

  await page.getByRole("tab", { name: "Default Folder" }).click();
  for (const label of networkFolderDefaultLables) {
    await expect(page.getByLabel(label, { exact: true })).toBeVisible();
  }
});

test("Scan to USB", async ({ page }) => {
  const signInProcess = new SignInProcess(page);
  const scanPage = new ScanPage(page);
  await page.getByRole("menuitem", { name: "Scan" }).click();
  await page
    .locator("#menu-scan-usb-defaultJobOptions")
    .getByRole("navigation", { name: "Scan to USB" })
    .click();
  await signInProcess.enterPIN();

  for (const label of defaultScanLabels) {
    await expect(page.getByLabel(label, { exact: true })).toBeVisible();
  }

  for (const { combobox, options } of comboBoxOptionsShared) {
    await page.getByRole("combobox", { name: combobox }).click();
    for (const option of options) {
      await expect(page.getByLabel(option, { exact: true })).toBeVisible();
    }
    await page.keyboard.press("Escape");
  }
});
