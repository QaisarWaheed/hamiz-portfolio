"use client";

import { useState } from "react";

export default function V2Contact() {
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
    <section id="contact" className="contact">
      <div className="v2-container">
        <h2 className="reveal">
          Have footage that <span className="italic">needs a home?</span>
        </h2>

        <div className="contact__alt reveal" id="about">
          <a href="mailto:hello@hamizkhan.com" className="contact__email">
            hello@hamizkhan.com
          </a>
          <p className="contact__alt-note">Include channel URL, rough scope, and timeline.</p>
        </div>

        <form className="contact__form reveal" onSubmit={(e) => void onSubmit(e)}>
          <p className="contact__form-kicker">Or send a note here</p>
          <div className="contact__form-grid">
            <div className="contact__field">
              <label htmlFor="v2-contact-name">Name</label>
              <input
                id="v2-contact-name"
                name="name"
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Your name"
              />
            </div>
            <div className="contact__field">
              <label htmlFor="v2-contact-email">Email</label>
              <input
                id="v2-contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="contact__field">
            <label htmlFor="v2-contact-requirements">Requirements</label>
            <textarea
              id="v2-contact-requirements"
              name="requirements"
              required
              rows={3}
              value={form.requirements}
              onChange={(e) => setForm((f) => ({ ...f, requirements: e.target.value }))}
              placeholder="Timeline, format, length, deliverables…"
            />
          </div>
          <div className="contact__field">
            <label htmlFor="v2-contact-references">References</label>
            <textarea
              id="v2-contact-references"
              name="references"
              rows={2}
              value={form.references}
              onChange={(e) => setForm((f) => ({ ...f, references: e.target.value }))}
              placeholder="Links to reference edits, channels, or style examples (optional)"
            />
          </div>
          <button type="submit" className="btn btn--primary contact__submit" disabled={state === "sending"}>
            {state === "sending" ? "Sending…" : "Send"}
          </button>
          {state === "ok" ? <p className="contact__form-status contact__form-status--ok">Thanks — I&apos;ll reply soon.</p> : null}
          {state === "err" ? (
            <p className="contact__form-status contact__form-status--err">Something went wrong. Please try again.</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
