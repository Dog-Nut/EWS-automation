import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("/index.html");
  await expect(page.locator("#logo")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "HP DesignJet Smart Tank T908" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Notifications" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Search" })).toBeVisible();
  await page.getByRole("button", { name: "Sign In/Sign Out" }).click();
  await page
    .getByRole("textbox", { name: "Enter PIN" })
    .fill(process.env.PRINTER_PIN);
  await page.getByRole("textbox", { name: "Enter PIN" }).press("Enter");
  await expect(
    page.getByRole("button", { name: "Sign In/Sign Out" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tanks" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Paper" })).toBeVisible();
  await expect(page.getByText("Estimated tank levels. View")).toBeVisible();
  await expect(page.locator(".mat-grid-tile-content").first()).toBeVisible();
  await expect(
    page.locator("mat-grid-tile:nth-child(2) > .mat-grid-tile-content").first(),
  ).toBeVisible();
  await expect(
    page.locator("mat-grid-tile:nth-child(3) > .mat-grid-tile-content"),
  ).toBeVisible();
  await expect(
    page.locator("mat-grid-tile:nth-child(4) > .mat-grid-tile-content"),
  ).toBeVisible();
});
