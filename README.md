# Inovative General Maintenance — public storefront

Lean marketing site for **Inovative General Maintenance** (IGM), El Cajon / San Diego area. Static HTML and CSS for GitHub Pages. Custom domain `igmlink.com` stays on Wix until the team approves a DNS cutover.

**Live:** https://executivepartnerllc.github.io/igmlink-website/

GitHub Pages is on: branch `main`, folder `/` (root). Do not add a `CNAME` until DNS is ready to leave Wix.

## Preview locally

From this folder:

```bash
python3 -m http.server 8080
```

Open http://localhost:8080/

No build step, no npm install. Edit the HTML in the root and `assets/css/styles.css`.

## Pages

| File | Route |
| --- | --- |
| `index.html` | Home — hero, four reasons, Dale Smith quote, quote form |
| `about.html` | About |
| `services.html` | Janitorial / day porter / facility cleaning |
| `contact.html` | Quote form and office details |
| `terms.html` | Short SMB terms placeholder |

Quote forms open a `mailto:` message to `nislas@igmlink.com`.

## Background videos

Hosted under `assets/video/` (copied from the public Wix media CDN on igmlink.com, not hotlinked). Muted, looping, `playsinline`. `prefers-reduced-motion: reduce` shows the poster still instead.

| File | Used on | Source |
| --- | --- | --- |
| `assets/video/home-hero.mp4` (720p, ~3.6MB) | Home hero | Wix `video.wixstatic.com` id `11062b_989ef4fbeff04227933fa60f858282fe` from https://www.igmlink.com/ |
| `assets/video/home-hero-mobile.mp4` (480p, ~1.6MB) | Home, narrow screens | same clip |
| `assets/img/home-hero-poster.jpg` | Home first paint | Wix poster `11062b_989ef4fbeff04227933fa60f858282fef000.jpg` |
| `assets/video/about-team.mp4` (720p, ~2.4MB) | About media block | Wix id `11062b_34185c7fbb1a4049b5f760374ce3a7aa` from https://www.igmlink.com/about-us |
| `assets/video/about-team-mobile.mp4` (480p, ~1.2MB) | About, narrow screens | same clip |
| `assets/img/about-team-poster.jpg` | About first paint | Wix poster `11062b_34185c7fbb1a4049b5f760374ce3a7aaf000.jpg` |

## Deploy

Push to `main`. GitHub Pages serves the static files from the repo root. Do not add a `CNAME` until DNS is ready to leave Wix.
