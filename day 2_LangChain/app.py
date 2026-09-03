import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
# Load .env variables
load_dotenv()

# Create LLM
llm = ChatGroq(
model="llama-3.3-70b-versatile",
api_key=os.getenv("GROQ_API_KEY")
)
print("Chatbot Started! Type 'exit' to quit.\n")
while True:
    try:
        query = input("You: ")
    except (EOFError, KeyboardInterrupt):
        print("\nGoodbye!")
        break

    if query.lower() == "exit":
        print("Goodbye!")
        break

    try:
        response = llm.invoke(query)
    except Exception as e:
        # fallback: print error and continue
        print("AI: Error invoking model:", e)
        continue

    # llm.invoke may return an object with a .content attribute
    content = getattr(response, "content", response)
    # ensure printable
    try:
        print("AI:", content)
    except Exception:
        print("AI: (unable to display response)")