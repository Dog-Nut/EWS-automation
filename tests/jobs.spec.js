import { test, expect } from "@playwright/test";
import { jobsPage } from "../pages/jobs-page";

test("test", async ({ page }) => {
  const jobs = new jobsPage(page);
  await jobs.goto();
  await page.getByRole("menuitem", { name: "Jobs" }).click();
  await page
    .locator("#menu-jobs-jobQueue")
    .getByRole("navigation", { name: "Job Queue" })
    .click();
  await page
    .getByRole("textbox", { name: "Enter PIN" })
    .fill(process.env.PRINTER_PIN);
  await page.getByRole("textbox", { name: "Enter PIN" }).press("Enter");
  await jobs.expectButtonVisible("In Progress");
  await jobs.expectButtonVisible("Upcoming");
  await jobs.expectButtonVisible("History");
  await jobs.expectTableCellVisible("Job Name");
  await jobs.expectTableCellVisible("Status");
  await jobs.expectTableCellVisible("Started");
  await jobs.expectTableCellVisible("Completed");
  await jobs.expectTableCellVisible("User Name");
  await jobs.expectTableCellVisible("Job Type");
  await page.getByRole("button", { name: "More actions" }).click();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Delete All Jobs in History$/ })
      .first(),
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Cancel All Jobs$/ })
      .nth(2),
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Export History$/ })
      .first(),
  ).toBeVisible();
  await page
    .locator("div")
    .filter({ hasText: /^Cancel All Jobs$/ })
    .first()
    .click();
  await expect(page.getByRole("button", { name: "No" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Yes" })).toBeVisible();
  await page.getByRole("button", { name: "No" }).click();
  await page.getByRole("button", { name: "More actions" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Delete All Jobs in History$/ })
    .first()
    .click();
  await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
  await page.getByRole("button", { name: "Cancel" }).click();
  await page
    .locator("#menu-jobs-jobsAppSettings")
    .getByRole("navigation", { name: "Jobs Settings" })
    .click();
  await expect(page.getByText("Hide Deleted Jobs")).toBeVisible();
  await expect(page.getByText("Reprint from Job History")).toBeVisible();
  await expect(page.locator(".mat-slide-toggle-bar").first()).toBeVisible();
  await expect(
    page.locator(
      "#reprintResendJobsEnabled > .mat-slide-toggle-label > .mat-slide-toggle-bar",
    ),
  ).toBeVisible();
});
