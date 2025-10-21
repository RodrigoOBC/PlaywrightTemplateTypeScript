import { test } from '../fixtures/fixtures';
import { PIMPage } from '../page/PIM/PIM.page';

const CT01dataTest = [
  { firstName: 'Teste', middleName: 'Cabral', lastName: 'Silva', employeeID: '0891', loginDetails: true, userName: 'TesteCabral', status: 'Enabled', password: 'Teste@1234', confirmPassword: 'Teste@1234' },
  { firstName: 'Maria', middleName: 'Oliveira', lastName: 'Souza', employeeID: '0892', loginDetails: true, userName: 'MariaOliveira', status: 'Disabled', password: 'Maria@1234', confirmPassword: 'Maria@1234' },
  { firstName: 'João', middleName: 'Pereira', lastName: 'Costa', employeeID: '0893', loginDetails: false, userName: '', status: '', password: '', confirmPassword: '' }

]

interface EmployeeSummary { firstName: string; middleName?: string; lastName: string; }
const CT02dataTest: EmployeeSummary[] = []

test.beforeEach(async ({ page, authAdmCookies, orangeApi }) => {
  await page.context().addCookies(authAdmCookies);
  const responseOneUser = await orangeApi.get('/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&employeeId=0891&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC');
  const users = await responseOneUser.json();
  if (users.data.length > 0) {
    console.log('Deleting existing test users');
    await page.pause()
    const response = await orangeApi.delete(`/web/index.php/api/v2/pim/employees`, { data: { ids: ['0891'] }});
    console.log(`Deleted users response status: ${response.status()}`);
  }

  const responseAllUsers = await orangeApi.get('/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC');
  const allUsers = await responseAllUsers.json();
  if (Array.isArray(allUsers.data) && allUsers.data.length > 0) {
    const randomUser = allUsers.data[Math.floor(Math.random() * allUsers.data.length)];
    CT02dataTest.push({ firstName: randomUser.firstName, middleName: randomUser.middleName, lastName: randomUser.lastName });
  }

});

test.afterEach(async ({ page }) => {
  await page.context().close();
});


for (const dataTest of CT01dataTest) {
  test.only(`Create user ${dataTest['firstName']}`, async ({ page }) => {
    const pimPage = new PIMPage(page);
    await pimPage.navigate();
    await pimPage.navigateToAddEmployee();
    await pimPage.EmployerAddPage.fillEmployerForm(dataTest);
    await pimPage.EmployerAddPage.saveButton.click();
    await pimPage.verifySucessMessage()
  });

}
test(`Verify created user `, async ({ page }) => {
  const dataTest = CT02dataTest[0]
  const pimPage = new PIMPage(page);
  await pimPage.navigate();
  await pimPage.navigateToEmployeeList();
  await pimPage.EmployerListPage.searchEmployeeByName(`${dataTest.firstName} ${dataTest.middleName ?? ''} ${dataTest.lastName}`);
  await pimPage.EmployerListPage.validateEmployeeInTable(dataTest.firstName, dataTest.middleName ?? '', dataTest.lastName);
})