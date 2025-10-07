import { expect, type Page } from '@playwright/test';
import TextBoxComponent from '../components/textBox.components';
import { ButtonComponent, ButtonIconComponent } from '../components/button.components';
import { SideBarComponent } from '../components/sideBar.components'
import { comboboxComponent, autoCompleteComponent } from '../components/combobox.components';
import { Table } from '../components/table.components';

export class AdminUserPage {
    readonly page: Page;
    readonly sideBarComponent: SideBarComponent
    readonly userName: TextBoxComponent
    readonly userRoleComboBox: comboboxComponent
    readonly employeeNameTextBox: autoCompleteComponent
    readonly statusComboBox: comboboxComponent
    readonly searchButton: ButtonComponent
    readonly table: Table

    constructor(page: Page) {
        this.page = page;
        this.sideBarComponent = new SideBarComponent(this.page);
        this.userName = new TextBoxComponent(this.page, { locatorObject: this.page.getByRole('textbox').nth(1) });
        this.userRoleComboBox = new comboboxComponent(this.page, { locatorObject: this.page.locator('.oxd-select-text').first() });
        this.employeeNameTextBox = new autoCompleteComponent(this.page, { locatorObject: this.page.getByRole('textbox', { name: 'Type for hints...' }) });
        this.statusComboBox = new comboboxComponent(this.page, { locatorObject: this.page.locator('.oxd-select-text').nth(1) });
        this.searchButton = new ButtonComponent(this.page, 'Search');
        this.table = new Table(this.page,
            {
                columnsName: ['Username', 'User Role', 'Employee Name', 'Status', 'Actions'],
                hasTextBox: false,
                tableButtonActions: [
                    { name: 'Edit', type: new ButtonIconComponent(this.page, 'edit') },
                    { name: 'Delete', type: new ButtonIconComponent(this.page, 'delete') }
                ]
            }
        );
    }

    async navigate(): Promise<void> {
        await this.page.goto('/');
        await this.page.pause();
        await this.sideBarComponent.adminButton.click();
    }

    async validateUsersTable(userObjects: { Username: string, "User Role": string,  'Employee Name': string, Status: string, 'Actions': string }[]): Promise<void> {
        const lines = await this.table.getColumnRowByColumnName('Username');
        for (let i = 0; i < userObjects.length; i++) {
            const line = lines[i];
            await expect(line).toHaveText(userObjects[i].Username);
        }
    }

}