import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../pages/LoginPage';
import { CustomWorld } from '../../support/world';

let login: LoginPage;

Given('User opens application', async function (this: CustomWorld) {
    login = new LoginPage(this.page);
    await login.openApp();
});

When('User enters credentials', async function (this: CustomWorld) {
    await login.login();
});

Then('User should login successfully', async function (this: CustomWorld) {
    console.log('Login successfully');
});

When(
    'User enters {string} and {string}',
    async function (username: string, password: string) {
        await login.loginwithmultipleusers(username, password);
    }
);

When('User enters invalid credentials', async function (this: CustomWorld) {
    await login.loginWithInvalidCredentails();
});

When('clicks  the login button', async function (this: CustomWorld) {
    await login.clickButton();
});

Then('the user should see an error message', async function (this: CustomWorld) {
    console.log('error displayed');
    await login.errorcheck();
});

Then('User should view the error message', async function () {
    console.log('error displayed');
});