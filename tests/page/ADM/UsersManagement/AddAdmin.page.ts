import { type Page } from '@playwright/test';
import TextBoxComponent from '../../../components/textBox.components';
import { ButtonComponent } from '../../../components/button.components';
import { ComboboxComponent, AutoCompleteComponent } from '../../../components/combobox.components';


export class AddAdminPage {
    readonly page: Page;
    readonly userRoleComboBox: ComboboxComponent
    readonly employeeNameTextBox: AutoCompleteComponent
    readonly statusComboBox: ComboboxComponent
    readonly userNameTextBox: TextBoxComponent
    readonly passwordTextBox: TextBoxComponent
    readonly confirmPasswordTextBox: TextBoxComponent
    readonly saveButton: ButtonComponent
    readonly cancelButton: ButtonComponent

    constructor(page: Page) {
        this.page = page;
        this.employeeNameTextBox = new AutoCompleteComponent(this.page, { locatorObject: this.page.getByRole('textbox', { name: 'Type for hints...' }) });
        this.userRoleComboBox = new ComboboxComponent(this.page, { locatorObject: this.page.locator('.oxd-select-text').first() });
        this.statusComboBox = new ComboboxComponent(this.page, { locatorObject: this.page.locator('.oxd-select-text').nth(1) });
        this.userNameTextBox = new TextBoxComponent(this.page, { locatorObject: this.page.locator('[class^="oxd-input-group"]').filter({ hasText: 'Username' }).getByRole('textbox') });
        this.passwordTextBox = new TextBoxComponent(this.page, { locatorObject: this.page.locator('[type="password"]').first() });
        this.confirmPasswordTextBox = new TextBoxComponent(this.page, { locatorObject: this.page.locator('[type="password"]').nth(1) });
        this.saveButton = new ButtonComponent(this.page, 'Save');
        this.cancelButton = new ButtonComponent(this.page, 'Cancel');
    }   

    async fillAddAdminForm(userRole: string, employeeName: string, status: string, username: string, password: string): Promise<void> {
        await this.userRoleComboBox.clickAndSelectOption(userRole);
        await this.employeeNameTextBox.clickAndSelectOption(employeeName);
        await this.statusComboBox.clickAndSelectOption(status);
        await this.userNameTextBox.fillTextBox(username);
        await this.passwordTextBox.fillTextBox(password);
        await this.confirmPasswordTextBox.fillTextBox(password);
    }
}