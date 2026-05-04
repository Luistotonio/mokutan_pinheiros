# Mokutan · 木炭

**Yakitori & Robata · Pinheiros, São Paulo**

Site institucional do Mokutan — restaurante japonês de yakitori e robata no carvão binchōtan, em Pinheiros, São Paulo.

---

## Estrutura do Projeto

```
mokutan/
├── index.html          ← Página principal
├── cardapio.html       ← Cardápio completo (Comidas, Drinks, Saquês, Vinhos)
│
├── css/
│   ├── base.css        ← Reset, variáveis CSS, utilitários compartilhados
│   ├── nav.css         ← Navegação fixa (desktop + mobile)
│   ├── main.css        ← Estilos exclusivos do index.html
│   └── cardapio.css    ← Estilos exclusivos do cardapio.html (tema light/papel)
│
├── js/
│   ├── main.js         ← Scripts do index (nav scroll, reveal, tabs, galeria, form)
│   └── cardapio.js     ← Scripts do cardápio (highlight de seção ativa)
│
├── img/                ← Todas as imagens do site
│   └── (DSC*.JPG, favicon.png, og-cover.jpg...)
│
├── vercel.json         ← Configuração de deploy + security headers
├── .gitignore
└── README.md
```

## Páginas

| Página | URL | Descrição |
|---|---|---|
| Home | `/` | Hero, Conceito, Binchotan, Preview do Cardápio, Galeria, Reservas |
| Cardápio | `/cardapio` | Cardápio completo: Comidas, Drinks, Saquês, Vinhos |

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

| Variável | Cor | Uso |
|---|---|---|
| `--bg` | `#0e0c09` | Fundo principal (dark) |
| `--ember` | `#c49a2a` | Dourado/âmbar — acento principal |
| `--ink` | `#e8dcc8` | Texto claro |
| `--page-bg` (cardápio) | `#f4ecd9` | Fundo papel (light) |
| `--bronze` (cardápio) | `#7a5c12` | Acento do cardápio |

## Deploy

O projeto faz deploy automático na Vercel a cada push na branch `main`.

```bash
git add .
git commit -m "feat: descrição da mudança"
git push
```

### Imagens

Colocar todas as imagens na pasta `/img/`. Os arquivos já referenciados no HTML:

- `img/DSC00488.JPG` — Hero background
- `img/DSC01298.JPG` — Quote/Fogo background
- `img/DSC01354.JPG` — Seção Conceito
- `img/DSC00490.JPG` — Galeria
- `img/DSC00500.JPG` — Galeria
- `img/DSC01337.JPG` — Galeria
- `img/DSC00516.JPG` — Galeria
- `img/favicon.png` — Favicon
- `img/og-cover.jpg` — Preview para redes sociais

---

© 2025 Mokutan · Pinheiros, São Paulo
