import { expect, type Locator, type Page } from '@playwright/test';
import TextBoxComponent from '../components/textBox.components';
import { ButtonComponent, LinkButtonComponent } from '../components/button.components';


export class LoginPage {
    readonly page: Page;
    readonly userName: TextBoxComponent
    readonly passwordTextBox: TextBoxComponent
    readonly loginButton: ButtonComponent
    readonly linkButtonComponent: LinkButtonComponent


    constructor(page: Page) {
        this.page = page;
        this.userName = new TextBoxComponent(this.page, {locatorObject :this.page.locator('input[name="username"]')});
        this.passwordTextBox = new TextBoxComponent(this.page, {locatorObject :this.page.locator('input[name="password"]')});
        this.linkButtonComponent =  new LinkButtonComponent(this.page, {locatorObject :this.page.getByText('Forgot your password?')});
        this.loginButton = new ButtonComponent(this.page, 'Login');
    }

    async navigate() {
        await this.page.goto('/');
    }

    async makeLogin(username: string, password: string) {
        await this.userName.fillTextBox(username);
        await this.passwordTextBox.fillTextBox(password);
        await this.loginButton.click();
    }

}