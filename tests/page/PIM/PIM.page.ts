import { expect, type Page } from '@playwright/test';
import { SideBarComponent } from '../../components/sideBar.components'
import { EmployerAddPage } from './AddEmployeer.page'
import { EmployerListPage } from './EmployeeList.page'
import { HeaderMenuComponent } from '../../components/headerMenu.components';
import { MenssagerComponent } from '../../components/menssager.components';


export class PIMPage {
    readonly page: Page;
    readonly sideBarComponent: SideBarComponent
    readonly EmployerListPage: EmployerListPage
    readonly EmployerAddPage: EmployerAddPage
    readonly headerMenuComponent: HeaderMenuComponent
    readonly menssagerComponent: MenssagerComponent

    constructor(page: Page) {
        this.page = page;
        this.EmployerListPage = new EmployerListPage(this.page);
        this.EmployerAddPage = new EmployerAddPage(this.page);
        this.sideBarComponent = new SideBarComponent(this.page);
        this.headerMenuComponent = new HeaderMenuComponent(this.page, ['Configuration', 'Employee List', 'Add Employee', 'Reports', 'Data Import', 'Termination Reasons', 'Custom Fields']);
        this.menssagerComponent = new MenssagerComponent(this.page, 'rgb(52, 188, 64)', 'Success', 'Successfully Saved');
    }

    async navigate(): Promise<void> {
        await this.page.goto('/');
        await this.sideBarComponent.pimButton.click();
    }

    async verifySucessMessage(): Promise<void> {
        const menssagerColor = await this.menssagerComponent.getCollor();
        const menssagerText = await this.menssagerComponent.getTextMessage();

        await expect(this.menssagerComponent.get()).toBeVisible();
        await expect(menssagerColor).toBe(this.menssagerComponent.color);
        await expect(menssagerText).toContain(this.menssagerComponent.textMessage);
    }

    async navigateToAddEmployee(): Promise<void> {
        await this.headerMenuComponent.headerMenuButtons['Add Employee'].click();
    }

    async navigateToEmployeeList(): Promise<void> {
        this.headerMenuComponent.headerMenuButtons['Employee List'].click();
    }

}