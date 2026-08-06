import { expect, test } from "@playwright/test";

export class SignInProcess {
  constructor(page) {
    this.page = page;
    this.pin = page.getByRole("textbox", { name: "Enter PIN" });
  }

  async goto() {
    await this.page.goto("/index.html");
  }

  async enterPIN() {
    await this.pin.fill(process.env.PRINTER_PIN);
    await this.pin.press("Enter");
  }
}
