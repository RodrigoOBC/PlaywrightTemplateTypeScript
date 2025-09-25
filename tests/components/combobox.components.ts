import { type Locator, type Page } from '@playwright/test';

export class comboboxComponent {
    readonly page: Page
    readonly locator: Locator

    constructor(page: Page, private selector: string) {
        this.page = page;
        this.locator = this.page.getByRole('combobox', { name: this.selector });
    }

    async get() {
        return this.locator
    }

    async click() {
        const combobox = await this.get();
        await combobox.click();
    }

    async isVisible() {
        const combobox = await this.get();
        return combobox.isVisible();
    }

    async selectOption(option: string) {
        const combobox = await this.get();
        await combobox.selectOption({ label: option });
    }

}

export class autoCompleteComponent extends comboboxComponent {
    readonly page: Page
    readonly locator: Locator

    constructor(page: Page, selector: string) {
        super(page, selector);
        this.page = page;
        this.locator = this.page.getByRole('combobox', { name: selector });
    }

    async get() {
        return this.locator
    }

    async fillAndPressEnter(option: string) {
        const combobox = await this.get();
        await combobox.fill(option);
        await combobox.press('Enter');
    }

    async fillAndSelectOption(option: string) {
        const combobox = await this.get();
        await combobox.fill(option);
        await combobox.selectOption({ label: option });
    }

}