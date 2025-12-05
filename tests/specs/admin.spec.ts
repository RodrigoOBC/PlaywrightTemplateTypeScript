import { AdminUserPage } from '../page/ADM/ADIM.page';
import { test } from '../fixtures/fixtures';



test.afterEach(async ({ page }) => {
  await page.context().close();
});

test(`CT01 - Create Admin Users`, async ({ authenticatedPage: page, createUserByTest: createCT01TestData, adminTestData, preconditionADMIN }) => {
  const adminUserPage = new AdminUserPage(page);
  const preConditionData = preconditionADMIN.CT01DataADMIN;

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

test(`CT02 - Validate Search Admin Users in Admin List`, async ({ authenticatedPage: page, createUserByTest: createCT02TestData, adminTestData, preconditionADMIN }) => {
  const adminUserPage = new AdminUserPage(page);
  const preConditionData = preconditionADMIN.CT02DataADMIN;
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
  