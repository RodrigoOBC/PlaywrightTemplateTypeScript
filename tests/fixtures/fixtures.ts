import { test as base, request, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../page/login.page'

type MyFixtures = {
  authAdmCookies: any[];
  orangeApi: APIRequestContext;
};



export const test = base.extend<MyFixtures>({

  authAdmCookies: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.makeLogin('Admin', 'admin123');
    await loginPage.validateLogin();

    const cookies = await page.context().cookies();
    await use(cookies)
  },

  orangeApi: async ({ page }, use) => {
    const context = page.context();
    const cookies = await context.cookies();
    const sessionCookie = cookies.find(c => c.name === 'orangehrm');
    const cookieHeader = sessionCookie ? `${sessionCookie.name}=${sessionCookie.value}` : '';

    // Cria contexto de requisição autenticado
    const apiContext = await request.newContext({
      baseURL: 'https://opensource-demo.orangehrmlive.com',
      extraHTTPHeaders: {
        'Cookie': cookieHeader,
        'Content-Type': 'application/json'
      }
    });

    await use(apiContext);

    await apiContext.dispose();
  }

})

export const expect = test.expect;