import { test, expect } from '@playwright/test';
import { FormPage } from './page/form.page';

const studentData = {
  firstName: 'Rodrigo',
  lastName: 'Cabral',
  email: 'teste@teste.com',
  gender: 'Male',
  mobile: '1234567890',
  subject: 'Computer Science',
  state: 'NCR',
  city: 'Delhi'
};


test('Registrar um estudante com sucesso', async ({ page }) => {
  const formPage = new FormPage(page);
  await formPage.navigate();

  await formPage.firstName.fillTextBox(studentData.firstName);
  await formPage.lastName.fillTextBox(studentData.lastName);
  await formPage.email.fillTextBox(studentData.email);
  await formPage.gender(studentData.gender).click();
  await formPage.mobileNumber.fillTextBox(studentData.mobile);
  await formPage.subjectsInput.fillAndPressEnter(studentData.subject);
  await formPage.stateDropdown.clickAndSelectOption(studentData.state);
  await formPage.cityDropdown.clickAndSelectOption(studentData.city);
  // ... continue preenchendo o formulário conforme necessário
  await formPage.submitButton.click();

  // Verifique se o formulário foi enviado com sucesso
  await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
});
