import { type Locator, type Page } from '@playwright/test';

export class ComboboxComponent {
    readonly page: Page
    readonly locators: { pathForlocator?: string, locatorObject?: Locator }
    readonly locatorObject: Locator

    constructor(page: Page, locators: { pathForlocator?: string, locatorObject?: Locator }) {
        this.page = page;
        this.locators = { pathForlocator: locators.pathForlocator, locatorObject: locators.locatorObject };
        this.locatorObject = this.locators.pathForlocator ? this.page.locator(this.locators.pathForlocator) : this.locators.locatorObject ?? (() => { throw new Error('Either pathForlocator or locatorObject must be provided.'); })();
    }

    get(): Locator { return this.locatorObject; }

    async click(): Promise<void> { await this.locatorObject.click(); }

    async isVisible(): Promise<boolean> { return this.locatorObject.isVisible(); }

    async selectOption(option: string): Promise<void> { await this.locatorObject.selectOption({ label: option }); }

    async clickAndSelectOption(option: string): Promise<void> { await this.locatorObject.click(); await this.page.getByRole('option', { name: option }).click(); }

}

export class AutoCompleteComponent extends ComboboxComponent {
    readonly page: Page
    readonly locators: { pathForlocator?: string, locatorObject?: Locator }
    readonly locatorObject: Locator

    constructor(page: Page, locators: { pathForlocator?: string, locatorObject?: Locator }) {
        super(page, locators);
        this.page = page;
        this.locators = { pathForlocator: locators.pathForlocator, locatorObject: locators.locatorObject };
        this.locatorObject = this.locators.pathForlocator ? this.page.locator(this.locators.pathForlocator) : this.locators.locatorObject ?? (() => { throw new Error('Either pathForlocator or locatorObject must be provided.'); })();
    }

    get(): Locator { return this.locatorObject; }

    async fillAndPressEnter(option: string): Promise<void> {
        await this.locatorObject.fill(option);
        await this.locatorObject.press('Enter');
    }

    async fillAndSelectOption(option: string): Promise<void> {
        await this.locatorObject.fill(option);
        await this.locatorObject.selectOption({ label: option });
    }

    async clickAndSelectOption(option: string): Promise<void> {
        await this.locatorObject.click();
        await this.locatorObject.fill(option);
        await this.page.getByRole('option', { name: option }).click();
    }

}