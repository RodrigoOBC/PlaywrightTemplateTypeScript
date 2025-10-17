import { test } from '../fixtures/fixtures';
import { PIMPage } from '../page/PIM/PIM.page';


test.beforeEach(async ({ page, authCookies }) => {
  await page.context().addCookies(authCookies);
});

test.afterEach(async ({ page }) => {
  await page.context().close();
});

const CT01dataTest = [
  { firstName: 'Teste', middleName: 'Cabral', lastName: 'Silva', employeeID: '', loginDetails: true, userName: 'TesteCabral', status: 'Enabled', password: 'Teste@1234', confirmPassword: 'Teste@1234' },
  { firstName: 'Maria', middleName: 'Oliveira', lastName: 'Souza', employeeID: '', loginDetails: true, userName: 'MariaOliveira', status: 'Disabled', password: 'Maria@1234', confirmPassword: 'Maria@1234' },
  { firstName: 'João', middleName: 'Pereira', lastName: 'Costa', employeeID: '', loginDetails: false, userName: '', status: '', password: '', confirmPassword: '' }
  
]

for (const dataTest of CT01dataTest) {
  test(`Create user ${dataTest['firstName']}`, async ({ page }) => {

    const pimPage = new PIMPage(page);
    await pimPage.navigate();
    await pimPage.navigateToAddEmployee();
    await pimPage.EmployerAddPage.fillEmployerForm(dataTest);
    await pimPage.EmployerAddPage.saveButton.click();
    await pimPage.verifySucessMessage()
  });
}
