"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Send, CheckCircle } from "lucide-react";
import GlowButton from "./GlowButton";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  businessType: string;
  service: string;
  package: string;
  budget: string;
  timeline: string;
  goal: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const services = [
  { value: "OpenClaw Setup & Support", label: "OpenClaw Setup & Support" },
  { value: "AI Automation Consulting", label: "AI Automation Consulting" },
  { value: "Cloud Infrastructure & DevOps", label: "Cloud Infrastructure & DevOps" },
  { value: "Custom Dashboards & BI", label: "Custom Dashboards" },
  { value: "Website Design & SEO", label: "Website Design & SEO" },
  { value: "Not sure yet", label: "Not sure yet" },
];

const packages = ["Starter", "Growth", "Enterprise / Custom", "Not sure yet"];

const budgetRanges = [
  "Under $500",
  "$500 - $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000+",
  "Need guidance",
];

const timelines = ["ASAP", "Within 2 weeks", "Within 1 month", "1-3 months", "Flexible"];

const businessTypes = [
  "Startup",
  "SMB / growing business",
  "Enterprise team",
  "Consultancy / agency",
  "E-commerce",
  "Non-profit",
  "Other",
];

const goals = [
  "Set up an AI helper (OpenClaw)",
  "Get more leads",
  "Build or redo a website",
  "Automate tasks with AI",
  "Improve cloud servers",
  "Track data with a dashboard",
  "Talk about what's best for me",
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    businessType: "",
    service: "",
    package: "",
    budget: "",
    timeline: "",
    goal: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.businessType) newErrors.businessType = "Please select a business type";
    if (!formData.package) newErrors.package = "Please select a package";
    if (!formData.budget) newErrors.budget = "Please select a budget";
    if (!formData.timeline) newErrors.timeline = "Please select a timeline";
    if (!formData.goal) newErrors.goal = "Please select a goal";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) {
        setSubmitError(json.error || "Something went wrong. Please try again.");
      } else {
        setIsSuccess(true);
      }
    } catch {
      setSubmitError("Network error. Please email admin@m3dsai.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-accent-primary/30 bg-accent-primary/5 p-12 text-center"
      >
        <CheckCircle className="w-14 h-14 text-accent-primary mx-auto mb-6" />
        <h3 className="font-display text-2xl font-bold text-text-primary mb-3">Message sent!</h3>
        <p className="text-text-secondary max-w-sm mx-auto">
          Thanks, {formData.name.split(" ")[0]}. Mehdi will reply to{" "}
          <span className="text-text-primary">{formData.email}</span> within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AnimatePresence>
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-red-400 text-sm"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            {submitError}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-text-secondary text-sm mb-2">Name *</label>
          <input
            id="name" type="text" name="name" value={formData.name} onChange={handleChange}
            className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors ${errors.name ? "border-red-500" : "border-border"}`}
            placeholder="John Doe"
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label htmlFor="email" className="block text-text-secondary text-sm mb-2">Email *</label>
          <input
            id="email" type="email" name="email" value={formData.email} onChange={handleChange}
            className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors ${errors.email ? "border-red-500" : "border-border"}`}
            placeholder="john@company.com"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-text-secondary text-sm mb-2">Phone *</label>
          <input
            id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange}
            className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors ${errors.phone ? "border-red-500" : "border-border"}`}
            placeholder="+65 9000 0000"
          />
          <AnimatePresence>
            {errors.phone && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label htmlFor="company" className="block text-text-secondary text-sm mb-2">Company</label>
          <input
            id="company" type="text" name="company" value={formData.company} onChange={handleChange}
            className="w-full bg-bg-card border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
            placeholder="Acme Inc."
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="website" className="block text-text-secondary text-sm mb-2">Website</label>
          <input
            id="website" type="url" name="website" value={formData.website} onChange={handleChange}
            className="w-full bg-bg-card border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label htmlFor="businessType" className="block text-text-secondary text-sm mb-2">Business Type *</label>
          <select
            id="businessType" name="businessType" value={formData.businessType} onChange={handleChange}
            className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors ${errors.businessType ? "border-red-500" : "border-border"}`}
          >
            <option value="">Select business type</option>
            {businessTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          <AnimatePresence>
            {errors.businessType && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.businessType}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="service" className="block text-text-secondary text-sm mb-2">Service Interest *</label>
          <select
            id="service" name="service" value={formData.service} onChange={handleChange}
            className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors ${errors.service ? "border-red-500" : "border-border"}`}
          >
            <option value="">Select a service</option>
            {services.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <AnimatePresence>
            {errors.service && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.service}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label htmlFor="package" className="block text-text-secondary text-sm mb-2">Preferred Package *</label>
          <select
            id="package" name="package" value={formData.package} onChange={handleChange}
            className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors ${errors.package ? "border-red-500" : "border-border"}`}
          >
            <option value="">Select package</option>
            {packages.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <AnimatePresence>
            {errors.package && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.package}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="budget" className="block text-text-secondary text-sm mb-2">Budget Range *</label>
          <select
            id="budget" name="budget" value={formData.budget} onChange={handleChange}
            className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors ${errors.budget ? "border-red-500" : "border-border"}`}
          >
            <option value="">Select budget</option>
            {budgetRanges.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <AnimatePresence>
            {errors.budget && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.budget}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label htmlFor="timeline" className="block text-text-secondary text-sm mb-2">Timeline *</label>
          <select
            id="timeline" name="timeline" value={formData.timeline} onChange={handleChange}
            className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors ${errors.timeline ? "border-red-500" : "border-border"}`}
          >
            <option value="">Select timeline</option>
            {timelines.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <AnimatePresence>
            {errors.timeline && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.timeline}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div>
        <label htmlFor="goal" className="block text-text-secondary text-sm mb-2">Main Goal *</label>
        <select
          id="goal" name="goal" value={formData.goal} onChange={handleChange}
          className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors ${errors.goal ? "border-red-500" : "border-border"}`}
        >
          <option value="">Select the main goal</option>
          {goals.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <AnimatePresence>
          {errors.goal && (
            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.goal}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label htmlFor="message" className="block text-text-secondary text-sm mb-2">Extra Notes</label>
        <textarea
          id="message" name="message" value={formData.message} onChange={handleChange}
          rows={5}
          className="w-full bg-bg-card border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors resize-none"
          placeholder="Anything else we should know?"
        />
      </div>

      <GlowButton type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
          />
        ) : (
          <>
            Send Message
            <Send className="w-4 h-4 ml-2" />
          </>
        )}
      </GlowButton>
    </form>
  );
}
