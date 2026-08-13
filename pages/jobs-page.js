import { expect, test } from "@playwright/test";

export class JobsPage {
  constructor(page) {
    this.page = page;
    this.buttons = page.getByRole("button");
    this.tableCells = page.getByRole("cell");
  }

  async goToJobSettings() {
    await this.page.getByRole("menuitem", { name: "Jobs" }).click();
    await this.page
      .locator("#menu-copy-defaultJobOptions")
      .getByRole("navigation", { name: "Job Queue" })
      .click();
  }

  async expectButtonVisible(text) {
    await expect(this.buttons.filter({ hasText: text })).toBeVisible();
  }

  async expectTableCellVisible(text) {
    await expect(
      this.tableCells.filter({ hasText: text }).first(),
    ).toBeVisible();
  }
}
