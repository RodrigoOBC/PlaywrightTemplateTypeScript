import { AdminUserPage } from '../page/ADM/ADIM.page';
import { test, expect } from '../fixtures/fixtures';



test.afterEach(async ({ page }) => {
  await page.context().close();
});


test.describe('Admin User Management Tests', () => {

  test(`CT01 - Create Admin Users`, async ({ authenticatedPage: page, createUserByTest: createCT01TestData, adminTestData, preconditionADMIN }) => {
    const adminUserPage = new AdminUserPage(page);
    const preConditionData = preconditionADMIN.CT01DataADMIN;

    for (const userData of adminTestData.CT01DataADMIN) {
      await createCT01TestData(preConditionData);
      await adminUserPage.navigate();
      await adminUserPage.navigateAddAdminPage();
      await adminUserPage.addAdminPage.fillAddAdminForm(
        userData.userRole,
        userData.employeeName,
        userData.status,
        userData.username,
        userData.password
      );
      await adminUserPage.addAdminPage.saveButton.click();
    }
  })

  test(`CT02 - Validate Search Admin Users in Admin List`, async ({ authenticatedPage: page, createUserByTest: createCT02TestData, adminTestData, preconditionADMIN }) => {
    const adminUserPage = new AdminUserPage(page);
    const preConditionData = preconditionADMIN.CT02DataADMIN;
    await createCT02TestData(preConditionData);
    for (const userData of adminTestData.CT02DataADMIN) {
      await adminUserPage.navigate();
      await adminUserPage.adminListPage.searchUsersByFilter(userData.username, userData.userRole, userData.employeeName, userData.status);
      await adminUserPage.adminListPage.validateEmployeeInTable(
        userData.username,
        userData.userRole,
        userData.employeeName,
        userData.status
      );
    }


  })
})

test.describe("Admin job management tests", () => {

  test(`CT03 - Navigate to Job Titles List Page`, async ({ authenticatedPage: page }) => {
    const adminUserPage = new AdminUserPage(page);
    await adminUserPage.navigate();
    await adminUserPage.navigateListJobsPage();
  });

  test(`CT04 - Navigate to Add Job Title Page`, async ({ authenticatedPage: page }) => {
    const adminUserPage = new AdminUserPage(page);
    await adminUserPage.navigate();
    await adminUserPage.navigateAddJobTitlePage();
  });

  test(`CT05 - Add Job Title`, async ({ authenticatedPage: page, jobTitleTestData, cleanupJobsById }) => {
    const adminUserPage = new AdminUserPage(page);
    const preConditionData = jobTitleTestData.CT05DataJobTitle;

    for (const jobData of preConditionData) {
      await cleanupJobsById(jobData.jobTitle);
      await adminUserPage.navigate();
      await adminUserPage.navigateAddJobTitlePage();
      await adminUserPage.addJobTitlePage.fillAddJobTitleForm(
        jobData.jobTitle,
        jobData.jobDescription,
        jobData.note
      );
      await adminUserPage.addJobTitlePage.saveButton.click();
      await adminUserPage.addJobTitlePage.validateSuccessMessage();
      await adminUserPage.jobTitlesListPage.validateJobTitleInList(jobData.jobTitle);
    }

  });

  test(`CT06 - Add Job Title without Job Specification`, async ({ authenticatedPage: page, jobTitleTestData }) => {
    const adminUserPage = new AdminUserPage(page);
    await adminUserPage.navigate();
    await adminUserPage.navigateAddJobTitlePage();
    for (const jobData of jobTitleTestData.CT06DataJobTitle) {
      await adminUserPage.addJobTitlePage.fillAddJobTitleForm(
        jobData.jobTitle,
        jobData.jobDescription,
        jobData.note
      );
      await adminUserPage.addJobTitlePage.saveButton.click();
      await adminUserPage.addJobTitlePage.validateSuccessMessage();
    }
  });

  test(`CT07 - Delete Job Title`, async ({ authenticatedPage: page, jobTitleTestData, cleanupJobsById }) => {
    const adminUserPage = new AdminUserPage(page);
    
    // Prerequisite: Create a job title to delete
    const jobDataToDelete = jobTitleTestData.CT05DataJobTitle[0];
    await cleanupJobsById(jobDataToDelete.jobTitle);
    await adminUserPage.navigate();
    await adminUserPage.navigateAddJobTitlePage();
    await adminUserPage.addJobTitlePage.fillAddJobTitleForm(
      jobDataToDelete.jobTitle,
      jobDataToDelete.jobDescription,
      jobDataToDelete.note
    );
    await adminUserPage.addJobTitlePage.saveButton.click();
    await adminUserPage.addJobTitlePage.validateSuccessMessage();

    // Navigate to Job Titles List
    await adminUserPage.navigateListJobsPage();
    await adminUserPage.jobTitlesListPage.validateJobTitleInList(jobDataToDelete.jobTitle);

    // Screenshot before deletion
    await page.screenshot({ path: `screenshots/ct07-before-deletion-${Date.now()}.png`, fullPage: true });

    // Perform deletion
    await adminUserPage.jobTitlesListPage.deleteJobTitleByName(jobDataToDelete.jobTitle);

    // Screenshot after deletion
    await page.screenshot({ path: `screenshots/ct07-after-deletion-${Date.now()}.png`, fullPage: true });

    // Validate the job title is no longer in the list
    await adminUserPage.jobTitlesListPage.validateJobTitleNotInList(jobDataToDelete.jobTitle);
  });

  test(`CT08 - Delete Random Job Title`, async ({ authenticatedPage: page }) => {
    const adminUserPage = new AdminUserPage(page);
    
    // Navigate to Job Titles List
    await adminUserPage.navigate();
    await adminUserPage.navigateListJobsPage();

    // Screenshot before deletion
    await page.screenshot({ path: `screenshots/ct08-before-deletion-${Date.now()}.png`, fullPage: true });

    // Delete a random job title and capture the name
    const deletedJobTitle = await adminUserPage.jobTitlesListPage.deleteRandomJobTitle();

    // Screenshot after deletion
    await page.screenshot({ path: `screenshots/ct08-after-deletion-${Date.now()}.png`, fullPage: true });

    // Validate the job title is no longer in the list
    await adminUserPage.jobTitlesListPage.validateJobTitleNotInList(deletedJobTitle);
  });

  test(`CT09 - Edit Job Title`, async ({ authenticatedPage: page, jobTitleTestData, cleanupJobsById }) => {
    const adminUserPage = new AdminUserPage(page);
    
    // Prerequisite: Create a job title to edit
    const jobDataToEdit = jobTitleTestData.CT05DataJobTitle[0];
    await cleanupJobsById(jobDataToEdit.jobTitle);
    await adminUserPage.navigate();
    await adminUserPage.navigateAddJobTitlePage();
    await adminUserPage.addJobTitlePage.fillAddJobTitleForm(
      jobDataToEdit.jobTitle,
      jobDataToEdit.jobDescription,
      jobDataToEdit.note
    );
    await adminUserPage.addJobTitlePage.saveButton.click();
    await adminUserPage.addJobTitlePage.validateSuccessMessage();

    // Navigate to Job Titles List
    await adminUserPage.navigateListJobsPage();
    await adminUserPage.jobTitlesListPage.validateJobTitleInList(jobDataToEdit.jobTitle);

    // Click edit button for the job title
    await adminUserPage.jobTitlesListPage.editJobTitleByName(jobDataToEdit.jobTitle);

    // Validate Edit Job Title Page is open
    await adminUserPage.editJobTitlePage.validateEditJobTitlePageIsOpen();

    // Get current job title value
    const currentJobTitle = await adminUserPage.editJobTitlePage.getJobTitleValue();
    expect(currentJobTitle).toBe(jobDataToEdit.jobTitle);

    // Edit the job title
    const newJobTitle = `${jobDataToEdit.jobTitle} - Updated`;
    await adminUserPage.editJobTitlePage.fillEditJobTitleForm(newJobTitle);
    await adminUserPage.editJobTitlePage.saveChanges();

    // Validate success message
    await adminUserPage.editJobTitlePage.validateSuccessMessage();

    // Validate the updated job title is in the list
    await adminUserPage.jobTitlesListPage.validateJobTitleInList(newJobTitle);

    // Cleanup: Delete the updated job title
    await cleanupJobsById(newJobTitle);
  });

  test(`CT10 - Edit Random Job Title and Verify Changes`, async ({ authenticatedPage: page }) => {
    const adminUserPage = new AdminUserPage(page);
    
    // Navigate to Job Titles List
    await adminUserPage.navigate();
    await adminUserPage.navigateListJobsPage();

    // Screenshot before editing
    await page.screenshot({ path: `screenshots/ct10-before-edit-${Date.now()}.png`, fullPage: true });

    // Edit a random job title and capture the original name
    const originalJobTitle = await adminUserPage.jobTitlesListPage.editRandomJobTitle();

    // Validate Edit Job Title Page is open
    await adminUserPage.editJobTitlePage.validateEditJobTitlePageIsOpen();

    // Get current job title value
    const currentJobTitle = await adminUserPage.editJobTitlePage.getJobTitleValue();
    expect(currentJobTitle).toBe(originalJobTitle);

    // Edit the job title with a timestamp to ensure uniqueness
    const updatedJobTitle = `${originalJobTitle} - Edited ${Date.now()}`;
    await adminUserPage.editJobTitlePage.fillEditJobTitleForm(updatedJobTitle);
    await adminUserPage.editJobTitlePage.saveChanges();

    // Validate success message
    await adminUserPage.editJobTitlePage.validateSuccessMessage();

    // Screenshot after editing
    await page.screenshot({ path: `screenshots/ct10-after-edit-${Date.now()}.png`, fullPage: true });

    // Validate the updated job title is in the list
    await adminUserPage.jobTitlesListPage.validateJobTitleInList(updatedJobTitle);

    // Validate the original job title is no longer in the list
    await adminUserPage.jobTitlesListPage.validateJobTitleNotInList(originalJobTitle);
  });
})