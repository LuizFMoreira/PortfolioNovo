# Direção visual do portfólio — Editorial

Escolhida em 12/11/2026 entre três protótipos (A Editorial, B Escuro refinado, C Imersivo 3D). O protótipo completo está em `prototipo-3-direcoes.html` (abra no navegador). A direção escolhida foi a **A**.

## Ideia
Um portfólio que parece uma página de revista técnica: muito espaço em branco, título grande em serifa, uma única cor de destaque e linhas finas separando as seções. A identidade vem do texto e da tipografia, não de efeitos.

## Cores
| Token (Tailwind) | Valor | Uso |
|---|---|---|
| `paper` | `#eceee9` | Fundo da página |
| `ink` | `#15171a` | Texto principal, linhas fortes, botão primário |
| `accent` | `#2f3cf0` | Única cor de destaque (palavra em itálico no título, links ao passar o mouse, foco) |
| `mute` | `#5f635b` | Texto secundário |
| `line` | `#cfd1ca` | Divisórias suaves |
| erro | `#b3261e` | Só mensagens de erro do formulário |

## Tipografia (Google Fonts)
- **Display:** Instrument Serif (títulos, nomes de projeto, citação em itálico)
- **Texto:** Inter Tight 400/500/600
- **Detalhe:** JetBrains Mono (rótulos em caixa alta, tecnologias, datas)
- Título do Hero: `clamp(3.4rem, 11vw, 8.5rem)`, entrelinha 0.92, tracking -0.025em, uma palavra em itálico na cor de destaque.
- Rótulos (`.eyebrow`): mono, 12px, caixa alta, tracking 0.14em, cor `mute`.

## Layout
- Largura máxima 72rem (`max-w-6xl`), gutter de 20px no celular e 32px no desktop.
- Cada seção abre com uma linha fina de tinta (`border-t border-ink`), título em serifa à esquerda e uma frase de apoio à direita.
- Projetos: grade de 12 colunas, texto em 5 e carrossel em 7, separados por linhas finas. Tecnologias em mono, separadas por `/`.
- Experiência: período, cargo e conquistas em três colunas.
- Contato: campos só com linha inferior, botão preto que fica azul ao passar o mouse.
- Quase nada de cartão, sombra ou raio de borda. Botões e imagens têm cantos retos.

## Movimento
- Entrada suave ao rolar (14px de subida, 0.6s) e uma sequência curta no Hero.
- Tudo respeita `prefers-reduced-motion`.
- Sem partículas, parallax, brilho neon ou 3D.

## Evitar
Neon, glassmorphism, gradientes roxo-azul, emoji como marcador e numeração decorativa.

## Outras direções (guardadas para referência)
- **B · Escuro refinado:** grafite `#121315`, acento âmbar `#e8a33d`, Space Grotesk + JetBrains Mono, grade técnica ao fundo.
- **C · Imersivo 3D:** fundo `#05030f`, acento violeta `#8b6cff` e ciano `#4fd8e8`, cena em camadas com CSS 3D e cards que inclinam com o mouse.

## Onde isso vive no código
`tailwind.config.js` (tokens), `src/index.css` (base e utilitários `.container-page`, `.eyebrow`, `.link-underline`), `src/data/content.js` (textos).
