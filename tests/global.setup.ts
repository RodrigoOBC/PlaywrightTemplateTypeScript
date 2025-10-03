import { test as setup } from '@playwright/test';
import { LoginPage } from './page/login.page';

setup('Realizar login com sucesso', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.makeLogin('Admin', 'admin123');
  await loginPage.validateLogin();
  const cookies = await page.context().cookies();
  process.env.COOKIES = JSON.stringify(cookies);
});