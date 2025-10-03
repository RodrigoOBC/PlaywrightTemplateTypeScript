import { type Locator, type Page } from '@playwright/test';


export class ButtonComponent {
    readonly page: Page
    readonly locator: Locator

    constructor(page: Page, private selector: string) {
        this.page = page;
        this.locator = this.page.getByRole('button', { name: this.selector });
    }

    async get():Promise<Locator> {
        return this.locator
    }

    async click(): Promise<void>  {
        const button = await this.get();
        await button.click();
    }

    async isVisible(): Promise<boolean>  {
        const button = await this.get();
        return button.isVisible();
    }


}

export class LinkButtonComponent extends ButtonComponent {
    readonly page: Page
    readonly locator: Locator
    readonly locators: { pathForlocator?: string, locatorObject?: Locator }

    constructor(page: Page, locators: { pathForlocator?: string, locatorObject?: Locator }) {
        super(page, '');
        this.page = page;
        this.locators = { pathForlocator: locators.pathForlocator, locatorObject: locators.locatorObject };
        this.locator = this.locators.pathForlocator ? this.page.getByRole('link',{name: this.locators.pathForlocator}) : this.locators.locatorObject ?? (() => { throw new Error('Either pathForlocator or locatorObject must be provided.'); })();
    }

    async get():Promise<Locator>  {
        return this.locator
    }

}

export class radioButtonComponent extends ButtonComponent {
    readonly page: Page
    readonly locator: Locator

    constructor(page: Page, private name: string) {
        super(page, name);
        this.page = page;
        this.locator = this.page.getByText(name, {exact: true});
    }

    async get():Promise<Locator>  {
        return this.locator
    }

}


export class ButtonIconComponent extends ButtonComponent {
    readonly page: Page
    readonly iconName: string
    readonly icon: { [key: string]: Locator }

    constructor(page: Page, iconName: string) {
        super(page, iconName);
        this.page = page;
        this.iconName = iconName;
        this.icon = {
            delete: this.page.locator('[class="oxd-icon-button oxd-table-cell-action-space"] [class="oxd-icon bi-trash"]'),
            edit: this.page.getByTestId('[class="oxd-icon-button oxd-table-cell-action-space"] [class="oxd-icon bi-pencil-fill"]'),
            help: this.page.getByTestId('InfoOutlinedIcon'),
            sonarRedirect: this.page.getByTestId('sonar-redirect-icon-active'),
            download: this.page.getByTestId("FileDownloadOutlinedIcon"),
            redirectLink: this.page.getByTestId("ArrowOutwardIcon"),
        };
    }

    async get() {
        const button = await this.icon[this.iconName]
        return button
    }

}