from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load OpenAI API Key
openai.api_key = os.getenv("OPENAI_API_KEY")

class EmailRequest(BaseModel):
    prompt: str

@app.post("/api/generate-email")
async def generate_email(request: EmailRequest):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "system", "content": "Generate a professional email based on the given topic."},
                      {"role": "user", "content": request.prompt}]
        )
        email_text = response["choices"][0]["message"]["content"].strip()
        return {"email": email_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
