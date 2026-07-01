# ATLÂNTICO STUDIO — Site premium com Deep Dive Ocean Experience

Site estático pronto para GitHub Pages, com vídeo de oceano no Hero, fundo oceânico em movimento no site inteiro e transição imersiva ao sair do Hero.

## Arquivos principais

- `index.html` — página principal
- `style.css` — estilos, responsividade, glassmorphism e experiência oceânica
- `script.js` — loading, menu mobile, animações, formulário, scroll effect e partículas
- `video-options.html` — página auxiliar para comparar 3 opções de vídeo
- `assets/logo` — logo principal e ícones da marca
- `assets/favicon` — favicon e Apple Touch Icon
- `assets/video` — vídeos principais do oceano
- `assets/video/options` — vídeos alternativos para escolha
- `assets/images` — posters, thumbnails e artes SVG dos cards

## O que foi aplicado nesta versão

- Hero com vídeo de ondas em movimento.
- Fundo do site inteiro com vídeo oceânico fixo.
- Nova seção `Imersão Digital` logo após o Hero.
- Efeito de saída do Hero com sensação de mergulho no oceano.
- Canvas de partículas simulando particle wave.
- Correntes luminosas e portal líquido acompanhando o scroll.
- Responsividade ajustada para desktop, tablet e mobile.
- Assets organizados nas pastas corretas para GitHub Pages.

## Como publicar no GitHub Pages

1. Extraia o ZIP.
2. Envie todos os arquivos para o repositório.
3. No GitHub, vá em **Settings > Pages**.
4. Em **Branch**, selecione `main` e `/root`.
5. Salve e aguarde a publicação.

## Importante sobre cache

Se o navegador ainda mostrar uma versão antiga, faça atualização forçada:

- Safari no Mac: `Option + Command + R`
- Chrome/Edge: `Command + Shift + R` ou `Ctrl + Shift + R`
- Também vale testar em janela anônima.

## Trocar vídeo principal

No `index.html`, altere os caminhos dentro das tags `<source>`.

Hero atual:

```html
<source src="assets/video/ocean-waves-atlantico.mp4?v=6" type="video/mp4" />
```

Transição imersiva atual:

```html
<source src="assets/video/ocean-real-waves-bg.mp4?v=6" type="video/mp4" />
```

Fundo do site inteiro:

```html
<source src="assets/video/ocean-full-site-bg.mp4?v=6" type="video/mp4" />
```
