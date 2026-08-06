import { expect, test } from "@playwright/test";

export class CopySettingsPage {
  constructor(page) {
    this.page = page;
  }

  async goToCopySettings() {
    await this.page.getByRole("menuitem", { name: "Copy" }).click();
    await this.page
      .locator("#menu-copy-defaultJobOptions")
      .getByRole("navigation", { name: "Default Copy Options" })
      .click();
  }
}
