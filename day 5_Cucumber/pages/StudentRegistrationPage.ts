import { Locator, Page } from '@playwright/test';

export class StudentRegistrationPage {
  readonly firstName: Locator;
  readonly email: Locator;
  readonly maleRadio: Locator;
  readonly femaleRadio: Locator;
  readonly otherRadio: Locator;
  readonly mobile: Locator;
  readonly dateOfBirth: Locator;
  readonly subject: Locator;
  readonly sportsHobby: Locator;
  readonly readingHobby: Locator;
  readonly pictureUpload: Locator;
  readonly currentAddress: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly loginButton: Locator;
  

  constructor(private page: Page) {
    this.firstName = this.page.getByPlaceholder('First Name');
    this.email = this.page.getByPlaceholder('name@example.com');
    this.maleRadio = this.page.locator('input[type="radio"]').nth(0);
    this.femaleRadio = this.page.locator('input[type="radio"]').nth(1);
    this.otherRadio = this.page.locator('input[type="radio"]').nth(2);
    this.mobile = this.page.getByPlaceholder('Enter Mobile Number');
    this.dateOfBirth = this.page.locator('#dob');
    this.subject = this.page.locator('#subjects');
    this.sportsHobby = this.page.locator('input[type="checkbox"]').nth(0);
    this.readingHobby = this.page.locator('input[type="checkbox"]').nth(1);
    this.pictureUpload = this.page.locator('input[type="file"]');
    this.currentAddress = this.page.locator('textarea');
    this.state = this.page.locator('#state');
    this.city = this.page.locator('#city');
    this.loginButton = this.page.getByRole('button', { name: /login/i });
    
  }

  async openApp() {
    await this.page.goto(
      'https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php'
    );
  }

  async fillStudentDetails(
    name: string,
    email: string,
    mobile: string,
    subject: string
  ) {
    await this.firstName.fill(name);
    this.page.setDefaultTimeout(1000000);
    await this.email.fill(email);
    this.page.setDefaultTimeout(1000000);
    await this.mobile.fill(mobile);
    this.page.setDefaultTimeout(1000000);
    await this.subject.fill(subject);
    this.page.setDefaultTimeout(1000000);
    await this.sportsHobby.check();
    this.page.setDefaultTimeout(1000000);
    await this.currentAddress.fill('123 Main St');
    this.page.setDefaultTimeout(1000000);
    await this.state.selectOption({ value: 'Rajasthan' });
    this.page.setDefaultTimeout(1000000);
    await this.city.selectOption({ value: 'Agra' });
   
  }
}