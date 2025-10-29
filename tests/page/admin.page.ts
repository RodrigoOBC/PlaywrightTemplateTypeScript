import { expect, type Page } from '@playwright/test';
import TextBoxComponent from '../components/textBox.components';
import { ButtonComponent, ButtonIconComponent } from '../components/button.components';
import { SideBarComponent } from '../components/sideBar.components'
import { ComboboxComponent, AutoCompleteComponent } from '../components/combobox.components';
import { Table } from '../components/table.components';

export class AdminUserPage {
    readonly page: Page;
    readonly sideBarComponent: SideBarComponent
    readonly userName: TextBoxComponent
    readonly userRoleComboBox: ComboboxComponent
    readonly employeeNameTextBox: AutoCompleteComponent
    readonly statusComboBox: ComboboxComponent
    readonly searchButton: ButtonComponent
    readonly table: Table

    constructor(page: Page) {
        this.page = page;
        this.sideBarComponent = new SideBarComponent(this.page);
        this.userName = new TextBoxComponent(this.page, { locatorObject: this.page.getByRole('textbox').nth(1) });
        this.userRoleComboBox = new ComboboxComponent(this.page, { locatorObject: this.page.locator('.oxd-select-text').first() });
        this.employeeNameTextBox = new AutoCompleteComponent(this.page, { locatorObject: this.page.getByRole('textbox', { name: 'Type for hints...' }) });
        this.statusComboBox = new ComboboxComponent(this.page, { locatorObject: this.page.locator('.oxd-select-text').nth(1) });
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