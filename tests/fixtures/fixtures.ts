import { test as base } from '@playwright/test';
import { LoginPage } from '../page/login.page'

type MyFixtures = {
  authAdmCookies: any[];
};



export const test = base.extend<MyFixtures>({

    authAdmCookies: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.makeLogin('Admin', 'admin123');
        await loginPage.validateLogin();
        
        const cookies = await page.context().cookies();
        await use(cookies)
    }

})

export const expect = test.expect;