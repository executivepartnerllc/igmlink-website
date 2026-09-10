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

Official lockup: `assets/img/igm-logo.png` (Wix `IGM_Logo_FC_02.png` / media id `075786_a8a4e829d5ca47c183ee09262008b562`). The mark is blue-and-white on its own black field; header and footer sit it on a light frosted-glass chip so the lockup reads against the airy storefront. Spelling is **Inovative** (one n).

Visual system: near-white / soft blue-gray surfaces, frosted-glass panels (`backdrop-filter`) over full-bleed muted looping videos on Home, About, and Services. Material-style accents (Google blue/red/yellow/green) are used sparingly on chips, buttons, and card rails — not as a Google clone.

## Pages

| File | Route |
| --- | --- |
| `index.html` | Home — hero, four reasons, testimonial slider, quote form |
| `about.html` | About |
| `services.html` | Janitorial / day porter / facility cleaning |
| `contact.html` | Quote form and office details |
| `terms.html` | Short SMB terms placeholder |

Quote forms open a `mailto:` message to `nislas@igmlink.com`.

## Background videos

Hosted under `assets/video/` (copied from the public Wix media CDN on igmlink.com, not hotlinked). Muted, looping, `playsinline`. `prefers-reduced-motion: reduce` shows the poster still instead.

| File | Used on | Source |
| --- | --- | --- |
| `assets/video/home-hero.mp4` (720p, ~3.6MB) | Home hero, Services hero | Wix `video.wixstatic.com` id `11062b_989ef4fbeff04227933fa60f858282fe` from https://www.igmlink.com/ |
| `assets/video/home-hero-mobile.mp4` (480p, ~1.6MB) | Home, narrow screens | same clip |
| `assets/img/home-hero-poster.jpg` | Home first paint | Wix poster `11062b_989ef4fbeff04227933fa60f858282fef000.jpg` |
| `assets/video/about-team.mp4` (720p, ~2.4MB) | About media block | Wix id `11062b_34185c7fbb1a4049b5f760374ce3a7aa` from https://www.igmlink.com/about-us |
| `assets/video/about-team-mobile.mp4` (480p, ~1.2MB) | About, narrow screens | same clip |
| `assets/img/about-team-poster.jpg` | About first paint | Wix poster `11062b_34185c7fbb1a4049b5f760374ce3a7aaf000.jpg` |
| `assets/img/testimonials-office.jpg` | Home testimonial slider background | Wix media `11062b_0f10d1a3bc8e4fb1ba089c42056efe9b` (alt “Businessmen”) from the Home slideshow on https://www.igmlink.com/ |

Home testimonials (copy from the live Wix Home slideshow, not invented): Mario Hernandez, Dale Smith, Nicole Moor. Auto-rotate pauses for `prefers-reduced-motion` and while the slider is hovered or focused.

## Deploy

Push to `main`. GitHub Pages serves the static files from the repo root. Do not add a `CNAME` until DNS is ready to leave Wix.
