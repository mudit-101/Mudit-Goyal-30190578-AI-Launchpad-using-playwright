import { Page } from '@playwright/test';

export class TransferPage {

  constructor(private page: Page) {}

  async addBeneficiary(
    name: string,
    accountNumber: string,
    bankName: string
  ) {

    await this.page.locator('#add-beneficiary').click();;

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

  async transferFunds(
    beneficiary: string,
    amount: string,
    otp: string
  ) {

        await this.page.locator('#transfer-type').selectOption('Between My Accounts');


    await this.page.locator('#from-acc').selectOption({ index: 1 });

    await this.page.locator('#to-acc').selectOption({ index: 1 });
    await this.page.locator('#transfer-amount').fill('1000');

    await this.page.getByRole('button', {
      name: 'Execute Transfer'
    }).click();;

    const otpField =
      this.page.locator('input[name="otp"]');

    if (await otpField.isVisible().catch(() => false)) {

      await otpField.fill(otp);

      await this.page.getByRole('button', {
        name: /verify/i
      }).click();
      
    }
  }
}