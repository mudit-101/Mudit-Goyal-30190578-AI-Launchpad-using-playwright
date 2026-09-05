# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: banking.spec.ts >> Complete Banking E2E Flow
- Location: tests\banking.spec.ts:9:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#checking-balance')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#checking-balance')

```

```yaml
- banner:
  - text: APEX BANK Secure NetBanking
  - button "Reset Database"
  - img "Profile"
  - button "Sign Out"
- navigation:
  - button "Accounts Summary"
  - button "Funds Transfer"
  - button "Cards Controls"
  - button "Loans Center"
  - button "Customer Support"
  - button "Preferences"
- img "Profile"
- heading "Welcome back, Apex User" [level=1]
- paragraph: "Apex Trust Retail Banking Portal. Last active: Today"
- heading "Accounts Summary" [level=2]
- button "Hide Balances"
- text: Checking Account $5,250.00 Account ending in -9281 Savings Account $17,400.00 Account ending in -1039 Total Net Worth $22,650.00 Liquid Assets Combined
- heading "Recent Transactions" [level=2]
- table:
  - rowgroup:
    - row "Date Description Category Amount":
      - columnheader "Date"
      - columnheader "Description"
      - columnheader "Category"
      - columnheader "Amount"
  - rowgroup:
    - row "2026-09-03 Internal Transfer savings to savings Transfer -$1000.00":
      - cell "2026-09-03"
      - cell "Internal Transfer savings to savings"
      - cell "Transfer"
      - cell "-$1000.00"
    - row "2026-06-04 Grocery Store checkout Shopping -$120.50":
      - cell "2026-06-04"
      - cell "Grocery Store checkout"
      - cell "Shopping"
      - cell "-$120.50"
    - row "2026-06-03 Salary credit Apex Corp Income +$3500.00":
      - cell "2026-06-03"
      - cell "Salary credit Apex Corp"
      - cell "Income"
      - cell "+$3500.00"
    - row "2026-06-01 Coffee shop subscription Dining -$15.75":
      - cell "2026-06-01"
      - cell "Coffee shop subscription"
      - cell "Dining"
      - cell "-$15.75"
```

# Test source

```ts
  1  | import { Page, expect } from '@playwright/test';
  2  | 
  3  | export class DashboardPage {
  4  | 
  5  |   constructor(private page: Page) {}
  6  | 
  7  |   async goToFundTransfer() {
  8  |     await this.page.getByText('Funds Transfer').click();
  9  |   }
  10 | 
  11 |   async goToTransactionHistory() {
  12 |     await this.page.getByText('Recent Transactions').click();
  13 |   }
  14 | 
  15 |   async validateLatestTransaction(
  16 |     description: string,
  17 |     category: string,
  18 |     amount: string
  19 |   ) {
  20 | 
  21 |     const latestTransaction = this.page.locator('tbody tr').first();
  22 | 
  23 |     await expect(latestTransaction)
  24 |       .toContainText(description);
  25 | 
  26 |     await expect(latestTransaction)
  27 |       .toContainText(category);
  28 | 
  29 |     await expect(latestTransaction)
  30 |       .toContainText(amount);
  31 |   }
  32 | 
  33 |   async validateAccountBalance() {
  34 | 
  35 |     const checkingBalance =
  36 |       this.page.locator('#checking-balance');
  37 | 
  38 |     const savingsBalance =
  39 |       this.page.locator('#savings-balance');
  40 | 
> 41 |     await expect(checkingBalance).toBeVisible();
     |                                   ^ Error: expect(locator).toBeVisible() failed
  42 |     await expect(savingsBalance).toBeVisible();
  43 | 
  44 |     console.log(
  45 |       'Checking Balance:',
  46 |       await checkingBalance.textContent()
  47 |     );
  48 | 
  49 |     console.log(
  50 |       'Savings Balance:',
  51 |       await savingsBalance.textContent()
  52 |     );
  53 |   }
  54 | 
  55 |   async logout() {
  56 |     await this.page.getByRole('button', { name: 'Sign Out' }).click();
  57 |   }
  58 | }
```