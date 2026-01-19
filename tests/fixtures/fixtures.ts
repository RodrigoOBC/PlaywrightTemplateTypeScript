import { test as base, request, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../page/login.page'
import { Page } from '@playwright/test';

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

interface JobTitle {
  jobTitle: string;
  jobDescription: string;
  note: string;
  pathSpecFile?: string;
}

interface JobTitleTestData {
  CT05DataJobTitle: JobTitle[];
}

interface AdminPrecondition {
  firstName: string;
  middleName: string;
  lastName: string;
  empNumber: string;
  employeeId: string;
  loginDetails: boolean;
  userName: string;
  status: string;
  password: string;
  confirmPassword: string;
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
  orangeApi: APIRequestContext;
  cleanupAndPrepareTestData: { CT02dataTest: EmployeeSummary[] };
  adminTestData: {
    CT01DataADMIN: { userRole: string; employeeName: string; status: string; username: string; password: string }[];
    CT02DataADMIN: { userRole: string; employeeName: string; status: string; username: string; password: string }[];
  }
  preconditionADMIN: {
    CT01DataADMIN: { data: AdminPrecondition[]}
    CT02DataADMIN: { data: AdminPrecondition[]}
  }
  authenticatedPage: Page;
  cleanupUsersById: (employeeIds: string) => Promise<void>;
  getUsersByTest: () => Promise<EmployeeSummary[]>;
  createUserByTest: (CTdateForTest: ApiResponse) => Promise<void>;
  jobTitleTestData: JobTitleTestData;
};



export const test = base.extend<MyFixtures>({

  adminTestData: {
    CT01DataADMIN: [
      { userRole: 'Admin', employeeName: 'Teste Cabral Silva', status: 'Enabled', username: 'AdminTest1', password: 'Admin@123' },
      { userRole: 'ESS', employeeName: 'Maria Oliveira Souza', status: 'Disabled', username: 'ESSLinda1', password: 'ESS@1234' }
    ],
    CT02DataADMIN: [
      { userRole: 'Admin', employeeName: 'Teste Cabral Silva', status: 'Enabled', username: 'AdminTest1', password: 'Admin@123' },
      { userRole: 'ESS', employeeName: 'Maria Oliveira Souza', status: 'Disabled', username: 'ESSLinda1', password: 'ESS@1234' }
    ]
  },

  preconditionADMIN: {
    CT01DataADMIN:{ data :[
      { firstName: 'Teste', middleName: 'Cabral', lastName: 'Silva', empNumber: '891', employeeId: '0891', loginDetails: true, userName: 'TesteCabral', status: 'Enabled', password: 'Teste@1234', confirmPassword: 'Teste@1234' },
      { firstName: 'Maria', middleName: 'Oliveira', lastName: 'Souza', empNumber: '892', employeeId: '0892', loginDetails: true, userName: 'MariaOliveira', status: 'Disabled', password: 'Maria@1234', confirmPassword: 'Maria@1234' }
    ]},
    CT02DataADMIN:{ data: [
    { firstName: 'Teste', middleName: 'Cabral', lastName: 'Silva', empNumber: '891', employeeId: '0891', loginDetails: true, userName: 'TesteCabral', status: 'Enabled', password: 'Teste@1234', confirmPassword: 'Teste@1234' },
    { firstName: 'Maria', middleName: 'Oliveira', lastName: 'Souza', empNumber: '892', employeeId: '0892', loginDetails: true, userName: 'MariaOliveira', status: 'Disabled', password: 'Maria@1234', confirmPassword: 'Maria@1234' }
  ]}
  },

  jobTitleTestData: {
    CT05DataJobTitle: [
      { jobTitle: 'Senior Developer', jobDescription: 'Responsible for developing high-quality software solutions.', note: 'Requires 5+ years of experience.' },
      { jobTitle: 'Project Manager', jobDescription: 'Oversees project planning and execution.', note: 'PMP certification preferred.' }
    ]
  },

  orangeApi: async ({authenticatedPage: page }, use) => {
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

  cleanupUsersById: async ({ orangeApi }, use) => {

    const cleanupFunction = async (employeeId: string) => {
      const response = await orangeApi.get(`/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&employeeId=${employeeId}&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC`);
      const existingUsers: ApiResponse = await response.json() as ApiResponse;

      if (existingUsers.data.length > 0) {
        await orangeApi.delete(`/web/index.php/api/v2/pim/employees`, {
          data: { ids: [existingUsers.data[0].empNumber] }
        });
      } else {
        console.log(`No user found with employeeID: ${employeeId}`);
      }

    };

    await use(cleanupFunction);
  },

  getUsersByTest: async ({ orangeApi }, use) => {

    const createTestDataFunction = async (): Promise<EmployeeSummary[]> => {
      const CT02dataTest: EmployeeSummary[] = [];

      const responseAllUsers = await orangeApi.get('/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC');
      const allUsers: ApiResponse = await responseAllUsers.json() as ApiResponse;

      if (Array.isArray(allUsers.data) && allUsers.data.length > 0) {
        const randomUser = allUsers.data[Math.floor(Math.random() * allUsers.data.length)];
        CT02dataTest.push({
          firstName: randomUser.firstName,
          middleName: randomUser.middleName,
          lastName: randomUser.lastName
        });
      }

      return CT02dataTest;
    };

    await use(createTestDataFunction);
  },

  createUserByTest: async ({ orangeApi }, use) => {
    const createUserFunction = async (CTdateForTest: ApiResponse): Promise<void> => {
      for (const userData of CTdateForTest.data) {
        const employeeName: string = `${userData.firstName} ${userData.middleName ?? ''} ${userData.lastName}`.trim();
        const reponseUsers = await orangeApi.get(`web/index.php/api/v2/pim/employees?nameOrId=${employeeName}&includeEmployees=onlyCurrent`)
        const usersJson: ApiResponse = await reponseUsers.json() as ApiResponse;
        if (usersJson.data.length === 0) {

          await orangeApi.post('/web/index.php/api/v2/pim/employees', {
            data: {
              firstName: userData.firstName,
              middleName: userData.middleName,
              lastName: userData.lastName,
              employeeId: userData.employeeId
            }
          });

        }

      }
    }
    await use(createUserFunction)
  },

  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.makeLogin('Admin', 'admin123');
    await loginPage.validateLogin();
    await use(page);
    await context.close();
  },

})

export const expect = test.expect;