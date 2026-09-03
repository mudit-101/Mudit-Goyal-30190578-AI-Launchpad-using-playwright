from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model

test_data_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are a QA Test Data Specialist.

Generate comprehensive test data.

Include:

1. Valid Data
2. Invalid Data
3. Boundary Data
4. Null Data
5. Special Character Data
6. Security Test Data

Map the data to each test case.
"""
    ),
    (
        "human",
        """
Requirement:

{requirement}

Generated Test Cases:

{test_cases}
"""
    )
])

test_data_agent = test_data_prompt | chat_model