import httpx
from dotenv import load_dotenv
import os

load_dotenv()
APPLICATION_ID = os.getenv("APPLICATION_ID")
REST_API_KEY = os.getenv("REST_API_KEY")
MASTER_KEY = os.getenv("MASTER_KEY")
BASE_URL = "https://parseapi.back4app.com/classes/Todo"
BASE_URL_CONVERSATION = "https://parseapi.back4app.com/classes/Conversation"

HEADERS = {
    "X-Parse-Application-Id": APPLICATION_ID,
    "X-Parse-REST-API-Key": REST_API_KEY,
    "X-Parse-Master-Key": MASTER_KEY,
    "Content-Type": "application/json"
}


async def create_todo(title: str, is_completed: bool = False):
    payload = {
        "title": title,
        "isCompleted": is_completed
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            BASE_URL,
            json=payload,
            headers=HEADERS
        )

    return response.json()


async def get_todos():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            BASE_URL,
            headers=HEADERS
        )

    return response.json()


async def create_conversation(messages: list[dict]):
    payload = {
        "messages": messages
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            BASE_URL_CONVERSATION,
            json=payload,
            headers=HEADERS
        )

    return response.json()


async def get_conversation(object_id: str):
    url = f"{BASE_URL_CONVERSATION}/{object_id}"
    async with httpx.AsyncClient() as client:
        response = await client.get(
            url,
            headers=HEADERS
        )

    return response.json()


async def update_conversation(object_id: str, messages: list[dict]):
    url = f"{BASE_URL_CONVERSATION}/{object_id}"
    payload = {
        "messages": messages
    }

    async with httpx.AsyncClient() as client:
        response = await client.put(
            url,
            json=payload,
            headers=HEADERS
        )

    return response.json()