import { test } from '../fixtures/fixtures';
import { PIMPage } from '../page/PIM/PIM.page';

const CT01dataTest = [
  { firstName: 'Teste', middleName: 'Cabral', lastName: 'Silva', employeeID: '0891', loginDetails: true, userName: 'TesteCabral', status: 'Enabled', password: 'Teste@1234', confirmPassword: 'Teste@1234' },
  { firstName: 'Maria', middleName: 'Oliveira', lastName: 'Souza', employeeID: '0892', loginDetails: true, userName: 'MariaOliveira', status: 'Disabled', password: 'Maria@1234', confirmPassword: 'Maria@1234' },
  { firstName: 'João', middleName: 'Pereira', lastName: 'Costa', employeeID: '0893', loginDetails: false, userName: '', status: '', password: '', confirmPassword: '' }
];

// Usando as novas fixtures separadas
test.beforeEach(async ({ page, authAdmCookies }) => {
  await page.context().addCookies(authAdmCookies);
});

test.afterEach(async ({ page }) => {
  await page.context().close();
});



for (const dataTest of CT01dataTest) {
  test(`Create user ${dataTest['firstName']}`, async ({ page, cleanupUsersById }) => {
    await cleanupUsersById(dataTest['employeeID']);
    const pimPage = new PIMPage(page);
    await pimPage.navigate();
    await pimPage.navigateToAddEmployee();
    await pimPage.EmployerAddPage.fillEmployerForm(dataTest);
    await pimPage.EmployerAddPage.saveButton.click();
    await pimPage.verifySucessMessage()
  });
}

test(`Validate user search by name`, async ({ page, getUsersByTest }) => {
  const ct02Data = await getUsersByTest();
  const dataTest = ct02Data[0];

  const pimPage = new PIMPage(page);
  await pimPage.navigate();
  await pimPage.navigateToEmployeeList();
  await pimPage.EmployerListPage.searchEmployeeByName(`${dataTest.firstName} ${dataTest.middleName ?? ''} ${dataTest.lastName}`);
  await pimPage.EmployerListPage.validateEmployeeInTable(dataTest.firstName, dataTest.middleName ?? '', dataTest.lastName);
})
