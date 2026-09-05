import { Page } from '@playwright/test';

export class LoginPage {

    constructor(private page: Page) {}

    username = 'input[name="username"]';
    password = 'input[name="password"]';
    signInBtn = 'button[type="submit"]';

    async login(username: string, password: string) {
        await this.page.fill(this.username, username);
        await this.page.fill(this.password, password);
        await this.page.click(this.signInBtn);
    }
}