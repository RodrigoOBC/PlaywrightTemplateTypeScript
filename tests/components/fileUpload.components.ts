import { type Locator, type Page } from '@playwright/test';


export default class UploadFileComponent {
    readonly page: Page
    readonly locators: { pathForlocator?: string, locatorObject?: Locator }
    readonly locatorObject: Locator

    constructor(page: Page, locators: { pathForlocator?: string, locatorObject?: Locator }) {
        this.page = page;
        this.locators = { pathForlocator: locators.pathForlocator, locatorObject: locators.locatorObject };
        this.locatorObject = this.locators.pathForlocator ? this.page.locator(this.locators.pathForlocator) : this.locators.locatorObject ?? (() => { throw new Error('Either pathForlocator or locatorObject must be provided.'); })();
    }

    get(): Locator { return this.locatorObject; }

    async uploadFile(filePath: string): Promise<void> {
        const element: Locator = this.get();
        await element.setInputFiles(filePath);
    }
}