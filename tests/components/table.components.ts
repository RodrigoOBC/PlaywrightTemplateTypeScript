import { expect } from '@playwright/test';
import { type Locator, type Page } from '@playwright/test';
import {type ButtonIconComponent} from './button.components.ts';
import TextBoxComponent from '../components/textBox.components';

export class Table {
    readonly page
    readonly columnsName: string[]
    readonly ButtonActions: { name: string, type: ButtonIconComponent  }[] | null
    readonly locators: { line: () => Promise<Locator[]>, firstLine: () => Promise<Locator> }
    readonly filterTextBox: TextBoxComponent | null
    readonly columnLocators: { [key: string]: Locator }
    readonly columnIndex: { [key: string]: number }


    constructor(page: Page, objectsTable: { columnsName: string[], tableButtonActions?: { name: string, type: ButtonIconComponent  }[], hasTextBox?: boolean }) {
        this.page = page;
        this.columnsName = objectsTable.columnsName || [];
        this.ButtonActions = objectsTable.tableButtonActions ? objectsTable.tableButtonActions : null;
        this.locators = {
            line: async () => await this.page.getByRole('row').filter({ has: await this.page.getByRole('cell') }).all(),
            firstLine: async () => await this.page.getByRole('row').filter({ has: await this.page.getByRole('cell') }).first(),

        };
        this.filterTextBox = objectsTable.hasTextBox ? new TextBoxComponent(this.page, {pathForlocator:'role=Textbox'}) : null
        this.columnIndex = {}
        this.columnLocators = this.initializeColumnLocators();
    }

    initializeColumnLocators(): { [key: string]: Locator } {
        let columnLocators : {[key: string]: Locator } = {};

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
        const columnIndex: Locator[] = []
        for(let line of lines){
            columnIndex.push(await line.getByRole('cell').nth(this.columnIndex[columnName]))
        }
        return columnIndex

       
    }


    
}

