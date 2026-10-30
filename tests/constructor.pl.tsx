import { test, expect } from '@playwright/test';

test.describe('add ingredients to constructor works correctly', function () {
  test('Добавление ингридиента', async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
    });
    await page.goto('http://localhost:4000');

    const bunCard = page.locator('li').filter({ hasText: 'Краторная булка N-200i' });
    await bunCard.getByRole('button').click();

    const emptyBunText = page.getByText('Выберите булки').first();
    await expect(emptyBunText).toBeHidden();

    await expect(bunCard.locator('.counter')).toHaveText('2');
  });

  test('Работа модального окна ингридиента', async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
    });
    await page.goto('http://localhost:4000');

    await page.getByText('Краторная булка N-200i').click();

    const modal = page.getByText('Детали ингредиента');
    await expect(modal).toBeVisible();

    await expect(page.getByText('Краторная булка N-200i').last()).toBeVisible();

    await page.getByLabel('Закрыть').click();

    await expect(modal).toBeHidden();
  });

  test('Создание заказа', async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
    });
    await page.route('**/api/auth/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          user: { email: 'test@test.ru', name: 'Test' },
        }),
      });
    });
    await page.route('**/api/orders', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, order: { number: 12345 } }),
      });
    });

    await page.addInitScript(() => {
      localStorage.setItem('accessToken', 'mock-token');
    });

    await page.goto('http://localhost:4000');

    await page
      .locator('li')
      .filter({ hasText: 'Краторная булка N-200i' })
      .getByRole('button')
      .click();
    await page
      .locator('li')
      .filter({ hasText: 'Биокотлета' })
      .getByRole('button')
      .click();

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    const modal = page.getByText('Ваш заказ начали готовить');
    await expect(modal).toBeVisible();
    await expect(page.getByText('12345')).toBeVisible();

    await page.getByLabel('Закрыть').click();
    await expect(modal).toBeHidden();

    await expect(page.getByText('Выберите булки').first()).toBeVisible();
  });
  test('Закрытие по оверлею', async ({ page }) => {
    await page.routeFromHAR('tests/hars/ingredients.har', {
      url: '**/api/ingredients',
      update: false,
    });
    await page.goto('http://localhost:4000');

    await page.getByText('Краторная булка N-200i').click();
    const modal = page.getByText('Детали ингредиента');
    await expect(modal).toBeVisible();

    await page.getByTestId('modal-overlay').click({
      position: { x: 10, y: 10 },
      force: true,
    });

    await expect(modal).toBeHidden();
  });
});
