import { Page, expect } from '@playwright/test';

export class DashboardPage {

  constructor(private page: Page) {}

  async goToFundTransfer() {
    await this.page.getByText('Funds Transfer').click();
  }

  async goToTransactionHistory() {
    await this.page.getByText('Recent Transactions').click();
  }

  async validateLatestTransaction(
    description: string,
    category: string,
    amount: string
  ) {

    const latestTransaction = this.page.locator('tbody tr').first();

    await expect(latestTransaction)
      .toContainText(description);

    await expect(latestTransaction)
      .toContainText(category);

    await expect(latestTransaction)
      .toContainText(amount);
  }

  async logout() {
    await this.page.getByRole('button', { name: 'Sign Out' }).click();
}
}