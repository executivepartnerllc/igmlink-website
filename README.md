# Inovative General Maintenance — public storefront

Lean marketing site for **Inovative General Maintenance** (IGM), El Cajon / San Diego area. Static HTML and CSS for GitHub Pages. Custom domain `igmlink.com` stays on Wix until the team approves a DNS cutover.

**Live (GitHub Pages):** https://executivepartnerllc.github.io/igmlink-website/

Pages is published from `main` by the `Deploy GitHub Pages` workflow (static HTML at the repo root). If the URL 404s, a repo admin should open **Settings → Pages** and confirm Pages is allowed for this public repo. Do not add a `CNAME` until DNS is ready to leave Wix.

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

## Deploy

GitHub Pages is set to **branch `main`, folder `/` (root)**. Push to `main` to publish. Do not add a `CNAME` until DNS is ready to leave Wix.
