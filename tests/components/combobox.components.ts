import { type Locator, type Page } from '@playwright/test';

export class comboboxComponent {
    readonly page: Page
    readonly locators: { pathForlocator?: string, locatorObject?: Locator }
    readonly locatorObject: Locator

    constructor(page: Page, locators: { pathForlocator?: string, locatorObject?: Locator }) {
        this.page = page;
        this.locators = { pathForlocator: locators.pathForlocator, locatorObject: locators.locatorObject };
        this.locatorObject = this.locators.pathForlocator ? this.page.locator(this.locators.pathForlocator) : this.locators.locatorObject ?? (() => { throw new Error('Either pathForlocator or locatorObject must be provided.'); })();
    }

    async get():Promise<Locator> {
        return this.locatorObject
    }

    async click(): Promise<void>  {
        const combobox = await this.get();
        await combobox.click();
    }

    async isVisible(): Promise<boolean>  {
        const combobox = await this.get();
        return combobox.isVisible();
    }

    async selectOption(option: string): Promise<void>  {
        const combobox = await this.get();
        await combobox.selectOption({ label: option });
    }

    async clickAndSelectOption(option: string): Promise<void>  {
        const combobox = await this.get();
        await combobox.click();
        await this.page.getByRole('option', { name: option }).click();
    }

}

export class autoCompleteComponent extends comboboxComponent {
readonly page: Page
    readonly locators: { pathForlocator?: string, locatorObject?: Locator }
    readonly locatorObject: Locator

    constructor(page: Page, locators: { pathForlocator?: string, locatorObject?: Locator }) {
        super(page, locators);
        this.page = page;
        this.locators = { pathForlocator: locators.pathForlocator, locatorObject: locators.locatorObject };
        this.locatorObject = this.locators.pathForlocator ? this.page.locator(this.locators.pathForlocator) : this.locators.locatorObject ?? (() => { throw new Error('Either pathForlocator or locatorObject must be provided.'); })();
    }

    async get():Promise<Locator>  {
        return this.locatorObject
    }

    async fillAndPressEnter(option: string): Promise<void>  {
        const combobox = await this.get();
        await combobox.fill(option);
        await combobox.press('Enter');
    }

    async fillAndSelectOption(option: string): Promise<void>  {
        const combobox = await this.get();
        await combobox.fill(option);
        await combobox.selectOption({ label: option });
    }

    async clickAndSelectOption(option: string): Promise<void>  {
        const combobox = await this.get();
        await combobox.click();
        await combobox.fill(option);
        await this.page.getByRole('option', { name: option }).click();
    }

}