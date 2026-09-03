from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model

test_review_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are a Senior QA Reviewer.

Review generated test artifacts.

Check:

1. Requirement Coverage
2. Missing Scenarios
3. Positive Coverage
4. Negative Coverage
5. Boundary Coverage
6. Security Coverage
7. Duplicate Test Cases
8. Missing Expected Results
9. Incorrect Assumptions
10. Priority Issues

Provide:

- Coverage Assessment
- Missing Scenarios
- Issues Found
- Recommendations
- Final Review
"""
    ),
    (
        "human",
        """
Requirement:

{requirement}

Requirement Analysis:

{analysis}

Generated Test Cases:

{test_cases}

Generated Test Data:

{test_data}

Predicted Bugs:

{bugs}
"""
    )
])

test_review_agent = test_review_prompt | chat_model