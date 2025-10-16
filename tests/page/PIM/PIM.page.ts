import { expect, type Page } from '@playwright/test';
import { SideBarComponent } from '../../components/sideBar.components'
import { EmployerAddPage } from './AddEmployeer.page'
import { EmployerListPage } from './EmployeeList.page'
import { HeaderMenuComponent } from '../../components/headerMenu.components';


export class PIMPage {
    readonly page: Page;
    readonly sideBarComponent: SideBarComponent
    readonly EmployerListPage: EmployerListPage
    readonly EmployerAddPage: EmployerAddPage
    readonly headerMenuComponent: HeaderMenuComponent

    constructor(page: Page) {
        this.page = page;
        this.EmployerListPage = new EmployerListPage(this.page);
        this.EmployerAddPage = new EmployerAddPage(this.page);
        this.sideBarComponent = new SideBarComponent(this.page);
        this.headerMenuComponent = new HeaderMenuComponent(this.page, ['Configuration', 'Employee List', 'Add Employee', 'Reports', 'Data Import', 'Termination Reasons', 'Custom Fields']);
        
    }

    async navigate(): Promise<void> {
        await this.page.goto('/');
        await this.sideBarComponent.pimButton.click();
    }

    async navigateToAddEmployee(): Promise<void> {
        await this.headerMenuComponent.headerMenuButtons['Add Employee'].click();
    }

    async navigateToEmployeeList(): Promise<void> {
        this.headerMenuComponent.headerMenuButtons['Employee List'].click();
    }

}