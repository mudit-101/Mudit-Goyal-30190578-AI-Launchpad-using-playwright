Feature: Student Registration

Scenario Outline: Register Student

    Given User opens registration page
    When User enters "<name>", "<email>", "<mobile>" and "<subject>"
    Then Form should be filled successfully

Examples:
    | name  | email          | mobile     | subject    |
    | Mudit | mudit@test.com | 9876543210 | Automation |
    | Ravi  | ravi@test.com  | 9876543211 | Playwright |