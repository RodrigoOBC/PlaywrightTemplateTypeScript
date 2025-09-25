import { expect, type Locator, type Page } from '@playwright/test';
import TextBoxComponent from '../components/textBox.components';
import { ButtonComponent, radioButtonComponent } from '../components/button.components';


export class FormPage {
    readonly page: Page;
    readonly firstName: TextBoxComponent
    readonly lastName: TextBoxComponent
    readonly email: TextBoxComponent
    readonly gender: (name: string) => radioButtonComponent
    readonly mobileNumber: TextBoxComponent
    readonly dateOfBirthInput: TextBoxComponent
    readonly subjectsInput: Locator
    readonly hobbies: (name: string) => Locator
    readonly uploadPicture: Locator
    readonly currentAddress: Locator
    readonly stateDropdown: Locator
    readonly cityDropdown: Locator
    readonly submitButton: ButtonComponent


    constructor(page: Page) {
        this.page = page;
        this.firstName = new TextBoxComponent(this.page, {locatorObject :this.page.locator('#firstName')});
        this.lastName = new TextBoxComponent(this.page, {locatorObject :this.page.locator('#lastName')});
        this.email = new TextBoxComponent(this.page, {locatorObject :this.page.locator('#userEmail')});
        this.gender = (name: string) => new radioButtonComponent(this.page, name);
        this.mobileNumber = new TextBoxComponent(this.page, {locatorObject :this.page.locator('#userNumber')});
        this.dateOfBirthInput = new TextBoxComponent(this.page, {locatorObject :this.page.locator('#dateOfBirthInput')});
        this.subjectsInput = this.page.locator('#subjectsInput');
        this.hobbies = (name: string) => this.page.getByRole('checkbox', { name: name });
        this.uploadPicture = this.page.locator('#uploadPicture');
        this.currentAddress = this.page.locator('#currentAddress');
        this.stateDropdown = this.page.locator('#state');
        this.cityDropdown = this.page.locator('#city');
        this.submitButton = new ButtonComponent(this.page, 'Submit');
    }

    async navigate() {
        await this.page.goto('/automation-practice-form');
    }

    async fillSubjects(subjects: string[]) {
        for (const subject of subjects) {
            await this.subjectsInput.fill(subject);
            await this.subjectsInput.press('Enter');
        }
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

    async fillCurrentAddress(address: string) {
        await this.currentAddress.fill(address);
    }

    async selectState(stateName: string) {
        await this.stateDropdown.click();
        const stateOption = this.page.locator(`#stateCity-wrapper div[role="option"]`, { hasText: stateName });
        await stateOption.click();
    }

    async selectCity(cityName: string) {
        await this.cityDropdown.click();
        const cityOption = this.page.locator(`#stateCity-wrapper div[role="option"]`, { hasText: cityName });
        await cityOption.click();
    }
    
    async verifySubmission(expectedData: { [key: string]: string }) {
        for (const [label, value] of Object.entries(expectedData)) {
            const row = this.page.locator('table').getByRole('row', { hasText: label });
            await expect(row).toContainText(value);
        }
    }
}