# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: banking.spec.ts >> Complete Banking E2E Flow
- Location: tests\banking.spec.ts:9:5

# Error details

```
Error: locator.click: Error: strict mode violation: locator('.btn-unique') resolved to 2 elements:
    1) <button class="btn-unique secondary">…</button> aka getByRole('button', { name: 'Reset Database' })
    2) <button class="btn-unique">Sign Out</button> aka getByRole('button', { name: 'Sign Out' })

Call log:
  - waiting for locator('.btn-unique')

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
  33 |   async logout() {
> 34 |     await this.page.locator('.btn-unique').click();
     |                                            ^ Error: locator.click: Error: strict mode violation: locator('.btn-unique') resolved to 2 elements:
  35 | }
  36 | }
```