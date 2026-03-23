# Como corrigir o deploy na Vercel

## Problema
O repositório no GitHub está **sem a pasta `src`**. O `index.html` referencia `/src/index.jsx`, mas esse arquivo não existe no repositório remoto.

## Solução: Enviar o código completo para o GitHub

Execute estes comandos no terminal, dentro da pasta do projeto:

### 1. Inicializar Git (se ainda não for um repositório)
```powershell
cd "c:\Users\PITANG\Desktop\INFORMA\mantis-free-react-admin-template-master"
git init
```

### 2. Conectar ao repositório remoto
```powershell
git remote add origin https://github.com/DaniloAmaralUX/Informa-Painel-Operacional.git
```

**Se o remote já existir** e estiver apontando para outro lugar, atualize:
```powershell
git remote set-url origin https://github.com/DaniloAmaralUX/Informa-Painel-Operacional.git
```

### 3. Adicionar todos os arquivos (incluindo a pasta src)
```powershell
git add .
```

### 4. Verificar o que será enviado
```powershell
git status
```
Confirme que a pasta `src` aparece na lista de arquivos a serem commitados.

### 5. Fazer o commit e push
```powershell
git commit -m "Adiciona código-fonte completo (pasta src)"
git branch -M main
git push -u origin main --force
```

> **Atenção:** O `--force` sobrescreve o que está no GitHub. Use apenas se tiver certeza de que o conteúdo atual do repositório pode ser substituído.

---

## Alternativa: Push normal (se o repo já tiver histórico)
Se o repositório já tiver commits e você quiser manter o histórico:

```powershell
git add .
git status   # Verifique se src/ está listado
git commit -m "Adiciona pasta src com código-fonte"
git push origin main
```

---

## Após o push
1. A Vercel detecta o novo push automaticamente e inicia um novo build
2. O build deve funcionar pois `src/index.jsx` estará disponível
3. Acompanhe o deploy no dashboard da Vercel

## Verificação
No GitHub, confira se a pasta `src` aparece em:  
https://github.com/DaniloAmaralUX/Informa-Painel-Operacional
