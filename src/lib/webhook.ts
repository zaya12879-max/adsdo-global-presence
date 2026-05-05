/**
 * Form submission endpoints.
 * - N8N_WEBHOOK_URL: paste your n8n webhook URL when ready.
 * - FORMSPREE_ENDPOINT: paste your Formspree form endpoint (e.g. https://formspree.io/f/xxxxxx)
 *   The form will POST to whichever is configured (n8n takes priority).
 */
export const N8N_WEBHOOK_URL = ""; // TODO: paste your n8n webhook URL here
export const FORMSPREE_ENDPOINT = ""; // TODO: paste your Formspree endpoint here

export type ContactPayload = {
  name: string;
  email: string;
  service: string;
  message: string;
  lang: string;
  submittedAt: string;
};

export async function sendToWebhook(payload: ContactPayload): Promise<void> {
  const endpoint = N8N_WEBHOOK_URL || FORMSPREE_ENDPOINT;
  if (!endpoint) {
    // No endpoint configured yet — simulate success for development.
    console.info("[ADSDO] No submission endpoint configured. Payload:", payload);
    await new Promise((r) => setTimeout(r, 600));
    return;
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Submission failed: ${res.status}`);
}