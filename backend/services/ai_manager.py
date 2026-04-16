from services.gemini_service import gemini_generate
from services.cohere_service import cohere_generate
import asyncio

async def get_ai_response(messages: list[dict]) -> str:
    try:
        
        response = await gemini_generate(messages)
        
        if "operando acima da capacidade" in response.lower() or "todos os nossos modelos estão operando acima da capacidade" in response.lower():
            print("LOG: Gemini falhou com limite de capacidade. Tentando Cohere...")
            response = await cohere_generate(messages)
        
        return response
    
    except Exception as e:
        print(f"LOG: Erro inesperado no Gemini: {e}. Tentando Cohere...")
        try:
            return await cohere_generate(messages)
        except Exception as e2:
            return f"Erro em ambos os serviços: Gemini ({e}), Cohere ({e2})"