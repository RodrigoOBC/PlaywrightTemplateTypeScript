import { expect, type Locator, type Page } from '@playwright/test';
import TextBoxComponent from '../components/textBox.components';
import { ButtonComponent, radioButtonComponent } from '../components/button.components';
import { comboboxComponent ,autoCompleteComponent} from '../components/combobox.components';


export class FormPage {
    readonly page: Page;
    readonly firstName: TextBoxComponent
    readonly lastName: TextBoxComponent
    readonly email: TextBoxComponent
    readonly gender: (name: string) => radioButtonComponent
    readonly mobileNumber: TextBoxComponent
    readonly dateOfBirthInput: TextBoxComponent
    readonly subjectsInput: autoCompleteComponent
    readonly hobbies: (name: string) => Locator
    readonly uploadPicture: Locator
    readonly currentAddress: TextBoxComponent
    readonly stateDropdown: comboboxComponent
    readonly cityDropdown: comboboxComponent
    readonly submitButton: ButtonComponent


    constructor(page: Page) {
        this.page = page;
        this.firstName = new TextBoxComponent(this.page, {locatorObject :this.page.locator('#firstName')});
        this.lastName = new TextBoxComponent(this.page, {locatorObject :this.page.locator('#lastName')});
        this.email = new TextBoxComponent(this.page, {locatorObject :this.page.locator('#userEmail')});
        this.gender = (name: string) => new radioButtonComponent(this.page, name);
        this.mobileNumber = new TextBoxComponent(this.page, {locatorObject :this.page.locator('#userNumber')});
        this.dateOfBirthInput = new TextBoxComponent(this.page, {locatorObject :this.page.locator('#dateOfBirthInput')});
        this.subjectsInput = new autoCompleteComponent(this.page, {locatorObject :this.page.locator('#subjectsInput')});
        this.hobbies = (name: string) => this.page.getByRole('checkbox', { name: name });
        this.uploadPicture = this.page.locator('#uploadPicture');
        this.currentAddress = new TextBoxComponent(this.page, {locatorObject :this.page.locator('#currentAddress')});
        this.stateDropdown = new comboboxComponent(this.page, {locatorObject :this.page.locator('#state')});
        this.cityDropdown = new comboboxComponent(this.page, {locatorObject :this.page.locator('#city')});
        this.submitButton = new ButtonComponent(this.page, 'Submit');
    }

    async navigate() {
        await this.page.goto('/automation-practice-form');
    }

    
    async selectHobbies(hobbiesNames: string[]) {
        for (const hobby of hobbiesNames) {
            const hobbyOption = this.hobbies(hobby);
            await hobbyOption.check();
            await expect(hobbyOption).toBeChecked();
        }
    }

    async uploadPictureFile(filePath: string) {
        await this.uploadPicture.setInputFiles(filePath);
    }
    
    async verifySubmission(expectedData: { [key: string]: string }) {
        for (const [label, value] of Object.entries(expectedData)) {
            const row = this.page.locator('table').getByRole('row', { hasText: label });
            await expect(row).toContainText(value);
        }
    }
}