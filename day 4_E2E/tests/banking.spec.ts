import { test, expect } from '@playwright/test';
import data from '../test-data/bankingData.json';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { TransferPage } from '../pages/TransferPage';
import { TransactionPage } from '../pages/TransactionPage';

test('Complete Banking E2E Flow', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const transferPage = new TransferPage(page);
  const transactionPage = new TransactionPage(page);

  // Navigate to application
  await page.goto('https://www.playwrightpad.in/sandbox/banking');

  // Login
  await loginPage.login(
    data.login.username,
    data.login.password
  );

  // Verify login successful
  await expect(page.locator('#welcome-banner')).toBeVisible();

  // Navigate to Funds Transfer
  await dashboardPage.goToFundTransfer();

  // Add Beneficiary
  await transferPage.addBeneficiary(
    data.beneficiary.name,
    data.beneficiary.accountNumber,
    data.beneficiary.bankName
  );

  // Transfer Funds
  await transferPage.transferFunds(
    data.beneficiary.name,
    data.transfer.amount,
    data.transfer.otp
  );

  // Navigate to Transaction History
  await page.getByText('Accounts Summary').click();
  await dashboardPage.goToTransactionHistory();

  // Validate Transaction
  await transactionPage.validateTransaction();

  // Verify Account Balance
  const balanceCard = page.locator('[data-testid="account-balance"]');

  if (await balanceCard.count() > 0) {
    await expect(balanceCard).toBeVisible();
  }

  // Logout
  await dashboardPage.logout();

  // Verify logout successful
  await expect(
    page.locator('input[name="username"]')
  ).toBeVisible();
});