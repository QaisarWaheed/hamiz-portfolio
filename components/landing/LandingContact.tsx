"use client";

import { useState } from "react";

export default function LandingContact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    requirements: "",
    references: "",
  });
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          requirements: form.requirements,
          references: form.references,
        }),
      });
      if (!res.ok) throw new Error("fail");
      setState("ok");
      setForm({ name: "", email: "", requirements: "", references: "" });
    } catch {
      setState("err");
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="mono kicker">03 — Let&apos;s work</div>
        <h2 className="display">
          Have footage that <em>needs a home?</em>
        </h2>
        <a
          href="/cdn-cgi/l/email-protection#d28981939f829e978fbab7bebebd92bab3bfbba8b9bab3bcfcb1bdbf"
          className="email"
        >
          [SAMPLE]{" "}
          <span className="__cf_email__" data-cfemail="b0d8d5dcdcdff0d8d1ddd9cadbd8d1de9ed3dfdd">
            [email&nbsp;protected]
          </span>
        </a>

        <form className="contact-form" onSubmit={(e) => void onSubmit(e)}>
          <div className="field">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Your name"
            />
          </div>
          <div className="field">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
            />
          </div>
          <div className="field">
            <label htmlFor="contact-requirements">Requirements</label>
            <textarea
              id="contact-requirements"
              name="requirements"
              required
              rows={5}
              value={form.requirements}
              onChange={(e) => setForm((f) => ({ ...f, requirements: e.target.value }))}
              placeholder="Timeline, format, length, deliverables…"
            />
          </div>
          <div className="field">
            <label htmlFor="contact-references">References</label>
            <textarea
              id="contact-references"
              name="references"
              rows={4}
              value={form.references}
              onChange={(e) => setForm((f) => ({ ...f, references: e.target.value }))}
              placeholder="Links to reference edits, channels, or style examples (optional)"
            />
          </div>
          <button type="submit" disabled={state === "sending"}>
            {state === "sending" ? "Sending…" : "Send"}
          </button>
          {state === "ok" ? <p className="form-ok">Thanks — I&apos;ll reply soon.</p> : null}
          {state === "err" ? (
            <p className="form-err">Something went wrong. Please try again.</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
