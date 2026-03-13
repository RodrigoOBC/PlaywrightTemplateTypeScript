import { expect, type Page } from '@playwright/test';
import TextBoxComponent from '../../../components/textBox.components';
import { ButtonComponent } from '../../../components/button.components';
import UploadFileComponent from '../../../components/fileUpload.components';
import { MenssagerComponent } from '../../../components/menssager.components';

export class EditJobTitlePage {
    readonly page: Page;
    readonly jobTitleTextBox: TextBoxComponent
    readonly jobDescriptionTextBox: TextBoxComponent
    readonly jobNoteTextBox: TextBoxComponent
    readonly jobSpecUploadButton: UploadFileComponent
    readonly saveButton: ButtonComponent
    readonly cancelButton: ButtonComponent
    readonly mensagerSuccessComponent: MenssagerComponent;

    constructor(page: Page) {
        this.page = page;
        this.jobTitleTextBox = new TextBoxComponent(this.page, { locatorObject: this.page.locator('[class^="oxd-input-group"]').filter({ hasText: 'Job Title' }).getByRole('textbox') });
        this.jobDescriptionTextBox = new TextBoxComponent(this.page, { locatorObject: this.page.getByRole('textbox', { name: 'Type description here' })});
        this.jobNoteTextBox = new TextBoxComponent(this.page, { locatorObject: this.page.getByRole('textbox', { name: 'Add note' })});
        this.jobSpecUploadButton = new UploadFileComponent(this.page, { locatorObject: this.page.locator('label').filter({ hasText: 'Job Specification' }).getByRole('button') });
        this.saveButton = new ButtonComponent(this.page, 'Save');
        this.cancelButton = new ButtonComponent(this.page, 'Cancel');
        this.mensagerSuccessComponent = new MenssagerComponent(this.page, 'rgb(52, 188, 64)', 'Success', 'Successfully Updated');
    }

    async getJobTitleValue(): Promise<string> {
        const locator = this.jobTitleTextBox.get();
        return await locator.inputValue();
    }

    async editJobTitle(newJobTitle: string): Promise<void> {
        await this.jobTitleTextBox.clearTextBox();
        await this.jobTitleTextBox.fillTextBox(newJobTitle);
    }

    async editJobDescription(newJobDescription: string): Promise<void> {
        await this.jobDescriptionTextBox.clearTextBox();
        await this.jobDescriptionTextBox.fillTextBox(newJobDescription);
    }

    async editJobNote(newJobNote: string): Promise<void> {
        await this.jobNoteTextBox.clearTextBox();
        await this.jobNoteTextBox.fillTextBox(newJobNote);
    }

    async fillEditJobTitleForm(jobTitle?: string, jobDescription?: string, jobNote?: string, jobSpecFilePath?: string): Promise<void> {
        if (jobTitle) {
            await this.editJobTitle(jobTitle);
        }
        if (jobDescription) {
            await this.editJobDescription(jobDescription);
        }
        if (jobNote) {
            await this.editJobNote(jobNote);
        }
        if (jobSpecFilePath) {
            await this.jobSpecUploadButton.uploadFile(jobSpecFilePath);
        }
    }

    async saveChanges(): Promise<void> {
        await this.saveButton.click();
    }

    async cancelChanges(): Promise<void> {
        await this.cancelButton.click();
    }

    async validateSuccessMessage(): Promise<void> {
        const menssager = this.mensagerSuccessComponent;
        await expect(menssager.get()).toBeVisible();
        await expect(await menssager.getTextMessage()).toMatchObject({ title: menssager.titleMessage, message: menssager.textMessage });
        await expect(await menssager.getCollor()).toBe(menssager.color);
    }

    async validateEditJobTitlePageIsOpen(): Promise<void> {
        await expect(this.page.getByRole('heading', { name: 'Edit Job Title' })).toBeVisible();
    }
}
