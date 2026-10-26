# Remaining account and edge protections

The source and workflow protections are implemented in the personal-site repository. This directory contains the concrete configuration for response-header protections that HTML meta elements cannot supply. **The edge configuration is prepared, not active.** GitHub Pages remains the origin.

## GitHub domain ownership

1. Open [GitHub profile Settings → Pages](https://github.com/settings/pages).
2. Add `piyushwanchoo.com` under verified domains.
3. Copy GitHub's generated TXT hostname and value into Spaceship's DNS settings. Use the exact generated value; it cannot be inferred from the Google verification file.
4. Verify the domain in GitHub and retain the TXT record. Leave the four existing A records, `www` CNAME, and email records in place.

Account-level GitHub verification status cannot be established from the repository's custom-domain setting alone. The current custom domain and HTTPS enforcement are confirmed configured. GitHub account 2FA was confirmed enabled through the authenticated API on October 26, 2026.

## Spaceship account and domain

In Spaceship, confirm 2FA or a passkey in Security Center, keep recovery methods somewhere private, and confirm domain transfer lock and auto-renewal for `piyushwanchoo.com`. Domain renewal and transfer settings are account-specific and have not been changed. Never send passwords, authenticator seeds, one-time codes, or recovery codes through the chat.

## Full response headers while retaining GitHub Pages

The optional [Worker](cloudflare/security-headers.js) adds HSTS, MIME-sniffing protection, anti-framing headers, an explicit referrer policy, and restrictions on unused browser features. It preserves origin response bodies, status codes, redirects, content types, media range responses, and existing CSP. It applies across the profile and Atlas paths without imposing the profile's script restrictions on the separate Atlas application.

Deployment requires a Cloudflare account and proxy configuration for this domain. Before changing nameservers, import and verify **every existing DNS record**, including email and verification records, and inspect whether DNSSEC requires coordinated changes. Keep the Spaceship registration and GitHub Pages custom-domain configuration. Do not change nameservers until this DNS comparison has been reviewed.

After the domain is active in Cloudflare, use Full (strict) TLS and proxy the GitHub Pages DNS records. Deploy this module as routes `piyushwanchoo.com/*` and `www.piyushwanchoo.com/*`. The Worker uses the normal route `fetch(request)` to reach the existing origin. Avoid a Custom Domain Worker configuration that replaces the GitHub Pages origin.

HSTS starts at one day, with no `includeSubDomains` or preload. After confirming the profile, Atlas, redirects, and any other relevant services work over HTTPS, increase the duration deliberately. Roll back the Worker route if functionality fails; preserve DNS and origin HTTPS throughout. An `_headers` file in a Pages artifact does not activate these controls.

References: [GitHub domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages), [Cloudflare header modification](https://developers.cloudflare.com/workers/examples/alter-headers/), [Worker routes](https://developers.cloudflare.com/workers/configuration/routing/routes/), [CSP frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors).
