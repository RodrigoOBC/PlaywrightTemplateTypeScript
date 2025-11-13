import { AdminUserPage } from '../page/ADM/ADIM.page';
import { test } from '../fixtures/fixtures';


test.beforeEach(async ({ page, authAdmCookies }) => {
  await page.context().addCookies(authAdmCookies);
});

test.afterEach(async ({ page }) => {
  await page.context().close();
});

test.only(`CT01 - Create Admin Users`, async ({ page, createUserByTest: createCT01TestData }) => {
  const adminUserPage = new AdminUserPage(page);
  const preConditionData = { data: [
    { firstName: 'Teste', middleName: 'Cabral', lastName: 'Silva', empNumber: '891', employeeId: '0891', loginDetails: true, userName: 'TesteCabral', status: 'Enabled', password: 'Teste@1234', confirmPassword: 'Teste@1234' },
    { firstName: 'Maria', middleName: 'Oliveira', lastName: 'Souza', empNumber: '892', employeeId: '0892', loginDetails: true, userName: 'MariaOliveira', status: 'Disabled', password: 'Maria@1234', confirmPassword: 'Maria@1234' }
  ]}
  const adminUsersData = [
    { userRole: 'Admin', employeeName: 'Teste Cabral Silva', status: 'Enabled', username: 'AdminTest1', password: 'Admin@123' },
    { userRole: 'ESS', employeeName: 'Maria Oliveira Souza', status: 'Disabled', username: 'ESSLinda1', password: 'ESS@1234' }
  ];

  for (const userData of adminUsersData) {
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