/**
 * Placeholder for n8n webhook integration.
 * Replace N8N_WEBHOOK_URL with your actual n8n webhook URL when ready.
 */
export const N8N_WEBHOOK_URL = ""; // TODO: paste your n8n webhook URL here

export type ContactPayload = {
  name: string;
  email: string;
  service: string;
  message: string;
  lang: string;
  submittedAt: string;
};

export async function sendToWebhook(payload: ContactPayload): Promise<void> {
  if (!N8N_WEBHOOK_URL) {
    // No webhook configured yet — log for development.
    console.info("[ADSDO] n8n webhook not configured. Payload:", payload);
    return;
  }
  const res = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Webhook failed: ${res.status}`);
}