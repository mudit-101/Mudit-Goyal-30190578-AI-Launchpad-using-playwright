from requirement_agent import requirement_agent
from test_case_agent import test_case_chain
from test_data_agent import test_data_agent
from test_review_agent import test_review_agent

requirement = """
PROJECT: E-Commerce Login Functionality

The application allows registered users to log in using
email address and password.

After successful login:

1. User should be redirected to Home Page.
2. User session should be created.

If invalid credentials are entered:

1. Appropriate error message should be displayed.

Validation Rules:

1. Email is mandatory.
2. Password is mandatory.
3. Email format should be validated.
4. Password is case sensitive.

Security Requirements:

1. SQL Injection should be prevented.
2. XSS attacks should be prevented.
3. Only authenticated users can access Home Page.

Session Requirements:

1. Session starts after login.
2. Session expires after timeout.
3. Logout destroys session.

Account Rules:

1. Account locks after 5 failed attempts.
2. Locked account cannot login.

Generate all possible test coverage.
"""

# ==================================
# AGENT 1
# ==================================

print("\n" + "=" * 80)
print("AGENT 1 - REQUIREMENT ANALYSIS")
print("=" * 80)

analysis_response = requirement_agent.invoke({
    "requirement": requirement
})

analysis = analysis_response.content

print(analysis)

# ==================================
# AGENT 2
# ==================================

print("\n" + "=" * 80)
print("AGENT 2 - TEST CASE GENERATION")
print("=" * 80)

test_case_response = test_case_chain.invoke({
    "requirement": requirement,
    "analysis": analysis
})

test_cases = test_case_response.content

print(test_cases)

# ==================================
# AGENT 3
# ==================================

print("\n" + "=" * 80)
print("AGENT 3 - TEST DATA GENERATION")
print("=" * 80)

test_data_response = test_data_agent.invoke({
    "requirement": requirement,
    "test_cases": test_cases
})

test_data = test_data_response.content

print(test_data)

# ==================================
# AGENT 4 - BUG ANALYSIS
# ==================================

print("\n" + "=" * 80)
print("AGENT 4 - BUG ANALYSIS")
print("=" * 80)

bug_response = bug_agent.invoke({
    "requirement": requirement,
    "test_cases": test_cases,
    "test_data": test_data
})

bugs = bug_response.content

print(bugs)

# ==================================
# AGENT 5
# ==================================

print("\n" + "=" * 80)
print("AGENT 5 - TEST REVIEW")
print("=" * 80)

review_response = test_review_agent.invoke({
    "requirement": requirement,
    "analysis": analysis,
    "test_cases": test_cases,
    "test_data": test_data
})

review = review_response.content

print(review)

print("\n" + "=" * 80)
print("FINAL EXECUTION COMPLETED")
print("=" * 80)