import { test as setup } from '@playwright/test';
import { LoginPage } from './page/login.page';

setup('create new database', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.makeLogin('Admin', 'admin123');
 await loginPage.validateLogin();
  await page.context().storageState({ path: 'teste/auth.json' });
});