"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Send } from "lucide-react";
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

const whatsappNumber = "17474440033";

const services = [
  { value: "Website Design", label: "Website Design" },
  { value: "AI Services", label: "AI Services" },
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "Custom Dashboards", label: "Custom Dashboards" },
  { value: "Security Consulting", label: "Security Consulting" },
  { value: "Not sure yet", label: "Not sure yet" }
];

const packages = [
  "Starter",
  "Growth",
  "Enterprise / Custom",
  "Not sure yet"
];

const budgetRanges = [
  "Under $500",
  "$500 - $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000+",
  "Need guidance"
];

const timelines = [
  "ASAP",
  "Within 2 weeks",
  "Within 1 month",
  "1-3 months",
  "Flexible"
];

const businessTypes = [
  "Startup",
  "SMB / growing business",
  "Enterprise team",
  "Consultancy / agency",
  "E-commerce",
  "Non-profit",
  "Other"
];

const goals = [
  "Generate more qualified leads",
  "Launch or redesign a website",
  "Automate repetitive work with AI",
  "Improve marketing performance",
  "Track KPIs with a dashboard",
  "Improve security and resilience",
  "Discuss the best option"
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
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "WhatsApp or phone is required";
    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.businessType) newErrors.businessType = "Please select a business type";
    if (!formData.package) newErrors.package = "Please select a package";
    if (!formData.budget) newErrors.budget = "Please select a budget";
    if (!formData.timeline) newErrors.timeline = "Please select a timeline";
    if (!formData.goal) newErrors.goal = "Please select a goal";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      "Hi M3DS AI, I would like to discuss a project.",
      "",
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `WhatsApp / Phone: ${formData.phone}`,
      `Company: ${formData.company || "Not provided"}`,
      `Website: ${formData.website || "Not provided"}`,
      `Business type: ${formData.businessType}`,
      `Service interest: ${formData.service}`,
      `Preferred package: ${formData.package}`,
      `Budget range: ${formData.budget}`,
      `Timeline: ${formData.timeline}`,
      `Main goal: ${formData.goal}`,
      "",
      `Notes: ${formData.message || "No extra notes"}`
    ];

    return lines.join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildWhatsAppMessage())}`;
    window.location.href = whatsappUrl;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-text-secondary text-sm mb-2">Name *</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors ${
              errors.name ? 'border-red-500' : 'border-border'
            }`}
            placeholder="John Doe"
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-xs mt-1 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label htmlFor="email" className="block text-text-secondary text-sm mb-2">Email *</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors ${
              errors.email ? 'border-red-500' : 'border-border'
            }`}
            placeholder="john@company.com"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-xs mt-1 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-text-secondary text-sm mb-2">WhatsApp / Phone *</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors ${
              errors.phone ? 'border-red-500' : 'border-border'
            }`}
            placeholder="+65 9000 0000"
          />
          <AnimatePresence>
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-xs mt-1 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label htmlFor="company" className="block text-text-secondary text-sm mb-2">Company</label>
          <input
            id="company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full bg-bg-card border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
            placeholder="Acme Inc."
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="website" className="block text-text-secondary text-sm mb-2">Website</label>
          <input
            id="website"
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full bg-bg-card border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label htmlFor="businessType" className="block text-text-secondary text-sm mb-2">Business Type *</label>
          <select
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors ${
              errors.businessType ? 'border-red-500' : 'border-border'
            }`}
          >
            <option value="">Select business type</option>
            {businessTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <AnimatePresence>
            {errors.businessType && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-xs mt-1 flex items-center gap-1"
              >
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
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors ${
              errors.service ? 'border-red-500' : 'border-border'
            }`}
          >
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service.value} value={service.value}>{service.label}</option>
            ))}
          </select>
          <AnimatePresence>
            {errors.service && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-xs mt-1 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" /> {errors.service}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label htmlFor="package" className="block text-text-secondary text-sm mb-2">Preferred Package *</label>
          <select
            id="package"
            name="package"
            value={formData.package}
            onChange={handleChange}
            className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors ${
              errors.package ? 'border-red-500' : 'border-border'
            }`}
          >
            <option value="">Select package</option>
            {packages.map(packageName => (
              <option key={packageName} value={packageName}>{packageName}</option>
            ))}
          </select>
          <AnimatePresence>
            {errors.package && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-xs mt-1 flex items-center gap-1"
              >
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
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors ${
              errors.budget ? 'border-red-500' : 'border-border'
            }`}
          >
            <option value="">Select budget</option>
            {budgetRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
          <AnimatePresence>
            {errors.budget && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-xs mt-1 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" /> {errors.budget}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label htmlFor="timeline" className="block text-text-secondary text-sm mb-2">Timeline *</label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors ${
              errors.timeline ? 'border-red-500' : 'border-border'
            }`}
          >
            <option value="">Select timeline</option>
            {timelines.map(timeline => (
              <option key={timeline} value={timeline}>{timeline}</option>
            ))}
          </select>
          <AnimatePresence>
            {errors.timeline && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-xs mt-1 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" /> {errors.timeline}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div>
        <label htmlFor="goal" className="block text-text-secondary text-sm mb-2">Main Goal *</label>
        <select
          id="goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary transition-colors ${
            errors.goal ? 'border-red-500' : 'border-border'
          }`}
        >
          <option value="">Select the main goal</option>
          {goals.map(goal => (
            <option key={goal} value={goal}>{goal}</option>
          ))}
        </select>
        <AnimatePresence>
          {errors.goal && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-400 text-xs mt-1 flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" /> {errors.goal}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label htmlFor="message" className="block text-text-secondary text-sm mb-2">Extra Notes</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full bg-bg-card border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary transition-colors resize-none"
          placeholder="Anything else we should know?"
        />
      </div>

      <GlowButton
        type="submit"
        variant="primary"
        className="w-full"
      >
        {isSubmitting ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
          />
        ) : (
          <>
            Send via WhatsApp
            <Send className="w-4 h-4 ml-2" />
          </>
        )}
      </GlowButton>
    </form>
  );
}
