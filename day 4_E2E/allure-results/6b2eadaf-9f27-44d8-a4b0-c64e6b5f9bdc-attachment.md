# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: banking.spec.ts >> Complete Banking E2E Flow
- Location: tests\banking.spec.ts:9:5

# Error details

```
TypeError: dashboardPage.validateAccountBalance is not a function
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
    - button "Accounts Summary" [active] [ref=e24] [cursor=pointer]
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
  26 |   await expect(
  27 |     page.locator('#welcome-banner')
  28 |   ).toBeVisible();
  29 | 
  30 |   // Navigate to Funds Transfer
  31 |   await dashboardPage.goToFundTransfer();
  32 | 
  33 |   // Add Beneficiary
  34 |   await transferPage.addBeneficiary(
  35 |     data.beneficiary.name,
  36 |     data.beneficiary.accountNumber,
  37 |     data.beneficiary.bankName
  38 |   );
  39 | 
  40 |   // Transfer Funds
  41 |   await transferPage.transferFunds(
  42 |     data.beneficiary.name,
  43 |     data.transfer.amount,
  44 |     data.transfer.otp
  45 |   );
  46 | 
  47 |   // Go back to Dashboard
  48 |   await page.locator('#tab-dashboard').click();
  49 | 
  50 |   // Navigate to Recent Transactions
  51 |   await dashboardPage.goToTransactionHistory();
  52 | 
  53 |   // Validate Transaction
  54 |   await transactionPage.validateTransaction();
  55 | 
  56 |   // Go back to Dashboard
  57 |   await page.locator('#tab-dashboard').click();
  58 | 
  59 |   // Validate Account Balance
> 60 |   await dashboardPage.validateAccountBalance();
     |                       ^ TypeError: dashboardPage.validateAccountBalance is not a function
  61 | 
  62 |   // Logout
  63 |   await dashboardPage.logout();
  64 | 
  65 |   // Verify logout successful
  66 |   await expect(
  67 |     page.locator('input[name="username"]')
  68 |   ).toBeVisible();
  69 | 
  70 | });
```