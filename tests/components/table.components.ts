import { expect } from '@playwright/test';
import { type Locator, type Page } from '@playwright/test';
import { ButtonIconComponent, TableButtonIconComponent } from './button.components';
import TextBoxComponent from '../components/textBox.components';

export class Table {
    readonly page
    readonly columnsName: string[]
    readonly ButtonActions: { name: string, type: ButtonIconComponent }[] | null
    readonly locators: { line: () => Promise<Locator[]>, firstLine: () => Promise<Locator> }
    readonly filterTextBox: TextBoxComponent | null
    readonly columnLocators: { [key: string]: Locator }
    readonly columnIndex: { [key: string]: number }


    constructor(page: Page, objectsTable: { columnsName: string[], tableButtonActions?: { name: string, type: ButtonIconComponent }[], hasTextBox?: boolean }) {
        this.page = page;
        this.columnsName = objectsTable.columnsName || [];
        this.ButtonActions = objectsTable.tableButtonActions ? objectsTable.tableButtonActions : null;
        this.locators = {
            line: async () => this.page.getByRole('row').filter({ has: this.page.getByRole('cell') }).all(),
            firstLine: async () => {
                const first = this.page.getByRole('row').filter({ has: this.page.getByRole('cell') }).first();
                await first.waitFor({ state: 'visible' });
                return first;
            },
        };
        this.filterTextBox = objectsTable.hasTextBox ? new TextBoxComponent(this.page, { pathForlocator: 'role=Textbox' }) : null
        this.columnIndex = {}
        this.columnLocators = this.initializeColumnLocators();
    }

    initializeColumnLocators(): { [key: string]: Locator } {
        const columnLocators: { [key: string]: Locator } = {};

        for (const columnName of this.columnsName) {
            columnLocators[columnName] = this.page.getByRole('columnheader', { name: columnName })
        }

        for (let i = 0; i < this.columnsName.length; i++) {
            this.columnIndex[this.columnsName[i]] = i + 1
        }
        return columnLocators;
    }

    async waitForLoad(): Promise<void> {
        const firstLine = await this.locators.firstLine();
        await expect(firstLine).toBeVisible({ timeout: 120000 });
    }

    async getAllRows(): Promise<Locator[]> {
        const rows = await this.locators.line();
        return rows
    }

    async getColumnRowByColumnName(columnName: string): Promise<Locator[]> {
        const lines = await this.getAllRows();
        const columnIndex: Locator[] = [];
        for (const line of lines) {
            columnIndex.push(line.getByRole('cell').nth(this.columnIndex[columnName]));
        }
        return columnIndex;
    }

    async getRowByValueName(columnName: string, value: string): Promise<Locator | null> {
        const lines = await this.getAllRows();
        for (const line of lines) {
            const cell = line.getByRole('cell').nth(this.columnIndex[columnName]);
            const cellText = await cell.innerText();
            if (cellText.trim() === value.trim()) {
                return line;
            }
        }
        return null;
    }

    async getRowByColumnNameAndPositionRow(column: string, row: Locator) {
        const rows = row.getByRole('cell').nth(this.columnIndex[column]);
        return rows;
    }

    async getValuesByLines(line: Locator, colums: string[]): Promise<{ [key: string]: string }> {

        const valuesText: { [key: string]: string } = {};

        for (const column of colums) {
            const Cell = await this.getRowByColumnNameAndPositionRow(column, line);
            const cellText = await Cell.innerText();
            valuesText[column] = cellText.trim();
        }

        return valuesText;
    }

    async getButtonsByLines(line: Locator, buttons: string[]): Promise<{ [key: string]: TableButtonIconComponent }> {
        const buttonActions: { [key: string]: TableButtonIconComponent } = {}

        for (const button of buttons) {
            buttonActions[button] = new TableButtonIconComponent(this.page, button, line)
        }

        return buttonActions;

    }


}

