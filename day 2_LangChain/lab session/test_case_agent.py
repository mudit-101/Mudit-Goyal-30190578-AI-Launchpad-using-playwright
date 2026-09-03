from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model

test_case_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are a Senior QA Test Engineer.

Generate exhaustive test cases.

Include:

1. Positive Test Cases
2. Negative Test Cases
3. Boundary Test Cases
4. Validation Test Cases
5. Security Test Cases
6. Error Handling Test Cases
7. Session Management Test Cases

For every test case provide:

- Test Case ID
- Scenario
- Preconditions
- Steps
- Test Data
- Expected Result
- Priority

Do not miss any scenario.
"""
    ),
    (
        "human",
        """
Requirement:

{requirement}

Requirement Analysis:

{analysis}
"""
    )
])

test_case_chain = test_case_prompt | chat_model