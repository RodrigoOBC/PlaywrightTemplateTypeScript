import { test, expect } from '@playwright/test';
import { FormPage } from './page/form.page';



test('Registrar um estudante com sucesso', async ({ page }) => {
  const formPage = new FormPage(page);
  await formPage.navigate();
  await page.pause()
  await formPage.firstName.fillTextBox('Rodrigo');
  await formPage.lastName.fillTextBox('Cabral');
  await formPage.email.fillTextBox('teste@teste.com');
  await formPage.selectGender('Male')
  await formPage.mobileNumber.fillTextBox('1234567890');
  // ... continue preenchendo o formulário conforme necessário
  await formPage.submitForm();

  // Verifique se o formulário foi enviado com sucesso
  await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
});
