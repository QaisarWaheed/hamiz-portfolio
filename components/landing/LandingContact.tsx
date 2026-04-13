"use client";

import { useEffect, useState } from "react";

type About = {
  email: string;
};

const OFFERS = [
  "Short-Form",
  "Long-Form",
  "Monthly Retainer",
  "Custom offer",
] as const;

export default function LandingContact() {
  const [about, setAbout] = useState<About | null>(null);
  const [form, setForm] = useState<{
    name: string;
    email: string;
    offerInterest: string;
    message: string;
  }>({
    name: "",
    email: "",
    offerInterest: OFFERS[0] as string,
    message: "",
  });
  const [formState, setFormState] = useState<"idle" | "sending" | "ok" | "err">("idle");

  useEffect(() => {
    let c = false;
    (async () => {
      try {
        const res = await fetch("/api/about", { cache: "no-store" });
        const data = (await res.json()) as About;
        if (!c && res.ok) setAbout(data);
      } catch {
        if (!c) setAbout(null);
      }
    })();
    return () => {
      c = true;
    };
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          offerInterest: form.offerInterest,
        }),
      });
      if (!res.ok) throw new Error("fail");
      setFormState("ok");
      setForm({ name: "", email: "", offerInterest: OFFERS[0] as string, message: "" });
    } catch {
      setFormState("err");
    }
  }

  const mail = about?.email?.trim() || "hello@hamizkhan.com";

  return (
    <section className="ed-contact" id="contact">
      <div className="wrap">
        <div className="mono kicker">03 — Let&apos;s work</div>
        <h2 className="display">
          Have footage that <em>needs a home?</em>
        </h2>
        <a href={`mailto:${mail}`} className="email">
          {mail}
        </a>

        <form className="ed-form" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="inq-name">Name</label>
            <input
              id="inq-name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
          <div className="field">
            <label htmlFor="inq-email">Email</label>
            <input
              id="inq-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div className="field">
            <label htmlFor="inq-offer">Offer you&apos;re interested in</label>
            <select
              id="inq-offer"
              required
              value={form.offerInterest}
              onChange={(e) => setForm((f) => ({ ...f, offerInterest: e.target.value }))}
            >
              {OFFERS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="inq-msg">Message</label>
            <textarea
              id="inq-msg"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder="Brief, timeline, links…"
            />
          </div>
          <button type="submit" disabled={formState === "sending"}>
            {formState === "sending" ? "Sending…" : "Send"}
          </button>
          {formState === "ok" && (
            <p className="mt-4 text-center text-sm text-[var(--accent)]">Thanks — I’ll reply soon.</p>
          )}
          {formState === "err" && (
            <p className="mt-4 text-center text-sm text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
