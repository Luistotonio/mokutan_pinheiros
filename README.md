# Mokutan · 木炭

**Izakaya japonês · Pinheiros, São Paulo**

Site institucional do Mokutan — izakaya japonês de grelhados no carvão binchōtan, cortes crus, carta de saquês e drinques autorais, em Pinheiros, São Paulo.

🔗 Produção: https://mokutanpinheiros.vercel.app

---

## Estrutura do Projeto

```
mokutan/
├── index.html          ← Página principal
├── cardapio.html       ← Cardápio completo (Cardápio, Drinks, Saquês, Vinhos)
│
├── css/
│   ├── base.css        ← Reset, variáveis CSS, utilitários compartilhados
│   ├── nav.css         ← Navegação fixa (desktop + mobile)
│   ├── main.css        ← Estilos exclusivos do index.html
│   └── cardapio.css    ← Estilos exclusivos do cardapio.html (tema papel)
│
├── js/
│   ├── main.js         ← Scripts do index (nav, reveal, tabs, galeria, lightbox, modal)
│   └── cardapio.js     ← Scripts do cardápio (highlight de seção ativa)
│
├── img/
│   └── webp/           ← Imagens otimizadas — ambiente/, pratos/, bebidas/
│
├── vercel.json         ← Deploy + security headers
├── .gitignore
└── README.md
```

## Páginas

| Página   | URL         | Descrição                                              |
| -------- | ----------- | ------------------------------------------------------ |
| Home     | `/`         | Hero, Conceito, Preview do Cardápio, Galeria, Reservas |
| Cardápio | `/cardapio` | Cardápio completo: Cardápio, Drinks, Saquês, Vinhos    |

## Tecnologias

- HTML5 semântico
- CSS3 com variáveis customizadas
- JavaScript vanilla (sem dependências)
- Deploy via Vercel + GitHub (CI/CD automático)

## Fontes

- **Cinzel** — títulos e identidade
- **Cormorant Garamond** — corpo de texto
- **Shippori Mincho** — elementos japoneses

## Paleta de Cores

| Variável               | Cor       | Uso                              |
| ---------------------- | --------- | -------------------------------- |
| `--bg`                 | `#0e0c09` | Fundo principal (dark)           |
| `--ember`              | `#c49a2a` | Dourado/âmbar — acento principal |
| `--ink`                | `#e8dcc8` | Texto claro                      |
| `--page-bg` (cardápio) | `#f4ecd9` | Fundo papel (light)              |
| `--bronze` (cardápio)  | `#7a5c12` | Acento do cardápio               |

## Deploy

Deploy automático na Vercel a cada push na branch `master`.

```
git add .
git commit -m "feat: descrição da mudança"
git push
```

### Imagens

Imagens otimizadas em `/img/webp/`, organizadas por pasta (`ambiente/`, `pratos/`, `bebidas/`).

Referências principais:

- `img/webp/ambiente/DSC00488.webp` — Hero (LCP, com preload)
- `img/webp/ambiente/DSC00500.webp` — Seção Conceito
- `img/webp/pratos/_S4A2557.webp` — Open Graph / preview social

Favicon: SVG inline (kanji 木) embutido no `<head>`.

---

© 2026 Mokutan · Pinheiros, São Paulo
