# Configuração da Autenticação com Supabase

## Modo de Desenvolvimento (Sem Supabase)

Por padrão, a aplicação funciona em **modo de desenvolvimento** sem precisar de configurar o Supabase. Neste modo:

- ✅ Os códigos OTP são gerados localmente e aparecem na **consola do browser** (abre DevTools > Console)
- ✅ Podes testar o fluxo completo de registo e verificação
- ✅ Os códigos são válidos por 1 hora
- ✅ Ideal para desenvolvimento e testes

### Como usar o modo de desenvolvimento:

1. Deixa o ficheiro `.env` com valores vazios (já está configurado por padrão)
2. Inicia a aplicação com `pnpm run dev`
3. Verás um aviso amarelo no canto inferior direito: "Modo de Desenvolvimento"
4. Regista um novo utilizador com qualquer email (não precisa de ser real)
5. **IMPORTANTE**: Abre a consola do browser (pressiona F12 → vai ao tab "Console")
6. Vê o código OTP de 6 dígitos gerado (aparece como "🔐 [MODO DESENVOLVIMENTO] Código OTP...")
7. Copia o código e insere-o na página de verificação
8. A conta será criada e autenticada com sucesso!

**Exemplo de output na consola:**
```
🔐 [MODO DESENVOLVIMENTO] Código OTP para teste@email.com : 123456
💡 Usa este código na página de verificação
```

---

## Modo de Produção (Com Supabase Real)

Para usar autenticação real com emails enviados aos utilizadores:

## 1. Criar Projeto no Supabase

1. Acede a [supabase.com](https://supabase.com) e cria uma conta
2. Clica em "New Project"
3. Preenche os dados do projeto:
   - Nome do projeto: `marixica`
   - Password da base de dados (guarda esta password!)
   - Região: Europe West (Ireland) ou a mais próxima
4. Aguarda a criação do projeto (2-3 minutos)

## 2. Obter as Credenciais

1. No painel do Supabase, vai a **Settings** > **API**
2. Copia os seguintes valores:
   - **Project URL** (VITE_SUPABASE_URL)
   - **anon/public key** (VITE_SUPABASE_ANON_KEY)

## 3. Configurar Variáveis de Ambiente

1. Cria um ficheiro `.env` na raiz do projeto
2. Copia o conteúdo de `.env.example` para `.env`
3. Substitui os valores com as credenciais que copiaste:

```env
VITE_SUPABASE_URL=https://teu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 4. Configurar Autenticação por Email

1. No painel do Supabase, vai a **Authentication** > **Providers**
2. Certifica-te que **Email** está ativado
3. Em **Email Auth**, ativa:
   - ✅ **Enable email confirmations** (desativado para desenvolvimento)
   - ✅ **Secure email change**

### Para Desenvolvimento (Recomendado)

Para facilitar os testes, podes desativar a confirmação de email:

1. Vai a **Authentication** > **Settings**
2. Em **User Signups**, desativa **Enable email confirmations**
3. Isto permite criar contas sem precisar de verificar o email real

### Para Produção (Obrigatório)

1. Configura um provedor de email (ex: SendGrid, Resend, etc.)
2. Vai a **Settings** > **Auth** > **SMTP Settings**
3. Ativa **Enable Custom SMTP**
4. Preenche os dados do teu provedor de email

## 5. Personalizar Templates de Email

1. Vai a **Authentication** > **Email Templates**
2. Personaliza o template **Confirm signup** com o branding da Marixica
3. Podes usar HTML e CSS para personalizar o email

Exemplo de template:

```html
<h2>Bem-vindo à Marixica! 🍰</h2>
<p>Olá {{ .Name }},</p>
<p>Obrigado por te juntares à família Marixica. O teu código de verificação é:</p>
<h1 style="font-size: 32px; letter-spacing: 8px;">{{ .Token }}</h1>
<p>Este código é válido por 1 hora.</p>
```

## 6. Testar a Autenticação

1. Reinicia o servidor de desenvolvimento:
```bash
pnpm run dev
```

2. Acede à página de registo
3. Insere um email válido (que consigas aceder)
4. Verifica o email e copia o código de 6 dígitos
5. Insere o código na página de verificação
6. Se tudo estiver correto, serás autenticado e redirecionado para a homepage

## 7. Resolução de Problemas

### Não recebo emails

- Verifica se o email está correto
- Verifica a pasta de spam
- Se em desenvolvimento, verifica os logs do Supabase em **Authentication** > **Logs**
- Considera desativar a confirmação de email para testes

### Erro "Invalid API key"

- Verifica se copiaste corretamente as credenciais do Supabase
- Certifica-te que o ficheiro `.env` está na raiz do projeto
- Reinicia o servidor de desenvolvimento

### Erro "User already registered"

- Este erro ocorre se tentares registar o mesmo email duas vezes
- Vai ao Supabase > **Authentication** > **Users** e elimina o utilizador
- Tenta novamente

## 8. Estrutura de Base de Dados (Opcional)

Se quiseres armazenar dados adicionais dos utilizadores (moradas, encomendas, etc.), podes criar tabelas:

1. Vai a **Table Editor**
2. Cria uma tabela `profiles` com:
   - `id` (uuid, FK para auth.users)
   - `name` (text)
   - `phone` (text)
   - `avatar_url` (text)
   - Outros campos conforme necessário

3. Ativa Row Level Security (RLS):
```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

## Conclusão

Após seguir estes passos, a autenticação com Supabase estará configurada e funcional. Os utilizadores receberão um código OTP real por email e só conseguirão criar conta após verificação bem-sucedida.
