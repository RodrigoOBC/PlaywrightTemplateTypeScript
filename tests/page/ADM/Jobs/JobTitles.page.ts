import { expect, type Page } from '@playwright/test';
import { Table } from '../../../components/table.components'
import { ButtonIconComponent } from '../../../components/button.components';

export class JobTitlesListPage {
    readonly page: Page;
    readonly tableObject: { columnsName: string[], tableButtonActions: { name: string, type: ButtonIconComponent }[], hasTextBox: boolean };
    readonly table: Table;

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
    }

    async validateJobTitleInList(jobTitle: string): Promise<void> {
        await this.table.waitForLoad();
        const jobTitleColumn = await this.table.getColumnRowByColumnName('Job Title');
        const jobTitlesText = await Promise.all(jobTitleColumn.map(async (locator) => await locator.innerText()));
        await expect(jobTitlesText).toContain(jobTitle);
    }
    
}