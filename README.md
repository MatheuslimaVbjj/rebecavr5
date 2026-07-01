# ATLÂNTICO STUDIO — versão local com vídeo no Hero

Pacote pronto para publicar no GitHub Pages.

## O que foi ajustado

- O Hero principal agora usa vídeo local em MP4.
- O fundo global do site também usa vídeo local.
- Removi a dependência dos links externos da Pexels no `index.html` e no `video-test.html`.
- Os vídeos foram colocados em `assets/video/`.
- As opções extras ficaram em `assets/video/options/`.
- Logo, favicon, imagens e thumbnails foram organizados nas pastas corretas.
- Mantive o botão discreto “Ativar vídeo” para casos raros em que o Safari bloqueie autoplay.

## Estrutura

```txt
atlantico-studio-local-video-final/
├── index.html
├── style.css
├── script.js
├── video-test.html
├── video-options.html
├── assets/
│   ├── favicon/
│   ├── images/
│   ├── logo/
│   └── video/
└── README.md
```

## Vídeo principal

O vídeo principal usado no Hero e no fundo do site é:

```txt
assets/video/ocean-real-waves-bg.mp4
```

Fallbacks locais incluídos:

```txt
assets/video/ocean-full-site-bg.mp4
assets/video/ocean-waves-atlantico.mp4
```

## Como subir no GitHub Pages

1. Extraia o ZIP.
2. Entre na pasta `atlantico-studio-local-video-final`.
3. Envie todos os arquivos para a raiz do repositório.
4. No GitHub, vá em **Settings > Pages**.
5. Em **Branch**, selecione `main` e `/root`.
6. Salve e aguarde a publicação.

## Teste do vídeo

Depois de publicar, abra:

```txt
/video-test.html
```

Se o vídeo tocar nessa página, o arquivo local está carregando corretamente.

## Cache

Depois de substituir arquivos no GitHub Pages, faça atualização forçada:

- Safari no Mac: `Option + Command + R`
- Chrome/Edge: `Command + Shift + R` ou `Ctrl + Shift + R`

Também vale testar em janela privada.
