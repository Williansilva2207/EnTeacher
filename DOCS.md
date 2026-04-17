## Nome da Solução

**EN-Teacher**

---

## Problema Escolhido

 **Muitos brasileiros têm dificuldade de praticar inglês de forma conversacional e acessível, sem depender de plataformas caras ou professores particulares. A falta de feedback imediato e contextualizado é uma barreira real para o aprendizado.**

---

## Objetivo da Aplicação

 **Oferecer uma plataforma de ensino de inglês com um assistente de IA conversacional, módulos de conteúdo estruturado e ferramentas de suporte ao aprendizado (como dicionário e acompanhamento de desempenho), tornando o estudo mais acessível e interativo para falantes de português.**

---

## Descrição do Caso de Uso

**Um estudante brasileiro acessa a plataforma, escolhe um módulo de inglês (básico ou intermediário) e inicia uma conversa com o Professor GPT. O assistente responde sempre em inglês, adaptando o nível de complexidade ao contexto. O aluno pode consultar o dicionário integrado para entender palavras novas e acompanhar seu progresso pela página de desempenho.**

---

## Tecnologias Utilizadas

### Front-end
- **Next.js** (React framework com App Router)
- **JavaScript / JSX**
- **CSS Modules**

### Back-end
- **Python 3.13**
- **FastAPI** — framework principal da API REST
- **Google Generative AI SDK** (`google-genai`) — integração com modelos Gemini
- **Cohere SDK** — integração de fallback com modelos Command
- **Back4App** (Parse Platform) — banco de dados para persistência de conversas
- **python-dotenv** — gerenciamento de variáveis de ambiente
- **uvicorn** — servidor ASGI

### IA
- **Google Gemini** (modelos: `gemini-3-flash-preview`, `gemini-2.0-flash`, `gemini-2.0-flash-lite`)
- **Cohere** (modelos: `command-a-03-2025`, `command-r-plus-08-2024`, `command-r-08-2024`, `command-r7b-12-2024`)

---

## Arquitetura Geral da Solução

```
┌─────────────────────────────────────────────────────────┐
│                     FRONT-END (Next.js)                  │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │
│  │  Landing │  │ Módulos  │  │  Chat    │  │  Dict/ │  │
│  │  Page    │  │ basic1/2 │  │ Layout   │  │  Perf  │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘  │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP (REST)
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   BACK-END (FastAPI)                     │
│                                                         │
│  POST /chat          GET/DELETE /conversation/{id}       │
│         │                                               │
│         ▼                                               │
│  ┌─────────────────┐                                    │
│  │   ai_manager    │  ← Orquestrador de IA              │
│  │  (fallback)     │                                    │
│  └────┬────────────┘                                    │
│       │                    │                            │
│       ▼                    ▼                            │
│  ┌──────────┐       ┌───────────┐                       │
│  │  Gemini  │       │  Cohere   │  ← Fallback           │
│  │ Service  │       │  Service  │                       │
│  └──────────┘       └───────────┘                       │
│                                                         │
│  ┌────────────────────────────────┐                     │
│  │  Back4App (Parse DB)           │  ← Persistência     │
│  │  Conversas / Histórico         │                     │
│  └────────────────────────────────┘                     │
└─────────────────────────────────────────────────────────┘
```

**Fluxo de resiliência de IA:**
O sistema tenta primeiro os modelos Gemini em cascade. Se todos falharem (por limite de capacidade, erro 429/503), o `ai_manager` automaticamente aciona o fallback com os modelos Cohere, garantindo disponibilidade contínua.

---

## Instruções de Instalação e Execução

### Pré-requisitos

- **Node.js** >= 18
- **Python** >= 3.11
- Chaves de API: Google AI, Cohere, Back4App

---

### Back-end

```bash
# 1. Acesse a pasta do back-end
cd backend

# 2. Crie e ative o ambiente virtual (opcional, mas recomendado)
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 3. Instale as dependências
pip install -r requirements.txt

# 4. Configure as variáveis de ambiente
# Crie um arquivo .env na raiz da pasta backend com:
```

```env
GOOGLE_API_KEY=sua_chave_google_aqui
COHERE_API_KEY=sua_chave_cohere_aqui
BACK4APP_APP_ID=seu_app_id_back4app
BACK4APP_REST_API_KEY=sua_rest_key_back4app
```

```bash
# 5. Execute o servidor
uvicorn main:app --reload --port 8000
```

O back-end estará disponível em: `http://localhost:8000`

---

### Front-end

```bash
# 1. Acesse a pasta do front-end
cd en-teacher

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
# Crie um arquivo .env.local na raiz com:
```

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

```bash
# 4. Execute o servidor de desenvolvimento
npm run dev
```

O front-end estará disponível em: `http://localhost:3000`

---

## Explicação de Como a IA Foi Integrada

A IA é o núcleo funcional da aplicação. Ela é integrada por meio de uma arquitetura de **cascade com fallback automático**:

1. **Entrada do usuário:** O aluno envia uma mensagem pela interface de chat (`ChatLayout.jsx`), que faz uma requisição `POST /chat` ao back-end com o conteúdo da mensagem e o ID da conversa (se existente).

2. **Contexto de conversa:** O back-end recupera o histórico da conversa no Back4App e monta o array de mensagens completo, garantindo que a IA tenha memória do contexto.

3. **Orquestração (`ai_manager.py`):** O `get_ai_response()` primeiro delega para o `gemini_generate()`. Se o Gemini falha (por sobrecarga), o sistema automaticamente chama `cohere_generate()` como fallback.

4. **System Prompt:** Ambos os serviços utilizam um system prompt que instrui a IA a se comportar como um professor de inglês para brasileiros — respondendo sempre em inglês, sendo encorajador, e apresentando-se em português apenas na primeira interação.

5. **Persistência:** A resposta é salva junto ao histórico no Back4App e retornada ao front-end, que atualiza a interface em tempo real.

---

## Exemplos de Uso da Aplicação

### Exemplo 1 — Primeira interação
> **Aluno:** Olá
>
> **Professor GPT:** Hello! I'm your English teacher, you can call me Professor GPT. Welcome! How can I help you today?

### Exemplo 2 — Dúvida gramatical
> **Aluno:** What is the difference between "since" and "for"?
>
> **Professor GPT:** Great question! Both words are used with the present perfect tense, but they work differently...

### Exemplo 3 — Módulo Básico 1
O aluno acessa `/modules/basic1`, visualiza o conteúdo introdutório e pode abrir o chat para tirar dúvidas sobre o material do módulo.

---

## Limitações Atuais do MVP

- **Sem autenticação:** qualquer pessoa com o ID da conversa pode acessá-la.
- **Sem histórico de sessões:** o usuário precisa salvar o `conversation_id` manualmente para retomar uma conversa.
- **Sem avaliação de aprendizado:** não há exercícios, quizzes ou tracking de progresso real.
- **Conteúdo de módulos estático:** os módulos (basic1, basic2, intermediary1) têm conteúdo fixo, sem personalização por nível do aluno.
- **CORS aberto:** `allow_origins=["*"]` — adequado para MVP, mas inseguro para produção.
- **Sem rate limiting:** não há proteção contra uso excessivo da API.
- **Dicionário sem integração de IA:** a página de dicionário não consulta a IA diretamente.

---

## Possíveis Evoluções Futuras

- **Autenticação e perfis de usuário** — login, histórico pessoal e progresso individualizado.
- **Dicionário Personalizado** — usuário poder selecionar e adicionar palavras que não conhece no dicionário.
- **Exercícios interativos com correção por IA** — tradução, pronúncia.
- **Speech-to-text e text-to-speech** — permitir conversas por voz com o professor AI.
- **Personalização de nível** — onboarding com teste de nível e adaptação automática do conteúdo.
- **RAG com materiais didáticos** — indexar livros ou artigos para o professor citar fontes contextualizadas.
-  **Diminuição de Latência** — Ao realizar o fallback para a AI do Cohere, há uma latência significativa.
- **Gamificação** — pontos e conquistas .
- **Deploy em produção** — containerização com Docker.
- **Painel de administração** — para gerenciar módulos, conteúdo e usuários.
