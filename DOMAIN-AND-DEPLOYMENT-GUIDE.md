# Domain and Deployment Guide

Set `NEXT_PUBLIC_SITE_URL=https://example.com` locally and replace only with the confirmed HTTPS origin in production. Prefer the apex domain as canonical and redirect `www` to apex unless email/hosting constraints suggest otherwise.

## Vercel

Import the independent repository; set environment variables; run the production build; attach the domain only after approval; verify canonical, sitemap, robots, redirects, forms and legal pages. Do not deploy from this handoff.

## DNS / Cloudflare

Document existing DNS; use provider-prescribed A/AAAA/CNAME records; keep TTL low during cutover; preserve MX/SPF/DKIM/DMARC; enforce HTTPS; redirect one hostname to the canonical one; test IPv4/IPv6.

## Email planning

Use a role address only after mailbox and privacy decisions. Configure SPF, DKIM and DMARC before newsletter sending. Keep transactional/newsletter streams separable.

## Redirects

Map any former paths explicitly, use 301 only after final confirmation, avoid redirect chains, and retain campaign parameters where appropriate.
