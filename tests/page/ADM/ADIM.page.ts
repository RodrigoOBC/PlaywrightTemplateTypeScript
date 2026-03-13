import { type Page } from '@playwright/test';
import { SideBarComponent } from '../../components/sideBar.components'
import { HeaderMenuComponent } from '../../components/headerMenu.components';
import { MenssagerComponent } from '../../components/menssager.components';
import { AddAdminPage } from './UsersManagement/AddAdmin.page'
import { AdminListPage } from './UsersManagement/AdminList.page';
import { AddJobTitlePage } from './Jobs/AddJobTitle.page';
import { JobTitlesListPage } from './Jobs/JobTitles.page';
import { EditJobTitlePage } from './Jobs/EditJobTitle.page';



export class AdminUserPage {
    readonly page: Page;
    readonly sideBarComponent: SideBarComponent
    readonly headerMenuComponent: HeaderMenuComponent
    readonly menssagerComponent: MenssagerComponent
    readonly addAdminPage: AddAdminPage
    readonly adminListPage: AdminListPage
    readonly addJobTitlePage: AddJobTitlePage
    readonly jobTitlesListPage: JobTitlesListPage
    readonly editJobTitlePage: EditJobTitlePage

    constructor(page: Page) {
        this.page = page;
        this.sideBarComponent = new SideBarComponent(this.page);
        this.headerMenuComponent = new HeaderMenuComponent(this.page, ['User Management', 'Job', 'Organization', 'Qualifications', 'Skills', 'Education', 'Licenses', 'Languages', 'Memberships']);
        this.menssagerComponent = new MenssagerComponent(this.page, 'rgb(52, 188, 64)', 'Success', 'Successfully Saved');
        this.addAdminPage = new AddAdminPage(this.page);
        this.adminListPage = new AdminListPage(this.page);
        this.addJobTitlePage = new AddJobTitlePage(this.page);
        this.jobTitlesListPage = new JobTitlesListPage(this.page);
        this.editJobTitlePage = new EditJobTitlePage(this.page);
    }

    async navigate(): Promise<void> {
        await this.page.goto('/');
        await this.sideBarComponent.adminButton.click();
    }

    async navigateAddAdminPage(): Promise<void> {
        await this.headerMenuComponent.headerMenuButtons['User Management'].click();
        await this.page.getByRole('button', { name: 'Add' }).click();
    }

    async navigateListJobsPage(): Promise<void> {
        await this.headerMenuComponent.headerMenuButtons['Job'].click();
        await this.page.getByRole('menuitem', { name: 'Job Titles' }).click();
    }

    async navigateAddJobTitlePage(): Promise<void> {
        await this.navigateListJobsPage();
        await this.page.getByRole('button', { name: 'Add' }).click();
    }


}