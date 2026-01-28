import { test, expect } from "@playwright/test";

const baseUrl = process.env.E2E_BASE_URL || "http://localhost:5173";

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
  });

  test("should display login page correctly", async ({ page }) => {
    await expect(page).toHaveTitle(/AM Dashboard/);
    await expect(
      page.getByRole("heading", { name: /bem-vindo/i }),
    ).toBeVisible();
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
    await expect(page.getByPlaceholder("••••••••")).toBeVisible();
    await expect(page.getByRole("button", { name: /acessar/i })).toBeVisible();
  });

  test("should show validation errors for empty form", async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.getByText(/endereço de e-mail válido/i)).toBeVisible();
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.fill('input[type="email"]', "invalid@example.com");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(`${baseUrl}/login`);
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    await page.fill('input[type="email"]', "admin@amentoria.com");
    await page.fill('input[type="password"]', "123456");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(new RegExp(`${baseUrl}/?$`), {
      timeout: 10000,
    });
    await expect(
      page.getByRole("heading", { name: "Dashboard" }),
    ).toBeVisible();
  });

  test("should redirect unauthenticated users to login", async ({ page }) => {
    await page.goto(`${baseUrl}/`);
    await expect(page).toHaveURL(new RegExp(`${baseUrl}/login`));
  });
});

test.describe("Dashboard Statistics", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[type="email"]', "admin@amentoria.com");
    await page.fill('input[type="password"]', "123456");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(new RegExp(`${baseUrl}/?$`), {
      timeout: 10000,
    });
  });

  test("should display all KPI cards", async ({ page }) => {
    await expect(page.getByText("Total de Alunos")).toBeVisible();
    await expect(page.getByText("Matrículas")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Progresso Médio" }),
    ).toBeVisible();
    await expect(page.getByText("Conclusão")).toBeVisible();
  });

  test("should display all chart sections", async ({ page }) => {
    await expect(page.getByText("Matrículas por Categoria")).toBeVisible();
    await expect(page.getByText("Evolução de Matrículas")).toBeVisible();
    await expect(page.getByText("Status dos Alunos")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Progresso Médio" }),
    ).toBeVisible();
  });

  test("should show loading skeletons initially", async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[type="email"]', "admin@amentoria.com");
    await page.fill('input[type="password"]', "123456");

    const responsePromise = page.waitForResponse((response) =>
      response.url().includes("/dashboard/stats"),
    );

    await page.click('button[type="submit"]');
    await responsePromise;
  });
});

test.describe("Dashboard Filters", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[type="email"]', "admin@amentoria.com");
    await page.fill('input[type="password"]', "123456");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(new RegExp(`${baseUrl}/?$`), {
      timeout: 10000,
    });
  });

  test("should display all filter components", async ({ page }) => {
    await expect(page.getByPlaceholder(/buscar/i)).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Categorias" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Status" })).toBeVisible();
    await expect(page.getByRole("button", { name: /aplicar/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /limpar/i })).toBeVisible();
  });

  test("should open category filter dropdown", async ({ page }) => {
    await page.click('button:has-text("Categorias")');
    await expect(page.getByText("Redação")).toBeVisible();
    await expect(page.getByText("Matemática")).toBeVisible();
  });

  test("should open status filter dropdown", async ({ page }) => {
    await page.click('button:has-text("Status")');
    await expect(page.getByText("Ativo", { exact: true })).toBeVisible();
    await expect(page.getByText("Inativo")).toBeVisible();
    await expect(page.getByText("Concluído")).toBeVisible();
  });

  test("should apply text search filter", async ({ page }) => {
    await page.fill('input[placeholder*="Buscar"]', "João");
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes("/dashboard/data") &&
        response.url().includes("search="),
    );
    await page.click('button:has-text("Aplicar")');
    const response = await responsePromise;
    expect(response.status()).toBe(200);
  });

  test("should clear all filters", async ({ page }) => {
    await page.fill('input[placeholder*="Buscar"]', "Test");
    await page.click('button:has-text("Limpar")');

    const searchInput = page.getByPlaceholder(/buscar/i);
    await expect(searchInput).toHaveValue("");
  });

  test("should persist filters in local storage", async ({ page }) => {
    await page.click('button:has-text("Categorias")');
    await page.click("text=Redação");
    await page.keyboard.press("Escape");
    await page.click('button:has-text("Aplicar")');

    const stored = await page.evaluate(() =>
      window.localStorage.getItem("dashboardFilters"),
    );
    expect(stored).toContain("REDACAO");

    await page.reload();
    await expect(
      page.getByRole("button", { name: /Categorias/i }),
    ).toBeVisible();
  });
});

test.describe("Theme Switching", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[type="email"]', "admin@amentoria.com");
    await page.fill('input[type="password"]', "123456");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(new RegExp(`${baseUrl}/?$`), {
      timeout: 10000,
    });
  });

  test("should have theme toggle button", async ({ page }) => {
    const themeButton = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .first();
    await expect(themeButton).toBeVisible();
  });

  test("should toggle between light and dark mode", async ({ page }) => {
    const html = page.locator("html");
    const toggleButton = page.getByRole("button", { name: /alternar tema/i });

    await toggleButton.click();
    await page.getByRole("menuitem", { name: "Escuro" }).click();
    await expect(html).toHaveClass(/dark/);

    await toggleButton.click();
    await page.getByRole("menuitem", { name: "Claro" }).click();
    await expect(html).toHaveClass(/light/);
  });
});

test.describe("Logout Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[type="email"]', "admin@amentoria.com");
    await page.fill('input[type="password"]', "123456");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(new RegExp(`${baseUrl}/?$`), {
      timeout: 10000,
    });
  });

  test("should logout and redirect to login", async ({ page }) => {
    await page.getByRole("button", { name: /menu do usuário/i }).click();
    await page.getByRole("menuitem", { name: "Sair" }).click();

    await expect(page).toHaveURL(/login/, { timeout: 5000 });
  });
});

test.describe("Responsive Design", () => {
  test("should display mobile layout on small screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${baseUrl}/login`);

    await expect(
      page.getByRole("heading", { name: /bem-vindo/i }),
    ).toBeVisible();
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
  });

  test("should display tablet layout on medium screens", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(`${baseUrl}/login`);

    await expect(
      page.getByRole("heading", { name: /bem-vindo/i }),
    ).toBeVisible();
  });

  test("should display desktop layout on large screens", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/login`);

    await expect(
      page.getByRole("heading", { name: /A Mentoria Dashboard/i }),
    ).toBeVisible();
  });
});

test.describe("API Integration", () => {
  test("should fetch dashboard stats successfully", async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[type="email"]', "admin@amentoria.com");
    await page.fill('input[type="password"]', "123456");

    const statsResponse = page.waitForResponse(
      (response) =>
        response.url().includes("/dashboard/stats") &&
        response.status() === 200,
    );

    await page.click('button[type="submit"]');

    const response = await statsResponse;
    expect(response.status()).toBe(200);
  });

  test("should fetch dashboard data successfully", async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[type="email"]', "admin@amentoria.com");
    await page.fill('input[type="password"]', "123456");

    const dataResponse = page.waitForResponse(
      (response) =>
        response.url().includes("/dashboard/data") && response.status() === 200,
    );

    await page.click('button[type="submit"]');

    const response = await dataResponse;
    expect(response.status()).toBe(200);
  });
});
