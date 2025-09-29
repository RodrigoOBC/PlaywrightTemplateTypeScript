import { expect, type Locator, type Page } from '@playwright/test';
import TextBoxComponent from '../components/textBox.components';
import { ButtonComponent, LinkButtonComponent } from '../components/button.components';
import { SideBarComponent } from '../components/sideBar.components'

export class AdminPage {
    readonly page: Page;
    readonly sideBarComponent: SideBarComponent
    readonly userName: TextBoxComponent
    readonly userRoleComboBox: TextBoxComponent
    readonly employeeNameTextBox: TextBoxComponent
    readonly statusComboBox: TextBoxComponent
    readonly searchButton: ButtonComponent
    readonly resetButton: ButtonComponent
    readonly addButton: ButtonComponent
    readonly deleteButton: ButtonComponent

    constructor(page: Page) {
        this.page = page;
        this.sideBarComponent = new SideBarComponent(this.page);
        this.userName = new TextBoxComponent(this.page, {locatorObject :this.page.locator('input[name="username"]')});
        this.userRoleComboBox = new TextBoxComponent(this.page, {locatorObject :this.page.locator('div[role="combobox"] >> nth=0')});
        this.employeeNameTextBox = new TextBoxComponent(this.page, {locatorObject :this.page.locator('input[placeholder="Type for hints..."]')});
        this.statusComboBox = new TextBoxComponent(this.page, {locatorObject :this.page.locator('div[role="combobox"] >> nth=1')});
        this.searchButton = new ButtonComponent(this.page, 'Search');
        this.resetButton = new ButtonComponent(this.page, 'Reset');
        this.addButton = new ButtonComponent(this.page, 'Add');
        this.deleteButton = new ButtonComponent(this.page, 'Delete');
    }

    async navigate() {
        await this.sideBarComponent.adminButton.click();
    }

}