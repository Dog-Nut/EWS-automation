import { expect, test } from "@playwright/test";

export class ScanPage {
  constructor(page) {
    this.page = page;
  }

  async goToScan() {
    await this.page.getByRole("menuitem", { name: "Scan" }).click();
    await this.page
      .locator("#menu-scan-webScan")
      .getByRole("navigation", { name: "Web Scan" })
      .click();
  }
}
