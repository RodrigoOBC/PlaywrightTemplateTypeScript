import { type Page } from '@playwright/test';
import TextBoxComponent from '../../../components/textBox.components';
import { ButtonComponent } from '../../../components/button.components';
import UploadFileComponent from '../../../components/fileUpload.components';

export class AddJobTitlePage {
    readonly page: Page;
    readonly jobTitleTextBox: TextBoxComponent
    readonly jobDescriptionTextBox: TextBoxComponent
    readonly jobNoteTextBox: TextBoxComponent
    readonly jobSpecUploadButton: UploadFileComponent
    readonly saveButton: ButtonComponent
    readonly cancelButton: ButtonComponent

    constructor(page: Page) {
        this.page = page;
        this.jobTitleTextBox = new TextBoxComponent(this.page, { locatorObject: this.page.locator('[class^="oxd-input-group"]').filter({ hasText: 'Job Title' }).getByRole('textbox') });
        this.jobDescriptionTextBox = new TextBoxComponent(this.page, { locatorObject: this.page.getByRole('textbox', { name: 'Type description here' })});
        this.jobNoteTextBox = new TextBoxComponent(this.page, { locatorObject: this.page.getByRole('textbox', { name: 'Add note' })});
        this.jobSpecUploadButton = new UploadFileComponent(this.page, { locatorObject: this.page.locator('label').filter({ hasText: 'Job Specification' }).getByRole('button') });
        this.saveButton = new ButtonComponent(this.page, 'Save');
        this.cancelButton = new ButtonComponent(this.page, 'Cancel');
    }   

    async fillAddJobTitleForm(jobTitle: string, jobDescription: string, jobNote: string, jobSpecFilePath?: string): Promise<void> {
        await this.jobTitleTextBox.fillTextBox(jobTitle);
        await this.jobDescriptionTextBox.fillTextBox(jobDescription);
        await this.jobNoteTextBox.fillTextBox(jobNote);
        if (jobSpecFilePath) {
            await this.jobSpecUploadButton.uploadFile(jobSpecFilePath);
        }
    }
}