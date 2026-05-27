# Deployment Guide

## Vercel free tier

The Vercel Hobby plan is enough for this project. It supports personal projects, many projects, and production deployments. You do not need Pro for a static Next.js portfolio product unless you want team collaboration, more analytics history, password protection, or higher resource limits.

## Recommended deployment setup

Use one Vercel project for this app. Use the normal production URL, not only the share URL.

Recommended flow:

```bash
npm run build:data
npm run lint
npm run build
git status
git add .
git commit -m "Ship v8 interpretation pass"
git push origin main
```

Then open Vercel dashboard:
1. Confirm the GitHub push triggered a deployment.
2. Wait for the build to pass.
3. Open the Production Deployment URL.
4. Test these routes:
   - /
   - /essay
   - /firms
   - /firms/amec
   - /firms/piotech
   - /supply
   - /explorer?city=Shanghai
   - /sources
   - /methodology

## Custom domain

For sharing publicly, use either:
- the stable Vercel production domain, or
- a custom subdomain under your portfolio domain.

Examples:
- china-chip-tooling.vercel.app
- tooling-talent.yourdomain.com
- talent.jinhuayip.com

A custom domain makes the project feel more finished. It is not required for the first advisor test.

## Multiple projects

Create separate Vercel projects for separate apps. The free plan is not limited to one deployed project, but each project has usage limits. Keep static projects simple and you should be fine.
