from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from back4app import create_todo, get_todos, create_conversation, get_conversation, update_conversation, delete_conversation
from services.ai_manager import get_ai_response
from pydantic import BaseModel
from typing import Optional

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None

@app.post("/todos")
async def create(title: str, is_completed: bool = False):
    return await create_todo(title, is_completed)

@app.get("/todos")
async def list_todos():
    return await get_todos()

@app.get("/conversation/{conversation_id}")
async def conversation(conversation_id: str):
    conv = await get_conversation(conversation_id)
    if not conv or "error" in conv:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return {"conversation_id": conversation_id, "messages": conv.get("messages", [])}

@app.delete("/conversation/{conversation_id}")
async def delete_conv(conversation_id: str):
    result = await delete_conversation(conversation_id)
    if "error" in result:
        raise HTTPException(status_code=400, detail="Failed to delete conversation")
    return {"message": "Conversation deleted successfully"}

@app.post("/chat")
async def chat(request: ChatRequest):
    if request.conversation_id:
        conv = await get_conversation(request.conversation_id)
        if not conv or "error" in conv:
            messages = []
        else:
            messages = conv.get("messages", [])
    else:
        messages = []

    messages.append({"role": "user", "content": request.message})
    
    response_text = await get_ai_response(messages)
    messages.append({"role": "assistant", "content": response_text})

    if request.conversation_id:
        await update_conversation(request.conversation_id, messages)
        conversation_id = request.conversation_id
    else:
        new_conv = await create_conversation(messages)
        conversation_id = new_conv.get("objectId")

    return {"response": response_text, "conversation_id": conversation_id}