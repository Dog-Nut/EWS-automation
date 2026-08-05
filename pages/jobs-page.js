import { expect, test } from "@playwright/test";

export class jobsPage {
  constructor(page) {
    this.page = page;
    this.buttons = page.getByRole("button");
    this.tableCells = page.getByRole("cell");
  }

  async goto() {
    await this.page.goto("/index.html");
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
