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
        const rows = await this.table.getAllRows();
        
        for (const row of rows) {
            const cells = row.getByRole('cell');
            const cellText = await cells.nth(1).innerText();
            
            if (cellText.trim() === jobTitle.trim()) {
                const deleteButton = row.locator('button i.bi-trash');
                await deleteButton.click();
                await this.confirmDeleteButton.click();
                await this.page.waitForLoadState('networkidle');
                return;
            }
        }
    }

    async deleteRandomJobTitle(): Promise<string> {
        await this.table.waitForLoad();
        const rows = await this.table.getAllRows();
        
        if (rows.length === 0) {
            throw new Error('No job titles available to delete');
        }
        
        const randomIndex = Math.floor(Math.random() * Math.min(rows.length, 5));
        const selectedRow = rows[randomIndex];
        const cells = selectedRow.getByRole('cell');
        const jobTitleName = await cells.nth(1).innerText();
        
        const deleteButton = selectedRow.locator('button i.bi-trash');
        await deleteButton.click();
        await this.confirmDeleteButton.click();
        await this.page.waitForLoadState('networkidle');
        
        return jobTitleName.trim();
    }

    async validateJobTitleNotInList(jobTitle: string): Promise<void> {
        await this.table.waitForLoad();
        const jobTitleColumn = await this.table.getColumnRowByColumnName('Job Title');
        const jobTitlesText = await Promise.all(jobTitleColumn.map(async (locator) => await locator.innerText()));
        expect(jobTitlesText).not.toContain(jobTitle);
    }

    async editJobTitleByName(jobTitle: string): Promise<void> {
        await this.table.waitForLoad();
        const rows = await this.table.getAllRows();
        
        for (const row of rows) {
            const cells = row.getByRole('cell');
            const cellText = await cells.nth(1).innerText();
            
            if (cellText.trim() === jobTitle.trim()) {
                const editButton = row.locator('button i.bi-pencil-fill');
                await editButton.click();
                await this.page.waitForLoadState('networkidle');
                return;
            }
        }
    }

    async editRandomJobTitle(): Promise<string> {
        await this.table.waitForLoad();
        const rows = await this.table.getAllRows();
        
        if (rows.length === 0) {
            throw new Error('No job titles available to edit');
        }
        
        const randomIndex = Math.floor(Math.random() * Math.min(rows.length, 5));
        const selectedRow = rows[randomIndex];
        const cells = selectedRow.getByRole('cell');
        const jobTitleName = await cells.nth(1).innerText();
        
        const editButton = selectedRow.locator('button i.bi-pencil-fill');
        await editButton.click();
        await this.page.waitForLoadState('networkidle');
        
        return jobTitleName.trim();
    }
    
}