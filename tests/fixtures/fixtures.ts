import { test as base, request, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../page/login.page'

interface EmployeeSummary { 
  firstName: string; 
  middleName?: string; 
  lastName: string; 
}

interface Employee {
  empNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeId: string;
}

interface ApiResponse {
  data: Employee[];
}

interface Cookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

type MyFixtures = {
  authAdmCookies: Cookie[];
  orangeApi: APIRequestContext;
  cleanupAndPrepareTestData: { CT02dataTest: EmployeeSummary[] };
  cleanupUsersById: (employeeIds: string) => Promise<void>;
  createCT02TestData: () => Promise<EmployeeSummary[]>;
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
  },

  cleanupAndPrepareTestData: async ({ page, authAdmCookies, orangeApi }, use) => {
    const CT01dataTest = [
      { firstName: 'Teste', middleName: 'Cabral', lastName: 'Silva', employeeID: '0891', loginDetails: true, userName: 'TesteCabral', status: 'Enabled', password: 'Teste@1234', confirmPassword: 'Teste@1234' },
      { firstName: 'Maria', middleName: 'Oliveira', lastName: 'Souza', employeeID: '0892', loginDetails: true, userName: 'MariaOliveira', status: 'Disabled', password: 'Maria@1234', confirmPassword: 'Maria@1234' },
      { firstName: 'João', middleName: 'Pereira', lastName: 'Costa', employeeID: '0893', loginDetails: false, userName: '', status: '', password: '', confirmPassword: '' }
    ];

    const CT02dataTest: EmployeeSummary[] = [];

    await page.context().addCookies(authAdmCookies);

    // Cleanup existing test users
    for(const users of CT01dataTest){
      const response = await orangeApi.get(`/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&employeeId=${users.employeeID}&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC`);
      const existingUsers:ApiResponse =  await response.json() as ApiResponse;
      if (existingUsers.data.length > 0) {
        console.log(existingUsers.data);
        console.log(`Deleting existing test user with employeeID: ${users.employeeID}`);
        const deleteResponse = await orangeApi.delete(`/web/index.php/api/v2/pim/employees`, { data: { ids: [existingUsers.data[0].empNumber] }});
        console.log(`Deleted user response status: ${deleteResponse.status()}`);
      }
    }
    
    // Prepare test data with random user
    const responseAllUsers = await orangeApi.get('/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC');
    const allUsers:ApiResponse = await responseAllUsers.json()  as ApiResponse;;
    if (Array.isArray(allUsers.data) && allUsers.data.length > 0) {
      const randomUser = allUsers.data[Math.floor(Math.random() * allUsers.data.length)];
      CT02dataTest.push({ firstName: randomUser.firstName, middleName: randomUser.middleName, lastName: randomUser.lastName });
    }

    await use({ CT02dataTest });
  },

  cleanupUsersById: async ({ page, authAdmCookies, orangeApi }, use) => {
    await page.context().addCookies(authAdmCookies);
    
    const cleanupFunction = async (employeeId: string) => {
        const response = await orangeApi.get(`/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&employeeId=${employeeId}&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC`);
        const existingUsers:ApiResponse = await response.json()  as ApiResponse;
        
        if (existingUsers.data.length > 0) {
          console.log(`Deleting existing test user with employeeID: ${employeeId}`);
          const deleteResponse = await orangeApi.delete(`/web/index.php/api/v2/pim/employees`, { 
            data: { ids: [existingUsers.data[0].empNumber] }
          });
          console.log(`Deleted user response status: ${deleteResponse.status()}`);
        } else {
          console.log(`No user found with employeeID: ${employeeId}`);
        }
      
    };

    await use(cleanupFunction);
  },

  createCT02TestData: async ({ page, authAdmCookies, orangeApi }, use) => {
    await page.context().addCookies(authAdmCookies);
    
    const createTestDataFunction = async (): Promise<EmployeeSummary[]> => {
      const CT02dataTest: EmployeeSummary[] = [];
      
      const responseAllUsers = await orangeApi.get('/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC');
      const allUsers:ApiResponse = await responseAllUsers.json()  as ApiResponse;
      
      if (Array.isArray(allUsers.data) && allUsers.data.length > 0) {
        const randomUser = allUsers.data[Math.floor(Math.random() * allUsers.data.length)];
        CT02dataTest.push({ 
          firstName: randomUser.firstName, 
          middleName: randomUser.middleName, 
          lastName: randomUser.lastName 
        });
        console.log(`Created CT02 test data with user: ${randomUser.firstName} ${randomUser.lastName}`);
      }
      
      return CT02dataTest;
    };

    await use(createTestDataFunction);
  }

})

export const expect = test.expect;