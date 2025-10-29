import { type Page } from '@playwright/test';
import { ListButtonComponent } from './button.components';

export class HeaderMenuComponent {
    readonly page: Page
    readonly elementsNames: string[]
    readonly headerMenuButtons: { [key: string]: ListButtonComponent }
    
    constructor(page: Page, elementsNames: string[]) {
        this.page = page;
        this.elementsNames = elementsNames;
        this.headerMenuButtons = this.initializeMenuButtons();
    }

    initializeMenuButtons(): { [key: string]: ListButtonComponent } {
        const headersMenuButtons: { [key: string]: ListButtonComponent } = {};
        for (const name of this.elementsNames) {
            headersMenuButtons[name] = new ListButtonComponent(this.page, name);
        }
        return headersMenuButtons;
    }

}