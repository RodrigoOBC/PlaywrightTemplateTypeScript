import { test, expect } from '@playwright/test';
import { LoginPage } from './page/login.page';



test('Registrar um estudante com sucesso', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
});
