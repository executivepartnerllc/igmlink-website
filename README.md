# Inovative General Maintenance — public storefront

Lean marketing site for **Inovative General Maintenance** (IGM), El Cajon / San Diego area. Static HTML and CSS for GitHub Pages. Custom domain `igmlink.com` stays on Wix until the team approves a DNS cutover.

**Intended live URL:** https://executivepartnerllc.github.io/igmlink-website/

This token cannot enable GitHub Pages (API returns 403). A repo admin needs one click:

1. Open https://github.com/executivepartnerllc/igmlink-website/settings/pages
2. **Build and deployment → Source:** Deploy from a branch
3. **Branch:** `main` · **Folder:** `/ (root)`
4. Save

Do not add a `CNAME` until DNS is ready to leave Wix.

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

## Deploy

Push to `main`. After Pages is enabled from branch `main` / root (see above), GitHub serves the static files. Do not add a `CNAME` until DNS is ready to leave Wix.
