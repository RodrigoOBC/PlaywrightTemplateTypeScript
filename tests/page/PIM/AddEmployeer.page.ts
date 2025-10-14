import { type Page } from '@playwright/test';
import TextBoxComponent from '../../components/textBox.components';
import { ButtonComponent, RadioButtonComponent } from '../../components/button.components';


export class EmployerAddPage {
    readonly page: Page;
    readonly employerFirstNameTextBox: TextBoxComponent
    readonly employerMidleNameTextBox: TextBoxComponent
    readonly employerLastNameTextBox: TextBoxComponent
    readonly employmentIDTextBox: TextBoxComponent
    readonly userNameTextBox: TextBoxComponent
    readonly userStatus: (name:string) => RadioButtonComponent
    readonly passWordTextBox: TextBoxComponent
    readonly passWordConfirmTextBox: TextBoxComponent
    readonly saveButton: ButtonComponent
    readonly cancelButton: ButtonComponent

    constructor(page: Page) {
        this.page = page;
        this.employerFirstNameTextBox = new TextBoxComponent(this.page, { locatorObject: this.page.getByRole('textbox', { name: 'First Name' }) });
        this.employerMidleNameTextBox = new TextBoxComponent(this.page, { locatorObject: this.page.getByRole('textbox', { name: 'Middle Name' }) });
        this.employerLastNameTextBox = new TextBoxComponent(this.page, { locatorObject: this.page.getByRole('textbox', { name: 'Last Name' }) });
        this.employmentIDTextBox = new TextBoxComponent(this.page, { locatorObject: this.page.getByRole('textbox', { name: 'Employee Id' }) });
        this.userNameTextBox = new TextBoxComponent(this.page, { locatorObject: this.page.getByRole('textbox', { name: 'Username' }) });
        this.userStatus = (name: string) => new RadioButtonComponent(this.page, name);
        this.passWordTextBox = new TextBoxComponent(this.page, { locatorObject: this.page.locator('[type="password"]').first() });
        this.passWordConfirmTextBox = new TextBoxComponent(this.page, { locatorObject: this.page.locator('[type="password"]').nth(1) })
        this.saveButton = new ButtonComponent(this.page, 'Save');
        this.cancelButton = new ButtonComponent(this.page, 'Cancel');
    }
}