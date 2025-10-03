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

    get(): Locator { return this.locatorObject; }


    async fillTextBox(text: string): Promise<void>  { await this.locatorObject.fill(text); }

    async clearTextBox(): Promise<void> { await this.locatorObject.fill(''); }

    async clickAndTypeTextBox(text: string): Promise<void> { await this.locatorObject.click(); await this.locatorObject.fill(text); }


}
