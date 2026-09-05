import { Page } from '@playwright/test';

export class BeneficiaryPage {

    constructor(private page: Page) {}

    async addBeneficiary(
        name: string,
        accountNumber: string,
        bankName: string
    ) {

        await this.page.locator('#add-beneficiary').click();

        await this.page.fill(
            '#bene-name',
            name
        );

        await this.page.fill(
            '#bene-account',
            accountNumber
        );

        await this.page.locator('#bene-bank').selectOption('Chase Bank');

        await this.page.getByRole('button', {
            name: /save/i
        }).click();
    }
}