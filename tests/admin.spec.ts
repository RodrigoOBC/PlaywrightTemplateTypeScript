import { test } from '@playwright/test';
import { AdminUserPage } from './page/admin.page';


interface Cookie {
  name: string; value: string; url?: string; domain?: string; path?: string; expires?: number; httpOnly?: boolean; secure?: boolean; sameSite?: 'Strict' | 'Lax' | 'None'; partitionKey?: string;
}

test.beforeEach(async ({ page }) => {
  const cookiesEnv = process.env.COOKIES;
  if (!cookiesEnv) throw new Error('COOKIES environment variable not set');
  const parsed = JSON.parse(cookiesEnv) as unknown;
  if (!Array.isArray(parsed)) throw new Error('COOKIES env malformed (expected array)');
  const validated: Cookie[] = [];
  for (const itemRaw of parsed) {
    if (typeof itemRaw !== 'object' || itemRaw === null) throw new Error('Invalid cookie entry (not object)');
    const item = itemRaw as Record<string, unknown>;
    const { name, value, url, domain, path, expires, httpOnly, secure, sameSite, partitionKey } = item;
    if (typeof name !== 'string' || typeof value !== 'string') throw new Error('Cookie missing required string fields (name/value)');
    if (expires !== undefined && typeof expires !== 'number') throw new Error('Cookie expires must be number');
    if (httpOnly !== undefined && typeof httpOnly !== 'boolean') throw new Error('Cookie httpOnly must be boolean');
    if (secure !== undefined && typeof secure !== 'boolean') throw new Error('Cookie secure must be boolean');
    if (sameSite !== undefined && (sameSite !== 'Strict' && sameSite !== 'Lax' && sameSite !== 'None')) throw new Error('Cookie sameSite invalid');
    validated.push({
      name,
      value,
      url: typeof url === 'string' ? url : undefined,
      domain: typeof domain === 'string' ? domain : undefined,
      path: typeof path === 'string' ? path : undefined,
      expires: typeof expires === 'number' ? expires : undefined,
      httpOnly: typeof httpOnly === 'boolean' ? httpOnly : undefined,
      secure: typeof secure === 'boolean' ? secure : undefined,
  sameSite: (typeof sameSite === 'string' ? (sameSite as Cookie['sameSite']) : undefined),
      partitionKey: typeof partitionKey === 'string' ? partitionKey : undefined,
    });
  }
  await page.context().addCookies(validated);
});

test.afterEach(async ({ page }) => {
  await page.context().close();
});

const dataTest = [
  { 'Username': 'QACabral', "User Role": 'ESS', 'Employee Name': 'Rodrigo QA Cabral', Status: 'Enabled', 'Actions': '' },]

test('Filtrar com sucesso', async ({ page }) => {
  const adminUserPage = new AdminUserPage(page);
  await adminUserPage.navigate(); 
  await adminUserPage.userName.fillTextBox(dataTest[0]['Username']);
  await adminUserPage.userRoleComboBox.clickAndSelectOption(dataTest[0]['User Role']);
  await adminUserPage.employeeNameTextBox.clickAndSelectOption(dataTest[0]['Employee Name']);
  await adminUserPage.statusComboBox.clickAndSelectOption(dataTest[0]['Status']);
  await adminUserPage.searchButton.click();
  
  await adminUserPage.table.waitForLoad();
  await adminUserPage.validateUsersTable(dataTest);  

});
