import { test, expect } from "@playwright/test";

test.use({
  ignoreHTTPSErrors: true,
});

test("test", async ({ page }) => {
  await page.goto("https://10.44.13.98/index.html");
  await page.getByRole("menuitem", { name: "Copy" }).click();
  await page.locator("a").click();
  await page
    .getByRole("textbox", { name: "Enter PIN" })
    .fill(process.env.PRINTER_PIN);
  await page.getByRole("textbox", { name: "Enter PIN" }).press("Enter");
  await expect(page.locator("h2")).toContainText("Default Copy Options");
  await expect(page.locator("#contentType-name")).toContainText("Content Type");
  await page.locator("#mat-select-value-1").click();
  await expect(page.getByText("Lines")).toBeVisible();
  await expect(page.getByLabel("Mixed")).toBeVisible();
  await expect(page.getByText("Image")).toBeVisible();
  await expect(page.getByLabel("Lines")).toBeVisible();
  await expect(page.getByLabel("Image")).toBeVisible();
  await page.getByLabel("Mixed").click();
  await expect(page.locator("#mediaType-name")).toContainText(
    "Original Paper Type",
  );
  await page.locator("#mat-select-value-3").click();
  await expect(page.getByLabel("White")).toBeVisible();
  await expect(page.getByLabel("Blueprint")).toBeVisible();
  await expect(page.getByLabel("Translucent")).toBeVisible();
  await page.getByLabel("White").click();
  await expect(page.locator("#colorMode-name")).toContainText("Color Mode");
  await page.locator("#mat-select-value-5").click();
  await expect(page.getByLabel("Color", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Grayscale")).toBeVisible();
  await expect(page.getByLabel("Black-and-White")).toBeVisible();
  await page.getByLabel("Color", { exact: true }).click();
  await expect(page.locator("#exposure-name")).toContainText("Lighter/Darker");
  await page.getByRole("combobox", { name: "Lighter/Darker" }).click();
  await expect(page.getByLabel("1")).toBeVisible();
  await expect(page.getByLabel("9")).toBeVisible();
  await page.getByLabel("- (Normal)").click();
  await expect(page.locator("#backgroundColorRemoval-name")).toContainText(
    "Background Color Removal",
  );
  await expect(page.locator(".mat-slide-toggle-bar").first()).toBeVisible();
  await expect(page.locator("#backgroundNoiseRemoval-name")).toContainText(
    "Background Noise Removal",
  );
  await expect(
    page.locator(
      "#backgroundNoiseRemoval > .mat-slide-toggle-label > .mat-slide-toggle-bar",
    ),
  ).toBeVisible();
  await expect(page.locator("#autoDeskew-name")).toContainText(
    "Automatically Straighten",
  );
  await expect(
    page.locator(
      "#autoDeskew > .mat-slide-toggle-label > .mat-slide-toggle-bar",
    ),
  ).toBeVisible();
  await expect(page.locator("#edgeToEdgeScan-name")).toContainText(
    "Edge-to-Edge Output",
  );
  await expect(
    page.locator(
      "#edgeToEdgeScan > .mat-slide-toggle-label > .mat-slide-toggle-bar",
    ),
  ).toBeVisible();
  await expect(page.locator("#copies-name")).toContainText("Number of Copies");
  await page.getByRole("textbox", { name: "Number of Copies" }).click();
  await page.getByRole("textbox", { name: "Number of Copies" }).fill("-1");
  await page.getByRole("textbox", { name: "Number of Copies" }).press("Enter");
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page.locator(".status-box-header")).toBeVisible();
  await expect(page.getByText("This option is unavailable.")).toBeVisible();
  await page.getByRole("textbox", { name: "Number of Copies" }).click();
  await page
    .getByRole("textbox", { name: "Number of Copies" })
    .press("ArrowRight");
  await page.getByRole("textbox", { name: "Number of Copies" }).fill("100");
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(
    page.getByText(".error-st0{fill:#BE1313;} .error-st1{fill:#FFFFFF;} Error"),
  ).toBeVisible();
  await expect(page.getByText("This option is unavailable.")).toBeVisible();
  await page.getByRole("textbox", { name: "Number of Copies" }).click();
  await page.getByRole("textbox", { name: "Number of Copies" }).fill("1010");
  await page
    .getByRole("textbox", { name: "Number of Copies" })
    .press("ArrowRight");
  await page.getByRole("textbox", { name: "Number of Copies" }).fill("1");
  await page.getByRole("textbox", { name: "Number of Copies" }).press("Enter");
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page.getByText("Minimum: 1, Maximum:")).toBeVisible();
  await expect(page.locator("#outputScale-name")).toContainText("Output Scale");
  await page.locator("#mat-select-value-9").click();
  await expect(page.getByLabel("None")).toBeVisible();
  await expect(page.getByLabel("Custom")).toBeVisible();
  await expect(page.getByLabel("Loaded Paper")).toBeVisible();
  await expect(page.getByLabel("Standard Sizes")).toBeVisible();
  await page.getByLabel("Custom").click();
  await expect(page.getByText("Precise Scaling Amount")).toBeVisible();
  await page.getByRole("textbox", { name: "Precise Scaling Amount" }).click();
  await page
    .getByRole("textbox", { name: "Precise Scaling Amount" })
    .press("ArrowRight");
  await page.getByRole("textbox", { name: "Precise Scaling Amount" }).fill("1");
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page.getByText("Value too small")).toBeVisible();
  await expect(
    page.getByText(".error-st0{fill:#BE1313;} .error-st1{fill:#FFFFFF;} Error"),
  ).toBeVisible();
  await page.getByRole("textbox", { name: "Precise Scaling Amount" }).click();
  await page
    .getByRole("textbox", { name: "Precise Scaling Amount" })
    .fill("500");
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page.getByText("Maximum value exceeded")).toBeVisible();
  await expect(
    page.getByText(".error-st0{fill:#BE1313;} .error-st1{fill:#FFFFFF;} Error"),
  ).toBeVisible();
  await page.getByRole("textbox", { name: "Precise Scaling Amount" }).click();
  await page
    .getByRole("textbox", { name: "Precise Scaling Amount" })
    .fill("50250");
  await page
    .getByRole("textbox", { name: "Precise Scaling Amount" })
    .press("ArrowRight");
  await page
    .getByRole("textbox", { name: "Precise Scaling Amount" })
    .fill("25");
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page.getByText("Minimum: 25, Maximum:")).toBeVisible();
  await page.locator("#mat-select-value-25").click();
  await page.getByText("Loaded Paper").click();
  await expect(page.locator("#paperTray-name")).toContainText("Paper Source");
  await expect(page.locator("#printMargins-name")).toContainText(
    "Print Margins",
  );
  await page.getByText("Clip Contents by Margins").click();
  await expect(
    page
      .getByLabel("Clip Contents by Margins")
      .getByText("Clip Contents by Margins"),
  ).toBeVisible();
  await expect(page.getByText("Add to Contents")).toBeVisible();
  await page.getByLabel("Clip Contents by Margins").click();
  await expect(page.locator("#quality-name")).toContainText("Quality");
  await page.locator("#mat-select-value-49").click();
  await expect(page.getByText("Fast")).toBeVisible();
  await expect(page.getByLabel("Fast")).toBeVisible();
  await expect(page.getByLabel("Normal")).toBeVisible();
  await expect(page.getByLabel("Best")).toBeVisible();
});
