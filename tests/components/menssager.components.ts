import { type Locator, type Page } from '@playwright/test';

export class MenssagerComponent {
    readonly page: Page
    readonly color: string
    readonly textMessage: string
    readonly titleMessage: string
    readonly locator: Locator

    constructor(page: Page, color: string, titleMessage: string, textMessage: string) {
        this.page = page;
        this.color = color;
        this.textMessage = textMessage;
        this.titleMessage = titleMessage;
        this.locator = this.page.locator('[aria-live="assertive"]')
    }

    get(): Locator { return this.locator; }

    async click(): Promise<void> {
         const element: Locator = this.get();
         await element.click()
         }

    async isVisible(): Promise<boolean> { 
        const element: Locator = this.get();
        return element.isVisible(); 
    }

    async getCollor(): Promise<string> { 
        const menssagerBox: Locator = this.get();
        let color = await menssagerBox.evaluate((element) =>
            window.getComputedStyle(element).getPropertyValue('background'),
        );

        const colorTransformed:string = await this.tranformColor(color);
        return colorTransformed;

     }   

     async tranformColor(color: string): Promise<string> { 
        const match = color.match(/rgb\(\d+,\s*\d+,\s*\d+\)/i);
        if (match) {
            color = match[0];
        }
        return color;
     }

     async getTextMessage(): Promise<string> { 
        const menssagerBox: Locator = this.get();
        let message = await menssagerBox.textContent() || '';
        return message;
     }
}