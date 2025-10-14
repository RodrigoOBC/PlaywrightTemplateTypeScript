import { type Locator, type Page } from '@playwright/test';


export class ButtonComponent {
    readonly page: Page
    readonly locator: Locator

    constructor(page: Page, private selector: string) {
        this.page = page;
        this.locator = this.page.getByRole('button', { name: this.selector });
    }

    get(): Locator { return this.locator; }

    async click(): Promise<void> { await this.locator.click(); }

    async isVisible(): Promise<boolean> { return this.locator.isVisible(); }


}

export class LinkButtonComponent extends ButtonComponent {
    readonly page: Page
    readonly locator: Locator
    readonly locators: { pathForlocator?: string, locatorObject?: Locator }

    constructor(page: Page, locators: { pathForlocator?: string, locatorObject?: Locator }) {
        super(page, '');
        this.page = page;
        this.locators = { pathForlocator: locators.pathForlocator, locatorObject: locators.locatorObject };
        this.locator = this.locators.pathForlocator ? this.page.getByRole('link', { name: this.locators.pathForlocator }) : this.locators.locatorObject ?? (() => { throw new Error('Either pathForlocator or locatorObject must be provided.'); })();
    }

    get(): Locator { return this.locator; }

}

export class RadioButtonComponent extends ButtonComponent {
    readonly page: Page
    readonly locator: Locator

    constructor(page: Page, private name: string) {
        super(page, name);
        this.page = page;
        this.locator = this.page.getByText(name, { exact: true });
    }

    get(): Locator { return this.locator; }

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

    get(): Locator { return this.icon[this.iconName]; }

}

export class ListButtonComponent {
    readonly page: Page
    readonly locator: Locator

    constructor(page: Page, name: string) {
        this.page = page;
        this.locator = this.page.getByRole('listitem').filter({ hasText: name });
    }

    get(): Locator { return this.locator; }
}