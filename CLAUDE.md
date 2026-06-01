# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projeto

Site institucional do **Mokutan** — izakaya japonês em Pinheiros, São Paulo. Stack: HTML5 + CSS3 + JavaScript vanilla, sem build system, sem dependências. Deploy automático na Vercel a cada push na branch `master`.

URL de produção: `https://mokutanpinheiros.vercel.app`

## Deploy

```bash
git add .
git commit -m "feat: descrição"
git push
```

Não há build step. O que está na pasta é o que vai pro ar. O Vercel detecta push no `master` e faz o deploy automaticamente.

**Importante:** ao commitar, adicionar apenas os arquivos do site (`git add <arquivos>`), **nunca `git add -A`** — as pastas `originais/`, `img/novas/`, `img/pratos/` (originais de câmera) e `*.pdf` estão no `.gitignore`/`.vercelignore` e não devem ir pro repositório/deploy.

## Arquitetura CSS

Quatro arquivos CSS:

- `css/base.css` — variáveis globais, reset, utilitários (`.btn`, `.rv`, `.lbl`, `.heading`, modal de reserva). Carregado **só pelo `index.html`** (com `?v=` de cache-busting).
- `css/nav.css` — navegação fixa do `index.html` (desktop + mobile).
- `css/main.css` — estilos exclusivos do `index.html`.
- `css/cardapio.css` — estilos do `cardapio.html`. ⚠️ **Página independente:** o `cardapio.html` carrega **APENAS** o `cardapio.css` (não usa base.css nem nav.css). Tem o próprio `:root` e o próprio modal de reserva embutido (HTML + CSS).

**Tema:** os dois (index e cardápio) usam fundo **dark** (`#0e0c09`). `--char: #0e0c09` é o fundo escuro; `--bg: #f4ecd9` é uma cor creme usada só em detalhes (NÃO é fundo de página).

**Cache-busting:** os links de CSS no HTML usam `?v=N` (ex.: `base.css?v=2`). Ao alterar um CSS, **incrementar o número** para o navegador pegar a versão nova.

## Variáveis CSS principais

Dourado **unificado** entre index e cardápio (jun/2026):

```css
/* base.css (index) */
--ember:  #9e7220   /* dourado — acento principal */
--elite:  #9e7220   /* dourado — hover */
--bronze: #c49a35   /* bronze claro — preços/títulos */
--bg:     #f4ecd9   /* creme — só detalhes, NÃO é fundo */
--ink:    #1c1a17   /* texto escuro */
--smoke:  #5a5550   /* texto secundário */
--char:   #0e0c09   /* fundo dark */

/* cardapio.css (mesmo dourado) */
--ember:  #9e7220
--bronze: #c49a35

--font-display: 'Cinzel'  ·  --font-body: 'Cormorant Garamond'  ·  --font-japanese: 'Shippori Mincho'
```

⚠️ **Atenção:** boa parte do dourado no `main.css` está em **rgba fixo** (`rgba(158,114,32, X)` = `#9e7220`), não via variável. Se for mudar o dourado de novo, alterar TANTO as variáveis QUANTO os `rgba(158,114,32,...)` no main.css/nav.css/base.css.

## JavaScript

- `js/main.js` — IIFE com: data-bg loader (CSP-safe), nav scroll, mobile menu, reveal por IntersectionObserver, tabs do conceito (pills), galeria lightbox, modal de reserva (iframe getin.app).
- `js/cardapio.js` — highlight da seção ativa no scroll do cardápio + modal de reserva (intercepta o link do getin e abre no iframe `#rsv-modal`).

**Backgrounds via `data-bg`:** por causa da CSP, backgrounds dinâmicos são definidos via atributo `data-bg="caminho/img.webp"` no HTML e aplicados por JS como variável CSS `--card-img` (renomeada de `--bg` para não colidir com a cor creme global). Nunca usar `background-image` inline no HTML.

## Imagens

- Todas as imagens servidas como `.webp` em `img/webp/` com subpastas `ambiente/`, `pratos/`, `bebidas/`.
- JPGs originais ficam em `img/` (ambiente) e `originais/` — **não referenciar diretamente no HTML em produção**, usar sempre o webp equivalente.
- O hero (`img/webp/ambiente/DSC00488.webp`) tem `<link rel="preload">` no `<head>` — se trocar a imagem do hero, atualizar o preload.

## CSP (Content Security Policy)

Definida no `vercel.json`. Regras relevantes:
- `frame-src`: apenas `https://reservation.getin.app` (modal de reserva)
- `frame-ancestors`: permite embed em `https://luis-portfolio-five.vercel.app`
- Scripts externos não são permitidos — tudo é vanilla JS local
- Fonts apenas de `fonts.googleapis.com` / `fonts.gstatic.com`

Ao adicionar qualquer recurso externo novo (font, script, iframe), atualizar a CSP no `vercel.json`.

## Animações

- `.rv` + `.in`: classe aplicada pelo IntersectionObserver para reveal de entrada (fade + translateY). Delay via `.d1`–`.d4`.
- `.rv-x`: variante que entra da esquerda (translateX).
- Hero usa animação CSS `kz` (Ken Burns) definida em `main.css`.
- Respeita `prefers-reduced-motion`.

## Páginas existentes

| Arquivo | Rota | Descrição |
|---|---|---|
| `index.html` | `/` | Home: hero, conceito, preview cardápio, galeria, reservas |
| `cardapio.html` | `/cardapio` | Cardápio online completo (comidas, drinks, saquês, vinhos). **Sincronizado com o impresso** |
| `mokutan-menu.html` | — | **Cardápio IMPRESSO** (folha A4 p/ gráfica). Fonte da verdade de pratos/preços. Gitignored, não vai pro deploy |
| `_legado/mokutan-mobile.html` | — | Arquivado (era SPA mobile do cardápio, substituída pelo `cardapio.html` responsivo) |

**Regra de conteúdo:** quando os pratos/preços mudarem, o `mokutan-menu.html` (impresso) é a referência. Atualizar o `cardapio.html` (online) para bater com ele.

## Schema.org

`index.html` tem schema `Restaurant` inline no `<head>`; `cardapio.html` tem schema `Menu` (com as seções). Ao atualizar dados do restaurante (telefone, endereço, horários), atualizar também o schema.
