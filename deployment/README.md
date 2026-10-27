# Account protections and optional response headers

The source, workflow, domain-verification, and account checks for the current Spaceship + GitHub Pages setup are complete. This directory also contains an optional configuration for response-header protections that HTML meta elements cannot supply. **Cloudflare is deferred by choice; the edge configuration is prepared, not active.**

## GitHub domain ownership

1. Open [GitHub profile Settings → Pages](https://github.com/settings/pages).
2. Add `piyushwanchoo.com` under verified domains.
3. Copy GitHub's generated TXT hostname and value into Spaceship's DNS settings. Use the exact generated value; it cannot be inferred from the Google verification file.
4. Verify the domain in GitHub and retain the TXT record. Leave the four existing A records, `www` CNAME, and email records in place.

GitHub domain verification was completed on October 26, 2026. The authenticated Pages API confirms `protected_domain_state: verified`, and the generated TXT record is visible through both authoritative Spaceship DNS and a public resolver. Keep this TXT record after verification. The custom domain, approved HTTPS certificate, HTTPS enforcement, and GitHub account 2FA are confirmed configured.

## Spaceship account and domain

On October 26, 2026, the account owner confirmed that Spaceship two-factor authentication is enabled and auto-renewal is on. These private settings were confirmed by the owner rather than independently inspected through account access. A public Verisign RDAP check independently confirmed `client transfer prohibited`, indicating an active transfer lock, and a registration expiration of October 23, 2029. Keep account recovery methods private.

## Optional full response headers while retaining GitHub Pages

The optional [Worker](cloudflare/security-headers.js), if activated in the future, adds HSTS, MIME-sniffing protection, anti-framing headers, an explicit referrer policy, and restrictions on unused browser features. It preserves origin response bodies, status codes, redirects, content types, media range responses, and existing CSP. It applies across the profile and Atlas paths without imposing the profile's script restrictions on the separate Atlas application. Activating this layer is not required for the selected hosting setup; the profile's tested HTML CSP and referrer policy are already deployed.

Future deployment requires a Cloudflare account and proxy configuration for this domain. Before changing nameservers, import and verify **every existing DNS record**, including email and verification records. DNSSEC was active in the public DS record on October 26, 2026, so any migration must coordinate DNSSEC changes as well. Keep the Spaceship registration and GitHub Pages custom-domain configuration. Do not change nameservers until this DNS comparison has been reviewed.

After the domain is active in Cloudflare, use Full (strict) TLS and proxy the GitHub Pages DNS records. Deploy this module as routes `piyushwanchoo.com/*` and `www.piyushwanchoo.com/*`. The Worker uses the normal route `fetch(request)` to reach the existing origin. Avoid a Custom Domain Worker configuration that replaces the GitHub Pages origin.

HSTS starts at one day, with no `includeSubDomains` or preload. After confirming the profile, Atlas, redirects, and any other relevant services work over HTTPS, increase the duration deliberately. Roll back the Worker route if functionality fails; preserve DNS and origin HTTPS throughout. An `_headers` file in a Pages artifact does not activate these controls.

References: [GitHub domain verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages), [Cloudflare header modification](https://developers.cloudflare.com/workers/examples/alter-headers/), [Worker routes](https://developers.cloudflare.com/workers/configuration/routing/routes/), [CSP frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors).
