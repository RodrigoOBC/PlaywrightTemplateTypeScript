import { test } from '../fixtures/fixtures';
import { PIMPage } from '../page/PIM/PIM.page';


test.beforeEach(async ({ page, authCookies }) => {
  await page.context().addCookies(authCookies);
});

test.afterEach(async ({ page }) => {
  await page.context().close();
});

const CT01dataTest = [
  { firstName: 'Teste', middleName: 'Cabral', lastName: 'Silva', employeeID: '', loginDetails: true, userName: 'TesteCabral', status: 'Enabled', password: 'Teste@1234', confirmPassword: 'Teste@1234' }
  
]

for (const dataTest of CT01dataTest) {
  test(`Criar usuario ${dataTest['firstName']}`, async ({ page }) => {

    const pimPage = new PIMPage(page);
    await page.pause()
    await pimPage.navigate();
    await pimPage.navigateToAddEmployee();
    await pimPage.EmployerAddPage.fillEmployerForm(dataTest);
    await pimPage.EmployerAddPage.saveButton.click();
    

  });
}