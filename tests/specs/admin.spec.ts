import { test } from '../fixtures/fixtures';
import { AdminUserPage } from '../page/admin.page';


test.beforeEach(async ({ page, authCookies }) => {
  await page.context().addCookies(authCookies);
});

test.afterEach(async ({ page }) => {
  await page.context().close();
});

const CT01dataTest = [
  { 'Username': 'JacobBrown', "User Role": 'ESS', 'Employee Name': 'Jacob Brown', 'Status': 'Enabled', 'Actions': '' }
]

for (const dataTest of CT01dataTest) {
  test(`Filtrar usuario ${dataTest['Username']}`, async ({ page }) => {

    const adminUserPage = new AdminUserPage(page);
    await adminUserPage.navigate();
    await adminUserPage.userName.fillTextBox(dataTest['Username']);
    await adminUserPage.userRoleComboBox.clickAndSelectOption(dataTest['User Role']);
    await adminUserPage.employeeNameTextBox.clickAndSelectOption(dataTest['Employee Name']);
    await adminUserPage.statusComboBox.clickAndSelectOption(dataTest['Status']);
    await adminUserPage.searchButton.click();

    await adminUserPage.table.waitForLoad();
    await adminUserPage.validateUsersTable([dataTest]);

  });
}