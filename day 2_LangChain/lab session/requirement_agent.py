from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model

requirement_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are a Senior QA Business Analyst.

Analyze the requirement and provide:

1. Functional Requirements
2. Non Functional Requirements
3. Business Rules
4. Validation Rules
5. Assumptions
6. Risks
7. Dependencies
8. Edge Cases
9. Test Scope
"""
    ),
    (
        "human",
        """
Requirement:

{requirement}
"""
    )
])

requirement_agent = requirement_prompt | chat_model