import cohere
from dotenv import load_dotenv
import os
load_dotenv()


cohere_client = cohere.ClientV2(api_key=os.getenv("COHERE_API_KEY"))

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

async def cohere_generate(messages: list[dict]) -> str:
    model_cascade = [
        "command-a-03-2025",              
        "command-r-plus-08-2024",         
        "command-r-08-2024",              
        "command-r7b-12-2024",            
    ]
    
    for model_id in model_cascade:
        try:
            formatted_messages = [
                {"role": "system", "content": SYSTEM_PROMPT}
            ]
            
            
            for msg in messages:
                formatted_messages.append({
                    "role": msg.get("role", "user"),
                    "content": msg.get("content", "")
                })
            
            response = cohere_client.chat(
                model=model_id,
                messages=formatted_messages,
                temperature=0.7
            )
            return response.message.content[0].text

        except Exception as e:
            err_str = str(e)
            
            
            if "404" in err_str or "was removed" in err_str or "not found" in err_str.lower():
                print(f"LOG: Modelo Cohere '{model_id}' não disponível. Tentando próximo...")
                continue
            
            
            print(f"LOG: Erro no modelo Cohere '{model_id}': {err_str}")
            continue
    
    
    return "Lamentamos, todos os modelos Cohere estão indisponíveis no momento. A API de fallback está experenciando dificuldades. Por favor, tente novamente mais tarde."