import { expect, type Page } from '@playwright/test';
import TextBoxComponent from '../../../components/textBox.components';
import { ButtonComponent, ButtonIconComponent } from '../../../components/button.components';
import { ComboboxComponent, AutoCompleteComponent } from '../../../components/combobox.components';
import { Table } from '../../../components/table.components';

export class AdminListPage {
  readonly page: Page;
  readonly userNameTextBox: TextBoxComponent;
  readonly userRoleComboBox: ComboboxComponent;
  readonly empNameAutoComplete: AutoCompleteComponent;
  readonly statusComboBox: ComboboxComponent;
  readonly searchButton: ButtonComponent;
  readonly resetButton: ButtonComponent;
  readonly addButton: ButtonIconComponent;
  readonly table: Table;

  constructor(page: Page) {
    this.page = page;
    this.userNameTextBox = new TextBoxComponent(this.page, { locatorObject: this.page.locator('[class^="oxd-input-group"]').filter({ hasText: 'Username' }).getByRole('textbox') });
    this.userRoleComboBox = new ComboboxComponent(this.page, { locatorObject: this.page.locator('.oxd-select-text').first() });
    this.empNameAutoComplete = new AutoCompleteComponent(this.page, { locatorObject: this.page.locator('[class^="oxd-input-group"]').filter({ hasText: 'Employee Name' }).getByRole('textbox') });
    this.statusComboBox = new ComboboxComponent(this.page, { locatorObject: this.page.locator('.oxd-select-text').nth(1) });
    this.searchButton = new ButtonComponent(page, "Search");
    this.resetButton = new ButtonComponent(page, "Reset");
    this.addButton = new ButtonIconComponent(page, "Add");
    this.table = new Table(this.page,
      {
        columnsName: ['Username', 'User Role', 'Employee Name', 'Status', 'Actions'],
        hasTextBox: false,
        tableButtonActions: [
          { name: 'Edit', type: new ButtonIconComponent(this.page, 'edit') },
          { name: 'Delete', type: new ButtonIconComponent(this.page, 'delete') }
        ]
      }
    );
  }

  async navigate() {
    await this.page.goto('/web/index.php/admin/viewSystemUsers');
    await expect(this.page).toHaveURL(/.*\/web\/index\.php\/admin\/viewSystemUsers/);
  }

  async searchUserByName(userName: string): Promise<void> {
    await this.userNameTextBox.fillTextBox(userName);
    await this.searchButton.click();
  }

  async searchUsersByFilter(userName: string, userRole: string, employeeName: string, status: string): Promise<void> {
    await this.userNameTextBox.fillTextBox(userName);
    await this.userRoleComboBox.clickAndSelectOption(userRole);
    await this.empNameAutoComplete.clickAndSelectOption(employeeName);
    await this.statusComboBox.clickAndSelectOption(status);
    await this.searchButton.click();
  }

  async validateEmployeeInTable(userName: string, userRole: string, employeeName: string, status: string): Promise<void> {
    await this.validateColumnsValues('Username', userName);
    await this.validateColumnsValues('User Role', userRole);
    await this.validateColumnsValues('Employee Name', employeeName);
    await this.validateColumnsValues('Status', status);
  }

  async validateColumnsValues(columnsName: string, valueTarget: string): Promise<void> {
    if (valueTarget !== '') {
      const columnValues = await this.table.getColumnRowByColumnName(columnsName);
      for (const colValue of columnValues) {
        await expect(colValue).toHaveText(valueTarget);
      }
    }
  }
}   