import { test, expect } from '@playwright/test';
import { LoginPage } from './page/login.page';
import { AdminPage } from './page/admin.page';


test.use({ storageState: 'teste/auth.json' });


test('Registrar um estudante com sucesso', async ({ page }) => { 
  const adminPage = new AdminPage(page);
  await adminPage.navigate();
  await page.pause();
});
