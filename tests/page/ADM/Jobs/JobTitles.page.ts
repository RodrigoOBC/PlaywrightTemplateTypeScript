import { expect, type Page } from '@playwright/test';
import { Table } from '../../../components/table.components'
import { ButtonIconComponent, ButtonComponent } from '../../../components/button.components';

export class JobTitlesListPage {
    readonly page: Page;
    readonly tableObject: { columnsName: string[], tableButtonActions: { name: string, type: ButtonIconComponent }[], hasTextBox: boolean };
    readonly table: Table;
    readonly confirmDeleteButton: ButtonComponent;

    constructor(page: Page) {
        this.page = page;
        this.tableObject = {
            columnsName: ['Job Title', 'Job Description', 'Actions'],
            tableButtonActions: [
                { name: 'Edit', type: new ButtonIconComponent(this.page, 'edit') },
                { name: 'Delete', type: new ButtonIconComponent(this.page, 'delete') }
            ],
            hasTextBox: false,
        };
        this.table = new Table(this.page, this.tableObject);
        this.confirmDeleteButton = new ButtonComponent(this.page, 'Yes, Delete');
    }

    async validateJobTitleInList(jobTitle: string): Promise<void> {
        await this.table.waitForLoad();
        const jobTitleColumn = await this.table.getColumnRowByColumnName('Job Title');
        const jobTitlesText = await Promise.all(jobTitleColumn.map(async (locator) => await locator.innerText()));
        expect(jobTitlesText).toContain(jobTitle);
    }

    async deleteJobTitleByName(jobTitle: string): Promise<void> {
        await this.table.waitForLoad();
        const selectedRow = await this.table.getRowByValueName('Job Title', jobTitle);
        const buttonsByLine = await this.table.getButtonsByLines(selectedRow, ['delete']);

        await buttonsByLine['delete'].click();
        await this.confirmDeleteButton.click();
    }

    async deleteRandomJobTitle(): Promise<string> {
        await this.table.waitForLoad();
        const rows = await this.table.getAllRows();
                
        const randomIndex = Math.floor(Math.random() * Math.min(rows.length, 5));
        const selectedRow = rows[randomIndex];

        const ValuesByLine = await this.table.getValuesByLines(selectedRow, ["Job Title"]);
        const buttonsByLine = await this.table.getButtonsByLines(selectedRow, ['delete']);

        await buttonsByLine['delete'].click();
        await this.confirmDeleteButton.click();
        
        return ValuesByLine['Job Title'].trim();
    }

    async validateJobTitleNotInList(jobTitle: string): Promise<void> {
        await this.table.waitForLoad();
        const jobTitleColumn = await this.table.getColumnRowByColumnName('Job Title');
        const jobTitlesText = await Promise.all(jobTitleColumn.map(async (locator) => await locator.innerText()));
        expect(jobTitlesText).not.toContain(jobTitle);
    }

    async editJobTitleByName(jobTitle: string): Promise<void> {
        await this.table.waitForLoad();
        const selectedRow = await this.table.getRowByValueName('Job Title', jobTitle);

        const ValuesByLine = await this.table.getValuesByLines(selectedRow, ["Job Title"]);
        const buttonsByLine = await this.table.getButtonsByLines(selectedRow, ['edit']);

        await buttonsByLine['edit'].click();
        
    }

    async editRandomJobTitle(): Promise<string> {
        await this.table.waitForLoad();
        const rows = await this.table.getAllRows();
                
        const randomIndex = Math.floor(Math.random() * Math.min(rows.length, 5));
        const selectedRow = rows[randomIndex];

        const ValuesByLine = await this.table.getValuesByLines(selectedRow, ["Job Title"]);
        const buttonsByLine = await this.table.getButtonsByLines(selectedRow, ['edit']);

        await buttonsByLine['edit'].click();
        
        return ValuesByLine["Job Title"].trim();
    }
    
}