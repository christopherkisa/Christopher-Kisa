"use server";

export type ContactState = {
  ok: boolean;
  message: string;
};

async function verifyTurnstile(token: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("TURNSTILE_SECRET_KEY is not set; skipping verification.");
    return process.env.NODE_ENV === "development";
  }
  if (!token) return false;
  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body, cache: "no-store" },
  );
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const token = formData.get("cf-turnstile-response");
  const tokenStr = typeof token === "string" ? token : null;

  if (!name || !email || !subject || !message) {
    return { ok: false, message: "Please fill in all required fields." };
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  const passed = await verifyTurnstile(tokenStr);
  if (!passed) {
    return {
      ok: false,
      message: "Security check failed. Please try again.",
    };
  }

  // Hook for Resend, Email Workers, or logging:
  // await fetch('https://api.resend.com/emails', { ... })

  return {
    ok: true,
    message:
      "Thank you — your message was received. You will hear back during office hours.",
  };
}
