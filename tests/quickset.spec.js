import { test, expect } from "../fixtures";
import { SignInProcess } from "../pages/signIn-process";

test.use({
  ignoreHTTPSErrors: true,
});

test.beforeEach(async ({ signInProcess, page }) => {});

test("Check Quick Set", async ({ page }) => {
  const signInProcess = new SignInProcess(page);

  await page.getByRole("menuitem", { name: "Quick Sets" }).click();
  await signInProcess.enterPIN();
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("combobox", { name: "Quick Set Type" }).click();
  await expect(
    page.getByRole("listbox", { name: "Quick Set Type" }).getByLabel("Copy"),
  ).toBeVisible();
  await expect(
    page.getByRole("listbox", { name: "Quick Set Type" }).getByLabel("Email"),
  ).toBeVisible();
  await expect(
    page
      .getByRole("listbox", { name: "Quick Set Type" })
      .getByLabel("Network Folder"),
  ).toBeVisible();
  await expect(
    page
      .getByRole("listbox", { name: "Quick Set Type" })
      .getByLabel("USB Drive"),
  ).toBeVisible();
  await expect(
    page
      .getByRole("listbox", { name: "Quick Set Type" })
      .getByLabel("Print from USB"),
  ).toBeVisible();

  await page.keyboard.press("Escape");
  await page.keyboard.press("Escape");

  await page.getByRole("cell").first().click();
  await expect(
    page.getByRole("button", { name: "View Details" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();
  await page.locator("div").filter({ hasText: /^25$/ }).nth(2).click();
  await expect(page.getByRole("option", { name: "50" })).toBeVisible();
  await expect(page.getByRole("option", { name: "75" })).toBeVisible();
  await expect(page.getByRole("option", { name: "100" })).toBeVisible();
});
