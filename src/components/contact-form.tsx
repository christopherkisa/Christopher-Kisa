"use client";

import { useActionState, useMemo } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitContact, type ContactState } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initial: ContactState = { ok: false, message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initial);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const turnstileKey = useMemo(
    () => `${state.ok ? "ok" : "idle"}-${state.message.slice(0, 8)}`,
    [state.ok, state.message],
  );

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required />
      </div>

      {siteKey ? (
        <Turnstile
          key={turnstileKey}
          siteKey={siteKey}
          options={{ theme: "auto", size: "normal" }}
        />
      ) : null}

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending…" : "Send message"}
      </Button>

      {state.message ? (
        <p
          role="status"
          className={
            state.ok
              ? "text-sm font-medium text-accent"
              : "text-sm font-medium text-destructive"
          }
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
