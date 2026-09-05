# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: banking.spec.ts >> Complete Banking E2E Flow
- Location: tests\banking.spec.ts:9:5

# Error details

```
Error: locator.click: Error: strict mode violation: getByText('Accounts Summary') resolved to 2 elements:
    1) <button id="tab-dashboard">Accounts Summary</button> aka getByRole('button', { name: 'Accounts Summary' })
    2) <h2>Accounts Summary</h2> aka getByRole('heading', { name: 'Accounts Summary' })

Call log:
  - waiting for getByText('Accounts Summary')

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - banner [ref=e5]:
    - generic [ref=e6]: APEX BANK
    - generic [ref=e10]:
      - generic [ref=e11]: Secure NetBanking
      - button "Reset Database" [ref=e15] [cursor=pointer]
      - img "Profile" [ref=e21]
      - button "Sign Out" [ref=e22] [cursor=pointer]
  - navigation [ref=e23]:
    - button "Accounts Summary" [ref=e24] [cursor=pointer]
    - button "Funds Transfer" [ref=e25] [cursor=pointer]
    - button "Cards Controls" [ref=e26] [cursor=pointer]
    - button "Loans Center" [ref=e27] [cursor=pointer]
    - button "Customer Support" [ref=e28] [cursor=pointer]
    - button "Preferences" [ref=e29] [cursor=pointer]
  - generic [ref=e30]:
    - generic [ref=e31]:
      - img "Profile" [ref=e32]
      - generic [ref=e33]:
        - heading "Welcome back, Apex User" [level=1] [ref=e34]
        - paragraph [ref=e35]: "Apex Trust Retail Banking Portal. Last active: Today"
    - generic [ref=e36]:
      - generic [ref=e37]:
        - generic [ref=e38]:
          - heading "Accounts Summary" [level=2] [ref=e39]
          - button "Hide Balances" [ref=e40] [cursor=pointer]
        - generic [ref=e44]:
          - generic [ref=e45]:
            - generic [ref=e47]: Checking Account
            - generic [ref=e51]: $5,250.00
            - generic [ref=e52]: Account ending in -9281
          - generic [ref=e53]:
            - generic [ref=e55]: Savings Account
            - generic [ref=e60]: $17,400.00
            - generic [ref=e61]: Account ending in -1039
          - generic [ref=e62]:
            - generic [ref=e64]: Total Net Worth
            - generic [ref=e68]: $22,650.00
            - generic [ref=e69]: Liquid Assets Combined
      - generic [ref=e70]:
        - heading "Recent Transactions" [level=2] [ref=e71]
        - table [ref=e73]:
          - rowgroup [ref=e74]:
            - row [ref=e75]:
              - columnheader "Date" [ref=e76]
              - columnheader "Description" [ref=e77]
              - columnheader "Category" [ref=e78]
              - columnheader "Amount" [ref=e79]
          - rowgroup [ref=e80]:
            - row [ref=e81]:
              - cell "2026-09-03" [ref=e82]
              - cell "Internal Transfer savings to savings" [ref=e83]
              - cell "Transfer" [ref=e84]
              - cell "-$1000.00" [ref=e86]
            - row [ref=e87]:
              - cell "2026-06-04" [ref=e88]
              - cell "Grocery Store checkout" [ref=e89]
              - cell "Shopping" [ref=e90]
              - cell "-$120.50" [ref=e92]
            - row [ref=e93]:
              - cell "2026-06-03" [ref=e94]
              - cell "Salary credit Apex Corp" [ref=e95]
              - cell "Income" [ref=e96]
              - cell "+$3500.00" [ref=e98]
            - row [ref=e99]:
              - cell "2026-06-01" [ref=e100]
              - cell "Coffee shop subscription" [ref=e101]
              - cell "Dining" [ref=e102]
              - cell "-$15.75" [ref=e104]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import data from '../test-data/bankingData.json';
  3  | 
  4  | import { LoginPage } from '../pages/LoginPage';
  5  | import { DashboardPage } from '../pages/DashboardPage';
  6  | import { TransferPage } from '../pages/TransferPage';
  7  | import { TransactionPage } from '../pages/TransactionPage';
  8  | 
  9  | test('Complete Banking E2E Flow', async ({ page }) => {
  10 | 
  11 |   const loginPage = new LoginPage(page);
  12 |   const dashboardPage = new DashboardPage(page);
  13 |   const transferPage = new TransferPage(page);
  14 |   const transactionPage = new TransactionPage(page);
  15 | 
  16 |   // Navigate to application
  17 |   await page.goto('https://www.playwrightpad.in/sandbox/banking');
  18 | 
  19 |   // Login
  20 |   await loginPage.login(
  21 |     data.login.username,
  22 |     data.login.password
  23 |   );
  24 | 
  25 |   // Verify login successful
  26 |   await expect(page.locator('#welcome-banner')).toBeVisible();
  27 | 
  28 |   // Navigate to Funds Transfer
  29 |   await dashboardPage.goToFundTransfer();
  30 | 
  31 |   // Add Beneficiary
  32 |   await transferPage.addBeneficiary(
  33 |     data.beneficiary.name,
  34 |     data.beneficiary.accountNumber,
  35 |     data.beneficiary.bankName
  36 |   );
  37 | 
  38 |   // Transfer Funds
  39 |   await transferPage.transferFunds(
  40 |     data.beneficiary.name,
  41 |     data.transfer.amount,
  42 |     data.transfer.otp
  43 |   );
  44 | 
  45 |   // Navigate to Transaction History
  46 |   await page.getByText('Accounts Summary').click();
  47 |   await dashboardPage.goToTransactionHistory();
  48 | 
  49 |   // Validate Transaction
  50 |   await transactionPage.validateTransaction();
  51 | 
  52 |   // Verify Account Balance
> 53 |     await page.getByText('Accounts Summary').click();
     |                                              ^ Error: locator.click: Error: strict mode violation: getByText('Accounts Summary') resolved to 2 elements:
  54 | 
  55 |   await dashboardPage.validateAccountBalance();
  56 | 
  57 |   // Logout
  58 |   await dashboardPage.logout();
  59 | 
  60 |   // Verify logout successful
  61 |   await expect(
  62 |     page.locator('input[name="username"]')
  63 |   ).toBeVisible();
  64 | });
```