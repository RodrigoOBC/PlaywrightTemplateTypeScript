import { type Locator, type Page } from '@playwright/test';


export default class TextBoxComponent {
    readonly page: Page
    readonly locators: { pathForlocator?: string, locatorObject?: Locator }
    readonly locatorObject: Locator 

    constructor(page: Page, locators: { pathForlocator?: string, locatorObject?: Locator }) {
        this.page = page;
        this.locators = { pathForlocator: locators.pathForlocator, locatorObject: locators.locatorObject };
        this.locatorObject = this.locators.pathForlocator ? this.page.locator(this.locators.pathForlocator) : this.locators.locatorObject ?? (() => { throw new Error('Either pathForlocator or locatorObject must be provided.'); })();
    }

    async get() {
        const textBox = await this.locatorObject
        return textBox
    }


    async fillTextBox(text: string) {
        const element = await this.get();
        await element.fill(text);
    }

    async clearTextBox() {
        const element = await this.get();
        await element.fill('');
    }

    async clickAndTypeTextBox(text: string) {
        const element = await this.get();
        await element.click();
        await element.fill(text);
    }


}