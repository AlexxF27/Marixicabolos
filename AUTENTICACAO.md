# 🔐 Sistema de Autenticação - Marixica

## Como Testar Agora (Modo Desenvolvimento)

A aplicação está configurada para funcionar **imediatamente** sem precisar de configurar nada!

### Passos para testar:

1. **Abre a consola do browser**
   - Pressiona `F12` ou `Ctrl+Shift+I` (Windows/Linux)
   - Pressiona `Cmd+Option+I` (Mac)
   - Vai ao tab **Console**

2. **Regista uma nova conta**
   - Vai à página de registo
   - Preenche os dados (podes usar qualquer email, não precisa de ser real)
   - Clica em "Criar Conta"

3. **Verifica o código na consola**
   - Na consola do browser, verás uma mensagem como:
   ```
   🔐 [MODO DESENVOLVIMENTO] Código OTP para teste@email.com : 123456
   💡 Usa este código na página de verificação
   ```

4. **Insere o código**
   - Copia o código de 6 dígitos da consola
   - Cola na página de verificação
   - Clica em "Verificar e Entrar"

5. **Pronto!** 🎉
   - A tua conta foi criada e estás autenticado
   - Agora podes aceder ao perfil, fazer encomendas, etc.

---

## Funcionalidades Implementadas

✅ **Registo de utilizador com validação**
- Nome completo
- Email único
- Palavra-passe (mínimo 6 caracteres)
- Confirmação de palavra-passe
- Telefone com código de país
- Data de nascimento

✅ **Verificação por código OTP**
- Código de 6 dígitos gerado automaticamente
- Válido por 1 hora
- Validação real do código (códigos errados são rejeitados)
- Possibilidade de reenviar código

✅ **Sistema de Segurança**
- ❌ Não é possível criar conta sem verificar o email
- ❌ Códigos inválidos são rejeitados
- ❌ Não é possível usar o mesmo email duas vezes
- ✅ Conta só é criada após verificação bem-sucedida

✅ **Interface de Utilizador**
- Mensagens de erro claras
- Estados de loading durante verificação
- Feedback visual de sucesso/erro
- Design consistente com o resto da aplicação

---

## Para Produção (Opcional)

Se quiseres usar autenticação real com emails enviados aos utilizadores:

1. Segue as instruções em `SUPABASE_SETUP.md`
2. Cria um projeto no Supabase
3. Configura as credenciais no ficheiro `.env`
4. Os emails serão enviados automaticamente aos utilizadores

**Sem Supabase (atual):**
- Códigos aparecem na consola
- Perfeito para desenvolvimento e testes

**Com Supabase:**
- Códigos enviados por email
- Necessário para produção
- Configuração em 10 minutos

---

## Resolução de Problemas

### O código não aparece na consola
- Certifica-te que tens a consola aberta (F12 → Console)
- Recarrega a página e tenta novamente
- Verifica se não há erros na consola

### "Código inválido"
- Certifica-te que copiaste o código correto da consola
- O código tem 6 dígitos
- Verifica se não passou 1 hora (códigos expiram)

### "Este email já está registado"
- Usa um email diferente
- Ou limpa o localStorage: `localStorage.clear()` na consola

---

## Próximos Passos

A autenticação está totalmente funcional! Agora podes:

1. ✅ Testar o fluxo completo de registo
2. ✅ Verificar que códigos errados são rejeitados
3. ✅ Confirmar que a conta só é criada após verificação
4. 📧 (Opcional) Configurar Supabase para emails reais
