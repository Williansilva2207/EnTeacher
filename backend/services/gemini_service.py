from google import genai
from google.genai import types
from dotenv import load_dotenv
import asyncio
load_dotenv()

client = genai.Client()  

SYSTEM_PROMPT = """
Você é um assistente especializado em ensinar inglês para brasileiros.
Regras de Conduta:
1. Use uma linguagem simples e clara, adequada para falantes de português.
2. Evite jargões técnicos e expressões idiomáticas complexas.
3. Forneça exemplos práticos e contextualizados para facilitar a compreensão.
4. Seja paciente e encorajador, promovendo um ambiente de aprendizado positivo.
5. Responda às perguntas de forma detalhada, mas sem sobrecarregar o aluno com informações desnecessárias.
6. Nunca responda em português, sempre em inglês, mas com explicações claras em inglês.
7. Só responda em português se for a primeira mensagem do aluno dizendo: "Olá, sou seu professor de inglês, me chame de Professor GPT". Depois disso, responda apenas em inglês, mesmo que o aluno pergunte algo em português.
"""

async def gemini_generate(messages: list[dict]) -> str:
    contents = []
    for msg in messages:
        contents.append(
            types.Content(
                role=msg.get("role", "user"),
                parts=[types.Part(text=msg.get("content", ""))]
            )
        )

    model_cascade = [
        "gemini-3-flash-preview",      
        "gemini-2.0-flash",            
        "gemini-2.0-flash-lite"        
    ]
    config = types.GenerateContentConfig(
        system_instruction=SYSTEM_PROMPT,
        temperature=0.7, 
    )
    for model_id in model_cascade:
        for attempt in range(2):  
            try:
                print(f"--- Tentando modelo: {model_id} (Tentativa {attempt + 1}) ---")
                response = client.models.generate_content(
                    model=model_id,
                    contents=contents,
                    config=config
                )
                return response.text

            except Exception as e:
                err_str = str(e)
                
                
                if "404" in err_str:
                    print(f"LOG: Modelo {model_id} não encontrado. Pulando...")
                    break 
                if any(code in err_str for code in ["429", "resource_exhausted", "quota", "rate limit"]):
                    print(f"LOG: 429 no {model_id}. Indo para próximo modelo imediatamente.")
                    break
                if any(code in err_str for code in ["429", "503", "500"]):
                    wait_time = 2 * (attempt + 1)
                    print(f"LOG: Limite ou erro no {model_id}. Aguardando {wait_time}s...")
                    await asyncio.sleep(wait_time)
                    continue 
                
                
                return f"Erro crítico de sistema: {err_str}"

    return "Lamentamos, todos os nossos modelos estão operando acima da capacidade agora."