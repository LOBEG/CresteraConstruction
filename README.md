# Crestara Construction Autority Website

## Local development

```bash
npm install
npm run dev
```

Open: http://localhost:3000

## Netlify deployment

### Do you need a build command?

**If you deploy only the static website pages** (no backend form processing), you **do not need a build command**.

Netlify settings:
- **Build command:** *(leave blank)*
- **Publish directory:** `public`

### Important (backend forms)

This project currently includes a Node/Express backend (`server.js`) for:
- `POST /api/contractor-application` (file uploads + notifications)
- `/config.js` (runtime config)

Netlify’s standard site hosting is **static**, so those backend routes will **not run** unless you migrate them to **Netlify Functions** (or host the backend elsewhere).

## Application notifications (optional)

Set env vars to enable:

- Email (SMTP): `SMTP_HOST`, `SMTP_PORT`, `SMTP_FROM`, `SMTP_TO` (optionally `SMTP_USER`, `SMTP_PASS`)
- Telegram: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
- File download links: `FILE_ACCESS_TOKEN`
- SMS webhook (integration-ready): `SMS_WEBHOOK_URL`
- reCAPTCHA (optional): `RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET`
