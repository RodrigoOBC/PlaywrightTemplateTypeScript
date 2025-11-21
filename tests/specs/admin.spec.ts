import { AdminUserPage } from '../page/ADM/ADIM.page';
import { test } from '../fixtures/fixtures';


test.beforeEach(async ({ page, authAdmCookies }) => {
  await page.context().addCookies(authAdmCookies);
});

test.afterEach(async ({ page }) => {
  await page.context().close();
});

test(`CT01 - Create Admin Users`, async ({ page, createUserByTest: createCT01TestData, adminTestData }) => {
  const adminUserPage = new AdminUserPage(page);
  const preConditionData = { data: [
    { firstName: 'Teste', middleName: 'Cabral', lastName: 'Silva', empNumber: '891', employeeId: '0891', loginDetails: true, userName: 'TesteCabral', status: 'Enabled', password: 'Teste@1234', confirmPassword: 'Teste@1234' },
    { firstName: 'Maria', middleName: 'Oliveira', lastName: 'Souza', empNumber: '892', employeeId: '0892', loginDetails: true, userName: 'MariaOliveira', status: 'Disabled', password: 'Maria@1234', confirmPassword: 'Maria@1234' }
  ]}

  for (const userData of adminTestData.CT01DataADMIN) {
    await createCT01TestData(preConditionData);
    await adminUserPage.navigate();
    await adminUserPage.navigateAddAdminPage();
    await adminUserPage.addAdminPage.fillAddAdminForm(
      userData.userRole,
      userData.employeeName,
      userData.status,
      userData.username,
      userData.password
    );
    await adminUserPage.addAdminPage.saveButton.click();
  }
})

test(`CT02 - Validate Search Admin Users in Admin List`, async ({ page, createUserByTest: createCT02TestData, adminTestData }) => {
  const adminUserPage = new AdminUserPage(page);
  const preConditionData = { data: [
    { firstName: 'Teste', middleName: 'Cabral', lastName: 'Silva', empNumber: '891', employeeId: '0891', loginDetails: true, userName: 'TesteCabral', status: 'Enabled', password: 'Teste@1234', confirmPassword: 'Teste@1234' },
    { firstName: 'Maria', middleName: 'Oliveira', lastName: 'Souza', empNumber: '892', employeeId: '0892', loginDetails: true, userName: 'MariaOliveira', status: 'Disabled', password: 'Maria@1234', confirmPassword: 'Maria@1234' }
  ]}
  await createCT02TestData(preConditionData);
  for (const userData of adminTestData.CT02DataADMIN) {
    await adminUserPage.navigate();
    await adminUserPage.adminListPage.searchUsersByFilter(userData.username, userData.userRole, userData.employeeName, userData.status);
    await adminUserPage.adminListPage.validateEmployeeInTable(
      userData.username,
      userData.userRole,
      userData.employeeName,
      userData.status
    );
  }


})
  