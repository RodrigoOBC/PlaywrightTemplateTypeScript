import { test, expect } from '@playwright/test';
import { LoginPage } from './page/login.page';
import { AdminUserPage } from './page/admin.page';


test.beforeEach(async ({ page }) => {
  const deserializedCookies = JSON.parse(process.env.COOKIES)
  await page.context().addCookies(deserializedCookies);
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
