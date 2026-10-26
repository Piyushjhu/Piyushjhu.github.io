// Optional edge layer for the existing GitHub Pages origin. Not deployed by Pages.
// Configure as Worker routes, not a replacement origin or a workers.dev website.
export function protectResponse(upstream, requestURL) {
  const response = new Response(upstream.body, upstream);
  if (new URL(requestURL).protocol === "https:") {
    // Start short. Increase after confirming HTTPS across all relevant pages.
    response.headers.set("Strict-Transport-Security", "max-age=86400");
  }
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
  // Preserve any origin CSP. Multiple policies are enforced together.
  response.headers.append("Content-Security-Policy", "frame-ancestors 'none'");
  return response;
}

export default {
  async fetch(request) {
    return protectResponse(await fetch(request), request.url);
  },
};
