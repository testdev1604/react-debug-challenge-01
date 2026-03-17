import { test, expect } from "@playwright/test";

test.describe("Shopping Cart", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("cart badge starts at zero", async ({ page }) => {
    await expect(page.getByTestId("cart-count")).toHaveText("0");
  });

  test("adding a product updates the cart badge", async ({ page }) => {
    await page.getByTestId("add-to-cart-1").click();
    await expect(page.getByTestId("cart-count")).toHaveText("1");
  });

  test("adding the same product twice shows quantity 2", async ({ page }) => {
    await page.getByTestId("add-to-cart-1").click();
    await page.getByTestId("add-to-cart-1").click();
    await expect(page.getByTestId("cart-count")).toHaveText("2");
  });

  test("adding different products updates badge correctly", async ({
    page,
  }) => {
    await page.getByTestId("add-to-cart-1").click();
    await page.getByTestId("add-to-cart-3").click();
    await expect(page.getByTestId("cart-count")).toHaveText("2");
  });

  test("cart page shows added items", async ({ page }) => {
    await page.getByTestId("add-to-cart-1").click();
    await page.getByTestId("add-to-cart-2").click();

    await page.getByTestId("cart-link").click();

    await expect(page.getByTestId("cart-item-1")).toBeVisible();
    await expect(page.getByTestId("cart-item-2")).toBeVisible();
  });

  test("cart page shows correct total price", async ({ page }) => {
    await page.getByTestId("add-to-cart-1").click(); // $59.99
    await page.getByTestId("add-to-cart-3").click(); // $34.99

    await page.getByTestId("cart-link").click();

    await expect(page.getByTestId("cart-total")).toContainText("$94.98");
  });

  test("empty cart shows empty message", async ({ page }) => {
    await page.getByTestId("cart-link").click();
    await expect(page.getByTestId("cart-empty")).toBeVisible();
  });

  test("removing an item from cart updates the view", async ({ page }) => {
    await page.getByTestId("add-to-cart-1").click();
    await page.getByTestId("add-to-cart-2").click();

    await page.getByTestId("cart-link").click();
    await page.getByTestId("remove-item-1").click();

    await expect(page.getByTestId("cart-item-1")).not.toBeVisible();
    await expect(page.getByTestId("cart-item-2")).toBeVisible();
    await expect(page.getByTestId("cart-count")).toHaveText("1");
  });

  test("quantity controls work correctly", async ({ page }) => {
    await page.getByTestId("add-to-cart-1").click();
    await page.getByTestId("cart-link").click();

    await expect(page.getByTestId("qty-1")).toHaveText("1");

    await page.getByTestId("increase-qty-1").click();
    await expect(page.getByTestId("qty-1")).toHaveText("2");
    await expect(page.getByTestId("cart-count")).toHaveText("2");

    await page.getByTestId("decrease-qty-1").click();
    await expect(page.getByTestId("qty-1")).toHaveText("1");
    await expect(page.getByTestId("cart-count")).toHaveText("1");
  });
});
