import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://predeploy.students-cda-js-1.wilders.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Stock Manage/);
});

test("should login as Admin", async ({ page }) => {
  await page.goto("https://predeploy.students-cda-js-1.wilders.dev/");

  await page.getByLabel("Email *").fill("mmenego9@example.com");
  await page.getByLabel("Mot de passe", { exact: true }).fill("rB8g=mER>W");

  await page.on("request", (request) => {
    console.log("Requête interceptée :", request.method(), request.url());
  });

  // Surveillez également les réponses
  await page.on("response", (response) => {
    console.log("Réponse reçue :", response.url(), response.status());
  });

  await page.click('button[type="submit"]');

  await page.waitForResponse(
    (response) => response.url().includes("/graph") && response.status() === 200
  );

  // Naviguer manuellement si nécessaire
  await page.goto("https://predeploy.students-cda-js-1.wilders.dev/admin");
  await page.waitForLoadState("networkidle");

  const title = page.getByRole("heading", { level: 2 });
  await title.waitFor({ state: "visible", timeout: 5000 });
  expect(title).toHaveText("Liste des utilisateurs");
});
