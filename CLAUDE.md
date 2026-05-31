# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projeto

Site institucional do **Mokutan** — izakaya japonês em Pinheiros, São Paulo. Stack: HTML5 + CSS3 + JavaScript vanilla, sem build system, sem dependências. Deploy automático na Vercel a cada push na branch `main`.

URL de produção: `https://mokutanpinheiros.vercel.app`

## Deploy

```bash
git add .
git commit -m "feat: descrição"
git push
```

Não há build step. O que está na pasta é o que vai pro ar. O Vercel detecta push no `main` e faz o deploy automaticamente.

## Arquitetura CSS

Quatro arquivos com separação clara de responsabilidade:

- `css/base.css` — variáveis CSS globais, reset, utilitários compartilhados (`.btn`, `.rv`, `.lbl`, `.heading`, modal de reserva). **Carregado em todas as páginas.**
- `css/nav.css` — navegação fixa (desktop + mobile). **Carregado em todas as páginas.**
- `css/main.css` — estilos exclusivos do `index.html`.
- `css/cardapio.css` — estilos exclusivos do `cardapio.html` (tema light/papel `#f4ecd9`).

**Atenção ao tema:** `index.html` usa fundo dark (`--char: #0e0c09`) com texto claro; `cardapio.html` usa fundo papel claro. As variáveis em `base.css` refletem o tema do cardápio por padrão — o `main.css` sobrescreve para o dark do index.

## Variáveis CSS principais

```css
--bg: #f4ecd9       /* fundo papel (cardápio) */
--ember: #8c6514    /* dourado — acento principal */
--elite: #7a5c12    /* dourado escuro — hover */
--bronze: #6b4e0e   /* bronze */
--ink: #1c1a17      /* texto principal */
--smoke: #5a5550    /* texto secundário */
--char: #0e0c09     /* fundo dark (index) */
--font-display: 'Cinzel'
--font-body: 'Cormorant Garamond'
--font-japanese: 'Shippori Mincho'
```

## JavaScript

- `js/main.js` — IIFE com: data-bg loader (CSP-safe), nav scroll, mobile menu, reveal por IntersectionObserver, tabs do conceito (pills), galeria lightbox, modal de reserva (iframe getin.app).
- `js/cardapio.js` — highlight da seção ativa no scroll do cardápio.

**Backgrounds via `data-bg`:** por causa da CSP, backgrounds dinâmicos são definidos via atributo `data-bg="caminho/img.webp"` no HTML e aplicados por JS como variável CSS `--bg`. Nunca usar `background-image` inline no HTML.

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
| `cardapio.html` | `/cardapio` | Cardápio completo: comidas, drinks, saquês, vinhos |
| `mokutan-menu.html` | — | Versão legada/alternativa (não linkada no nav principal) |
| `mokutan-mobile.html` | — | Versão legada/alternativa (não linkada no nav principal) |

## Schema.org

`index.html` tem schema `Restaurant` inline no `<head>`. Ao atualizar dados do restaurante (telefone, endereço, horários), atualizar também o schema.
