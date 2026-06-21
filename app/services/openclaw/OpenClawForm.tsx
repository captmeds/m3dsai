"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Send, CheckCircle, Loader2 } from "lucide-react";
import GlowButton from "@/components/GlowButton";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  source: string;
  platforms: string;
  users: string;
  useCase: string;
  hosting: string;
  model: string;
  timeline: string;
  budget: string;
  tools: string;
  description: string;
  notes: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const INITIAL: FormData = {
  name: "", email: "", phone: "", company: "",
  country: "", source: "", platforms: "", users: "",
  useCase: "", hosting: "", model: "", timeline: "",
  budget: "", tools: "", description: "", notes: "",
};

const COUNTRIES = ["Singapore", "Malaysia", "Indonesia", "Philippines", "Thailand", "Vietnam", "Other"];
const SOURCES = ["Google Search", "LinkedIn", "Referral", "SSW / OpenClaw website", "Social media", "Other"];
const PLATFORMS = ["WhatsApp", "Telegram", "Slack", "Discord", "Signal", "Multiple platforms", "Not sure yet"];
const USERS = ["Just me", "2–5 people", "6–20 people", "20–100 people", "100+ (enterprise)"];
const USE_CASES = [
  "Personal productivity assistant",
  "Business process automation",
  "Team workflow coordination",
  "Customer support automation",
  "Research & summarisation",
  "Calendar & email management",
  "Other",
];
const HOSTING = [
  "M3DS AI managed cloud (recommended)",
  "My own VPS / cloud server",
  "On-premises server",
  "Not sure — recommend me",
];
const MODELS = [
  "Claude (Anthropic) — recommended",
  "GPT-4 (OpenAI)",
  "Open source model",
  "Not sure — recommend me",
];
const TIMELINES = ["ASAP — within 1 week", "Within 1 month", "1–3 months", "Just exploring for now"];
const BUDGETS = ["Under $500", "$500 – $1,500", "$1,500 – $3,000", "$3,000+", "Discuss pricing"];

const REQUIRED: (keyof FormData)[] = [
  "name", "email", "phone", "country", "platforms",
  "users", "useCase", "timeline", "budget", "description",
];

export default function OpenClawForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    for (const field of REQUIRED) {
      if (!form[field].trim()) errs[field] = "Required";
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/openclaw-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center py-14 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-accent-primary" />
        </div>
        <h3 className="font-display text-xl font-bold text-text-primary">Enquiry Received!</h3>
        <p className="text-text-secondary text-sm max-w-sm leading-relaxed">
          We&apos;ll review your requirements and respond within 24 hours with a detailed proposal and suggested discovery call times.
        </p>
        <button
          onClick={() => { setStatus("idle"); setForm(INITIAL); }}
          className="text-accent-primary text-sm hover:underline mt-2"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  const inputCls = (field: keyof FormData) =>
    `w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors text-sm ${
      errors[field] ? "border-red-500/70" : "border-border"
    }`;

  const FieldError = ({ field }: { field: keyof FormData }) =>
    errors[field] ? (
      <AnimatePresence>
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-red-400 text-xs mt-1 flex items-center gap-1"
        >
          <AlertCircle className="w-3 h-3" /> {errors[field]}
        </motion.p>
      </AnimatePresence>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      {/* Row 1: Name + Email */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-text-secondary text-xs mb-1.5 font-medium">
            Full Name <span className="text-accent-primary">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className={inputCls("name")}
            placeholder="Jane Smith"
          />
          <FieldError field="name" />
        </div>
        <div>
          <label className="block text-text-secondary text-xs mb-1.5 font-medium">
            Email <span className="text-accent-primary">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputCls("email")}
            placeholder="jane@company.com"
          />
          <FieldError field="email" />
        </div>
      </div>

      {/* Row 2: Phone + Company */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-text-secondary text-xs mb-1.5 font-medium">
            WhatsApp / Phone <span className="text-accent-primary">*</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={inputCls("phone")}
            placeholder="+65 9000 0000"
          />
          <FieldError field="phone" />
        </div>
        <div>
          <label className="block text-text-secondary text-xs mb-1.5 font-medium">Company Name</label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            className={inputCls("company")}
            placeholder="Acme Pte Ltd"
          />
        </div>
      </div>

      {/* Row 3: Country + Source */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-text-secondary text-xs mb-1.5 font-medium">
            Country <span className="text-accent-primary">*</span>
          </label>
          <select
            value={form.country}
            onChange={(e) => set("country", e.target.value)}
            className={inputCls("country")}
          >
            <option value="">Select country</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <FieldError field="country" />
        </div>
        <div>
          <label className="block text-text-secondary text-xs mb-1.5 font-medium">How did you find us?</label>
          <select
            value={form.source}
            onChange={(e) => set("source", e.target.value)}
            className={inputCls("source")}
          >
            <option value="">Select source</option>
            {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Row 4: Platforms + Users */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-text-secondary text-xs mb-1.5 font-medium">
            Messaging platform(s) <span className="text-accent-primary">*</span>
          </label>
          <select
            value={form.platforms}
            onChange={(e) => set("platforms", e.target.value)}
            className={inputCls("platforms")}
          >
            <option value="">Select platform</option>
            {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <FieldError field="platforms" />
        </div>
        <div>
          <label className="block text-text-secondary text-xs mb-1.5 font-medium">
            Number of users <span className="text-accent-primary">*</span>
          </label>
          <select
            value={form.users}
            onChange={(e) => set("users", e.target.value)}
            className={inputCls("users")}
          >
            <option value="">Select team size</option>
            {USERS.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
          <FieldError field="users" />
        </div>
      </div>

      {/* Use Case */}
      <div>
        <label className="block text-text-secondary text-xs mb-1.5 font-medium">
          Primary use case <span className="text-accent-primary">*</span>
        </label>
        <select
          value={form.useCase}
          onChange={(e) => set("useCase", e.target.value)}
          className={inputCls("useCase")}
        >
          <option value="">Select primary use case</option>
          {USE_CASES.map((u) => <option key={u} value={u}>{u}</option>)}
        </select>
        <FieldError field="useCase" />
      </div>

      {/* Row 5: Hosting + Model */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-text-secondary text-xs mb-1.5 font-medium">Hosting preference</label>
          <select
            value={form.hosting}
            onChange={(e) => set("hosting", e.target.value)}
            className={inputCls("hosting")}
          >
            <option value="">Select hosting</option>
            {HOSTING.map((h) => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-text-secondary text-xs mb-1.5 font-medium">Preferred AI model</label>
          <select
            value={form.model}
            onChange={(e) => set("model", e.target.value)}
            className={inputCls("model")}
          >
            <option value="">Select AI model</option>
            {MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      {/* Row 6: Timeline + Budget */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-text-secondary text-xs mb-1.5 font-medium">
            Setup timeline <span className="text-accent-primary">*</span>
          </label>
          <select
            value={form.timeline}
            onChange={(e) => set("timeline", e.target.value)}
            className={inputCls("timeline")}
          >
            <option value="">Select timeline</option>
            {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <FieldError field="timeline" />
        </div>
        <div>
          <label className="block text-text-secondary text-xs mb-1.5 font-medium">
            Budget range <span className="text-accent-primary">*</span>
          </label>
          <select
            value={form.budget}
            onChange={(e) => set("budget", e.target.value)}
            className={inputCls("budget")}
          >
            <option value="">Select budget</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <FieldError field="budget" />
        </div>
      </div>

      {/* Tools */}
      <div>
        <label className="block text-text-secondary text-xs mb-1.5 font-medium">Tools &amp; apps to integrate</label>
        <textarea
          value={form.tools}
          onChange={(e) => set("tools", e.target.value)}
          rows={2}
          className={`${inputCls("tools")} resize-none`}
          placeholder="e.g. Gmail, Google Calendar, Notion, Slack, Linear, Airtable, HubSpot..."
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-text-secondary text-xs mb-1.5 font-medium">
          What do you want OpenClaw to do for you? <span className="text-accent-primary">*</span>
        </label>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={4}
          className={`${inputCls("description")} resize-none`}
          placeholder="Describe your main use cases, workflows you want to automate, or problems you're solving..."
        />
        <FieldError field="description" />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-text-secondary text-xs mb-1.5 font-medium">Anything else we should know?</label>
        <textarea
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={2}
          className={`${inputCls("notes")} resize-none`}
          placeholder="Security constraints, existing infrastructure, compliance requirements..."
        />
      </div>

      {/* Error banner */}
      {status === "error" && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/8 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Something went wrong. Email us directly at{" "}
          <a href="mailto:admin@m3dsai.com" className="underline">admin@m3dsai.com</a>
        </div>
      )}

      <GlowButton type="submit" variant="primary" className="w-full justify-center">
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending Enquiry...
          </>
        ) : (
          <>
            Send OpenClaw Enquiry
            <Send className="w-4 h-4 ml-2" />
          </>
        )}
      </GlowButton>

      <p className="text-text-muted text-xs text-center">
        We respond within 24 hours · No commitment required · All enquiries treated confidentially
      </p>
    </form>
  );
}
