import { type Locator, type Page } from '@playwright/test';
import { LinkButtonComponent } from '../components/button.components';

export class SideBarComponent {
    readonly page: Page
    readonly adminButton: LinkButtonComponent
    readonly pimButton: LinkButtonComponent
    readonly leaveButton: LinkButtonComponent
    readonly timeButton: LinkButtonComponent
    readonly recruitmentButton: LinkButtonComponent
    readonly myInfoButton: LinkButtonComponent
    readonly performanceButton: LinkButtonComponent
    readonly dashboardButton: LinkButtonComponent
    readonly directoryButton: LinkButtonComponent
    readonly maintenanceButton: LinkButtonComponent
    readonly buzzButton: LinkButtonComponent

    constructor(page: Page) {
        this.page = page;
        this.adminButton = new LinkButtonComponent(this.page, {locatorObject :this.page.getByRole('link', { name: 'Admin' })});
        this.pimButton = new LinkButtonComponent(this.page, {locatorObject :this.page.getByRole('link', { name: 'PIM' })});
        this.leaveButton = new LinkButtonComponent(this.page, {locatorObject :this.page.getByRole('link', { name: 'Leave' })});
        this.timeButton = new LinkButtonComponent(this.page, {locatorObject :this.page.getByRole('link', { name: 'Time' })});
        this.recruitmentButton = new LinkButtonComponent(this.page, {locatorObject :this.page.getByRole('link', { name: 'Recruitment' })});
        this.myInfoButton = new LinkButtonComponent(this.page, {locatorObject :this.page.getByRole('link', { name: 'My Info' })});
        this.performanceButton = new LinkButtonComponent(this.page, {locatorObject :this.page.getByRole('link', { name: 'Performance' })});
        this.dashboardButton = new LinkButtonComponent(this.page, {locatorObject :this.page.getByRole('link', { name: 'Dashboard' })});
        this.directoryButton = new LinkButtonComponent(this.page, {locatorObject :this.page.getByRole('link', { name: 'Directory' })});
        this.maintenanceButton = new LinkButtonComponent(this.page, {locatorObject :this.page.getByRole('link', { name: 'Maintenance' })});
        this.buzzButton = new LinkButtonComponent(this.page, {locatorObject :this.page.getByRole('link', { name: 'Buzz' })});
    }

}