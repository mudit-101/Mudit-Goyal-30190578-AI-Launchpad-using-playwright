import { Page, expect } from '@playwright/test';

export class TransactionPage {

  constructor(private page: Page) {}

  async validateTransaction() {

    const transaction =
      this.page.locator('tbody tr').first();

    await expect(transaction)
      .toContainText('Internal Transfer');

    await expect(transaction)
      .toContainText('savings to savings');

    await expect(transaction)
      .toContainText('$1000.00');
  }
}