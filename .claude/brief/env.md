# Environment Variables

```
CONTENTFUL_SPACE_ID=
CONTENTFUL_DELIVERY_TOKEN=
CONTENTFUL_PREVIEW_TOKEN=
SESSION_SECRET=
```

- `SESSION_SECRET` — used to sign/verify JWT sessions with `jose`. Generate with: `openssl rand -base64 32`
- Never commit `.env.local`
- All secrets go through Vercel environment variable config in production