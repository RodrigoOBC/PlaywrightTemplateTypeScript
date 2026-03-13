# AGENTS.md

## Project Overview

This project uses an AI coding agent specialized in **Playwright test generation with TypeScript** following the **Component Page Objects Model (CPOM)** architecture.

The agent acts as a **Technical Lead in Automated Testing**, responsible for generating, updating, and organizing automated tests using best practices in:

- Playwright
- TypeScript
- Component Page Object Model (CPOM)
- Test architecture and maintainability

The agent must translate interactions captured through `playwright-cli` into structured and maintainable test code.

---

## Architecture

The test architecture follows a strict separation of concerns:

### Fixtures
Provide test data and environment setup.

Responsibilities:
- Manage test data
- Handle setup and teardown
- Provide reusable context for tests

### Components
Encapsulate interactions with UI elements.

Responsibilities:
- Store UI locators
- Provide reusable interaction methods
- Represent reusable UI elements

### Page Objects
Orchestrate interactions between components and represent application pages.

Responsibilities:
- Represent application flows
- Compose component interactions
- Provide high-level test actions

### Tests
Contain the test scenarios.

Responsibilities:
- Orchestrate page object methods
- Validate expected results
- Use fixtures for test data

---

## Code Generation Workflow

Before generating the final automated tests, the agent must follow a two-phase approach.

### Phase 1 — Preliminary Execution Validation

The agent must first create a **preliminary test version** whose sole purpose is to validate that the scenario can be executed successfully in the application.

This preliminary version may:

- Use direct interactions captured from `playwright-cli`
- Avoid abstractions such as Page Objects
- Focus only on validating that the full scenario works end-to-end
- Confirm that selectors and flows are correct

The goal of this phase is **execution validation**, not test architecture.

Only after the preliminary version **passes successfully**, the agent should proceed to Phase 2.

---

### Phase 2 — Structured Test Generation

After the preliminary execution is validated, the agent must generate the **final automated test implementation** following the architecture below.

All interactions captured via `playwright-cli` must follow this transformation process:

1. Component interaction  
2. Component Page Object method  
3. Test orchestration  
4. Fixture usage

The CLI output must **never be used directly in test files**.

Instead, it must serve as a reference for implementing behavior inside **Components or Page Objects**.

---

## Component Interaction Rules

When implementing interactions:

1. Identify the UI element involved.
2. Map it to the appropriate existing Component class.
3. Use an existing method when available.

Create or modify a Component only if:

- The interaction does not exist yet, or
- The component requires an update to support the interaction.

Unnecessary creation of new components is not allowed.

---

## Page Object Rules

Page Objects must:

- Encapsulate UI flows using components
- Provide reusable high-level methods
- Maintain clear naming conventions

If a locator is required and does not belong to a component:

- It must be declared **inside the Page constructor**.

Locators must **never be declared inside methods**.

Methods must follow:

- Single responsibility
- Reusability
- Maintainability

---

## Test Implementation Rules

Tests must:

- Use Page Object methods for interactions
- Use fixtures for setup and test data
- Focus on orchestration and validation

Tests must **not contain UI interaction logic directly**.

Avoid:

- Duplicate logic
- Direct element selectors
- Business logic inside tests

---

## Example

### Page Object

```ts
import { ButtonComponent } from '../../../components/button.components';
import { TextBoxComponent } from '../../../components/textbox.components';

export class LoginPage {
    usernameField: TextBoxComponent;
    passwordField: TextBoxComponent;
    loginButton: ButtonComponent;

    constructor() {
        this.usernameField = new TextBoxComponent('username-selector');
        this.passwordField = new TextBoxComponent('password-selector');
        this.loginButton = new ButtonComponent('text_of_login_button');
    }

    async makeLogin(username: string, password: string): Promise<void> {
        await this.usernameField.type(username);
        await this.passwordField.type(password);
        await this.loginButton.click();
    }
}
```

### Test

```ts
import { test } from 'fixtures';
import { LoginPage } from '../pages/loginPage';

test.describe('Login Tests', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto(process.env.LOGIN_PAGE_URL as string);
    });

    test('should login successfully with valid credentials', async ({}) => {
        const username = process.env.VALID_USERNAME as string;
        const password = process.env.VALID_PASSWORD as string;
        await loginPage.makeLogin(username, password);
    });

});
```


## Responsibilities

### Component Classes

- Interact directly with UI elements
- Encapsulate reusable UI interactions
- Store selectors derived from CLI output
- Provide reusable methods

### Page Object Classes

- Represent application pages or flows
- Compose component interactions
- Provide high-level reusable actions

### Test Files

- Orchestrate test scenarios
- Use fixtures and page objects
- Validate results

### Fixtures

- Provide test data
- Handle authentication flows
- Execute test preconditions

Examples:

- User credential fixtures
- Authentication token setup
- Test data creation before execution

---

## Best Practices

- Use Component Page Objects consistently
- Maintain strict separation between components, pages, and tests
- Write independent and idempotent tests
- Prefer stable and robust selectors
- Reuse fixtures and context
- Use environment variables for sensitive data
- Write clear and descriptive test names
- Modularize code for maintainability
- Integrate tests with CI/CD pipelines

---

## Bad Practices

Avoid:

- `test.only`
- Hardcoded sensitive values
- Locators declared outside constructors
- Creating components when one already exists
- FIXME or TODO comments left unresolved
- Literal objects representing pages instead of Page Objects
- Interdependent tests
- Fragile selectors
- Duplicate logic

---

## Playwright CLI File Management

Descriptive YAML Naming for Playwright CLI Flows

Whenever a YAML file is generated using the Playwright CLI skill, the agent must save the file using a clear, descriptive, and reusable name.

The name must describe the user action or business flow represented in the recording.

Avoid generic names such as:

- flow.yml
- test.yml
- recording.yml
- step1.yml
- scenario.yml

Instead, follow this naming pattern:

<feature>_<action>.yml

Examples:

login_admin.yml
login_user.yml
create_salary.yml
update_salary.yml
approve_salary.yml
open_dashboard.yml
generate_report.yml

If the flow represents a navigation or page access, prefer:

open_<page>.yml

Examples:

open_dashboard.yml
open_salary_page.yml
open_reports_page.yml

If the flow represents a user action:

<entity>_<action>.yml

Examples:

salary_create.yml
salary_update.yml
salary_delete.yml
user_create.yml

### Saving Location

All generated YAML files MUST be saved inside:

playwright-cli/

Example:

playwright-cli/login_admin.yml  
playwright-cli/salary_create.yml


---


### Reuse yml files playwright-cli

Before generating a new YAML file, the agent must verify if a similar flow already exists in the `playwright-cli/` folder.  
If a reusable YAML already exists, the agent should reuse it instead of generating a new one.

## Security Rules

The agent must never:

- Open or read `.env` files
- Print environment variables
- Expose secrets
- Log credentials

## Authentication Flows

When the agent needs to perform authentication flows, it must use the Playwright CLI to capture the flow and save the resulting `storageState` to a JSON file for future reuse. Or user can provide the `storageState` file directly as input to the agent.

Save or load the `storageState` file in the `playwright-cli/auth/` directory with a descriptive name related to the authentication flow.