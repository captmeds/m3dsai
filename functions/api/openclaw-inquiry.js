/**
 * Cloudflare Pages Function — POST /api/openclaw-inquiry
 *
 * Requires env var: RESEND_API_KEY
 * Set in: Cloudflare Pages → Settings → Environment Variables
 *
 * Resend setup (free tier covers 3,000 emails/month):
 *   1. Sign up at https://resend.com
 *   2. Add & verify domain: m3dsai.com
 *   3. Create API key → paste as RESEND_API_KEY in Cloudflare Pages env vars
 */

export async function onRequestPost({ request, env }) {
  const RESEND_API_KEY = env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    return json(
      { error: "Email service not configured. Contact admin@m3dsai.com directly." },
      500
    );
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  const required = [
    "name", "email", "phone", "country",
    "platforms", "users", "useCase",
    "timeline", "budget", "description",
  ];
  for (const field of required) {
    if (!data[field]?.toString().trim()) {
      return json({ error: `Missing required field: ${field}` }, 400);
    }
  }

  const emailHtml = buildEmail(data);

  let resendResponse;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "OpenClaw Enquiry <noreply@m3dsai.com>",
        to: ["admin@m3dsai.com"],
        reply_to: data.email,
        subject: `🤖 New OpenClaw Enquiry — ${data.name}${data.company ? ` · ${data.company}` : ""} (${data.country})`,
        html: emailHtml,
      }),
    });
  } catch (err) {
    console.error("Resend fetch error:", err);
    return json({ error: "Network error sending email. Please contact admin@m3dsai.com." }, 500);
  }

  if (!resendResponse.ok) {
    const errText = await resendResponse.text();
    console.error("Resend API error:", resendResponse.status, errText);
    return json({ error: "Failed to send enquiry. Please email admin@m3dsai.com directly." }, 500);
  }

  return json({ success: true });
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function row(label, value) {
  if (!value || !String(value).trim()) return "";
  const escaped = String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
  return `
    <tr>
      <td style="padding:10px 16px;background:#f0f7ff;font-weight:600;font-size:13px;color:#1e3a5f;width:38%;vertical-align:top;border-bottom:1px solid #dbeafe;white-space:nowrap;">${label}</td>
      <td style="padding:10px 16px;font-size:13px;color:#1f2937;vertical-align:top;border-bottom:1px solid #dbeafe;">${escaped}</td>
    </tr>`;
}

function buildEmail(d) {
  const ts = new Date().toLocaleString("en-SG", {
    timeZone: "Asia/Singapore",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New OpenClaw Enquiry</title>
</head>
<body style="margin:0;padding:24px;background:#f0f4f8;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:640px;margin:0 auto;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0369a1 0%,#0891b2 100%);border-radius:10px 10px 0 0;padding:28px 32px;">
      <div style="font-size:32px;margin-bottom:8px;">&#x1F916;</div>
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">New OpenClaw Enquiry</h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:13px;">${ts} (Singapore Time)</p>
    </div>

    <!-- Body -->
    <div style="background:#ffffff;border-radius:0 0 10px 10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
      <table style="width:100%;border-collapse:collapse;">
        ${row("Name", d.name)}
        ${row("Email", `<a href="mailto:${d.email}" style="color:#0369a1;text-decoration:none;">${d.email}</a>`)}
        ${row("WhatsApp / Phone", d.phone)}
        ${row("Company", d.company)}
        ${row("Country", d.country)}
        ${row("How they found us", d.source)}
        ${row("Messaging platforms", d.platforms)}
        ${row("Number of users", d.users)}
        ${row("Primary use case", d.useCase)}
        ${row("Hosting preference", d.hosting)}
        ${row("AI model preference", d.model)}
        ${row("Setup timeline", d.timeline)}
        ${row("Budget range", d.budget)}
        ${row("Tools to integrate", d.tools)}
        ${row("What OpenClaw should do", d.description)}
        ${row("Additional notes", d.notes)}
      </table>

      <!-- CTA -->
      <div style="padding:24px 32px;border-top:2px solid #dbeafe;background:#f8fbff;">
        <p style="margin:0 0 16px;font-size:14px;color:#374151;">Reply directly to this enquiry:</p>
        <a
          href="mailto:${d.email}?subject=Re%3A%20Your%20OpenClaw%20Enquiry%20%E2%80%94%20M3DS%20AI"
          style="display:inline-block;background:#0369a1;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:13px;font-weight:600;letter-spacing:0.2px;"
        >
          Reply to ${d.name} &rarr;
        </a>
      </div>
    </div>

    <!-- Footer -->
    <p style="text-align:center;color:#9ca3af;font-size:11px;margin-top:16px;line-height:1.6;">
      Sent from <a href="https://m3dsai.com/services/openclaw/" style="color:#9ca3af;">m3dsai.com/services/openclaw/</a><br>
      M3DS AI OpenClaw Enquiry System
    </p>
  </div>
</body>
</html>`;
}
