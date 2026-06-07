const REALM = "M3DSAI Billing Platform";
const DEFAULT_USERNAME = "meds";

function unauthorized() {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
      "Cache-Control": "no-store",
    },
  });
}

function decodeBasicAuth(value) {
  if (!value?.startsWith("Basic ")) {
    return null;
  }

  try {
    const decoded = atob(value.slice("Basic ".length));
    const separator = decoded.indexOf(":");

    if (separator === -1) {
      return null;
    }

    return {
      username: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

export async function onRequest({ request, env, next }) {
  const expectedPassword = env.BILLING_PLATFORM_PASSWORD;

  if (!expectedPassword) {
    return new Response("Billing platform password is not configured.", {
      status: 503,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  const credentials = decodeBasicAuth(request.headers.get("Authorization"));
  const expectedUsername = env.BILLING_PLATFORM_USERNAME || DEFAULT_USERNAME;

  if (
    credentials?.username !== expectedUsername ||
    credentials.password !== expectedPassword
  ) {
    return unauthorized();
  }

  const response = await next();
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "no-store");
  headers.set("X-Robots-Tag", "noindex");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
