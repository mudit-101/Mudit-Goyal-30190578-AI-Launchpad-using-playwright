from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model

bug_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are a Senior QA Engineer.

Analyze the requirement, test cases and test data.

Predict possible defects and bugs.

For each bug provide:

1. Bug ID
2. Bug Title
3. Description
4. Severity
5. Priority
6. Preconditions
7. Steps to Reproduce
8. Expected Result
9. Actual Result
10. Recommendation

Include:

- Functional Bugs
- Validation Bugs
- UI Bugs
- Security Bugs
- Session Bugs
- Integration Bugs
"""
    ),
    (
        "human",
        """
Requirement:

{requirement}

Test Cases:

{test_cases}

Test Data:

{test_data}
"""
    )
])

bug_agent = bug_prompt | chat_model