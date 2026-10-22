# Videá

Sem patrí **len krátky hero loop** (do ~5 MB), ak ho chceš mať priamo na webe.

Celé projekty sem nedávaj:
- GitHub odmietne súbory nad 100 MB.
- Cloudflare Pages má limit 25 MB na súbor.

Celé videá hosťuj na Cloudflare R2, Vimeo alebo Bunny Stream a v index.html použi ich URL v `<video src="...">`.

## Export hero loopu (ffmpeg)

```bash
ffmpeg -i showreel.mov -t 20 -an -vf "scale=1920:-2,fps=25" \
  -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart showreel.mp4
```

Poster (prvý snímok ako obrázok):

```bash
ffmpeg -i showreel.mp4 -frames:v 1 -q:v 3 ../img/showreel.jpg
```
