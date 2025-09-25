import { type Locator, type Page } from '@playwright/test';


export class ButtonComponent {
    readonly page: Page
    readonly locator: Locator

    constructor(page: Page, private selector: string) {
        this.page = page;
        this.locator = this.page.getByRole('button', { name: this.selector });
    }

    async get() {
        return this.locator
    }

    async click() {
        const button = await this.get();
        await button.click();
    }

    async isVisible() {
        const button = await this.get();
        return button.isVisible();
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

    async get() {
        return this.locator
    }

}