export async function onRequestPost({ request, env }) {
  const RESEND_API_KEY = env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    return json({ error: "Email service not configured. Contact admin@m3dsai.com directly." }, 500);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  const required = ["name", "email", "phone", "service", "businessType", "package", "budget", "timeline", "goal"];
  for (const field of required) {
    if (!data[field]?.toString().trim()) {
      return json({ error: `Missing required field: ${field}` }, 400);
    }
  }

  const emailHtml = `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b">
  <div style="background:#030711;padding:28px 32px;border-radius:12px 12px 0 0">
    <h2 style="color:#38bdf8;margin:0;font-size:20px">New Contact Enquiry — M3DS AI</h2>
  </div>
  <div style="background:#07111f;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #1e3a5f">
    <table style="width:100%;border-collapse:collapse">
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Phone", data.phone)}
      ${row("Company", data.company || "—")}
      ${row("Website", data.website || "—")}
      ${row("Business Type", data.businessType)}
      ${row("Service Interest", data.service)}
      ${row("Package", data.package)}
      ${row("Budget", data.budget)}
      ${row("Timeline", data.timeline)}
      ${row("Main Goal", data.goal)}
      ${row("Notes", data.message || "—")}
    </table>
  </div>
  <p style="color:#64748b;font-size:12px;margin-top:16px;text-align:center">
    Sent from m3dsai.com/contact/ · Reply to: ${data.email}
  </p>
</div>`;

  const resendPayload = {
    from: "M3DS AI Contact <noreply@m3dsai.com>",
    to: ["admin@m3dsai.com"],
    reply_to: data.email,
    subject: `New Enquiry — ${data.name} · ${data.service} (${data.company || "no company"})`,
    html: emailHtml,
  };

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resendPayload),
  });

  if (!resendRes.ok) {
    const err = await resendRes.text();
    console.error("Resend error:", err);
    return json({ error: "Failed to send email. Please try again or contact admin@m3dsai.com directly." }, 500);
  }

  return json({ success: true });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://m3dsai.com",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

function row(label, value) {
  return `
    <tr style="border-bottom:1px solid #1e3a5f">
      <td style="padding:10px 0;color:#94a3b8;font-size:13px;width:38%;vertical-align:top">${label}</td>
      <td style="padding:10px 0;color:#e2e8f0;font-size:13px;vertical-align:top">${value}</td>
    </tr>`;
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
