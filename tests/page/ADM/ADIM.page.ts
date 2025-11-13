import { expect, type Page } from '@playwright/test';
import { SideBarComponent } from '../../components/sideBar.components'
import { HeaderMenuComponent } from '../../components/headerMenu.components';
import { MenssagerComponent } from '../../components/menssager.components';
import { AddAdminPage } from './AddAdmin.page'


export class AdminUserPage {
    readonly page: Page;
    readonly sideBarComponent: SideBarComponent
    readonly headerMenuComponent: HeaderMenuComponent
    readonly menssagerComponent: MenssagerComponent
    readonly addAdminPage: AddAdminPage

    constructor(page: Page) {
        this.page = page;
        this.sideBarComponent = new SideBarComponent(this.page);
        this.headerMenuComponent = new HeaderMenuComponent(this.page, ['User Management', 'Job', 'Organization', 'Qualifications', 'Skills', 'Education', 'Licenses', 'Languages', 'Memberships']);
        this.menssagerComponent = new MenssagerComponent(this.page, 'rgb(52, 188, 64)', 'Success', 'Successfully Saved');
        this.addAdminPage = new AddAdminPage(this.page);
    }

    async navigate(): Promise<void> {
        await this.page.goto('/');
        await this.sideBarComponent.adminButton.click();
    }

    async navigateAddAdminPage(): Promise<void> {
        await this.headerMenuComponent.headerMenuButtons['User Management'].click();
        await this.page.getByRole('button', { name: 'Add' }).click();
    }


}