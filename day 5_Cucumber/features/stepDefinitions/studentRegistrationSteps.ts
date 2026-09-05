import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';
import { StudentRegistrationPage } from '../../pages/StudentRegistrationPage';

let registration: StudentRegistrationPage;

Given(
    'User opens registration page',
    async function (this: CustomWorld) {

        registration = new StudentRegistrationPage(this.page);

        await registration.openApp();
    }
);

When(
    'User enters {string}, {string}, {string} and {string}',
    async function (
        name: string,
        email: string,
        mobile: string,
        subject: string
    ) {

        await registration.fillStudentDetails(
            name,
            email,
            mobile,
            subject
        );
    }
);

Then(
    'Form should be filled successfully',
    async function () {

        console.log('Student Registration Completed Successfully');
    }
);