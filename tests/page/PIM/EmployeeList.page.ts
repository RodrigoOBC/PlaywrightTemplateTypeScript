import { expect, type Page } from '@playwright/test';
import TextBoxComponent from '../../components/textBox.components';
import { ButtonComponent, ButtonIconComponent } from '../../components/button.components';
import { ComboboxComponent, AutoCompleteComponent } from '../../components/combobox.components';
import { Table } from '../../components/table.components';


export class EmployerListPage {
    readonly page: Page;
    readonly employerNameTextBox: AutoCompleteComponent
    readonly employmentID: TextBoxComponent
    readonly employmentStatusComboBox: ComboboxComponent
    readonly employmentIncludeComboBox: ComboboxComponent
    readonly supervisorNameTextBox: AutoCompleteComponent
    readonly jobTitleComboBox: ComboboxComponent
    readonly subUnitComboBox: ComboboxComponent
    readonly searchButton: ButtonComponent
    readonly table: Table

    constructor(page: Page) {
        this.page = page;
        this.employerNameTextBox = new AutoCompleteComponent(this.page, { locatorObject: this.page.locator('[class^="oxd-input-group"]').filter({hasText: 'Employee Name'}).getByRole('textbox')});
        this.employmentID = new TextBoxComponent(this.page, { locatorObject: this.page.getByRole('textbox').nth(1) });
        this.employmentStatusComboBox = new ComboboxComponent(this.page, { locatorObject: this.page.locator('.oxd-select-text').first() });
        this.employmentIncludeComboBox = new ComboboxComponent(this.page, { locatorObject: this.page.locator('.oxd-select-text').nth(1) });
        this.supervisorNameTextBox = new AutoCompleteComponent(this.page, { locatorObject: this.page.getByRole('textbox').nth(2) });
        this.jobTitleComboBox = new ComboboxComponent(this.page, { locatorObject: this.page.locator('.oxd-select-text').nth(2) });
        this.subUnitComboBox = new ComboboxComponent(this.page, { locatorObject: this.page.locator('.oxd-select-text').nth(3) });
        this.searchButton = new ButtonComponent(this.page, 'Search');
        this.table = new Table(this.page,
            {
                columnsName: ['ID', 'First (& Middle) Name', 'Last Name', 'Job Title', 'Employment Status', 'Sub Unit', 'Supervisor', 'Actions'],
                hasTextBox: false,
                tableButtonActions: [
                    { name: 'Edit', type: new ButtonIconComponent(this.page, 'edit') },
                    { name: 'Delete', type: new ButtonIconComponent(this.page, 'delete') }
                ]
            }
        );
    }

    
    async searchEmployeeByName(employeeName: string): Promise<void> {
        await this.employerNameTextBox.clickAndSelectOption(employeeName);
        await this.searchButton.click();
    }

    async validateEmployeeInTable(firstName: string, Middle: string, lastName: string): Promise<void> {
        const employeNames = await this.table.getColumnRowByColumnName('First (& Middle) Name');
        const lastNames = await this.table.getColumnRowByColumnName('Last Name');
        for (const employeName of employeNames) {
            await expect(employeName).toHaveText(firstName + ' ' + Middle);
            expect(lastNames).toContain(lastName);
        }
    }
   


}