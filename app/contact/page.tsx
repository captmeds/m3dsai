"use client";

import { MapPin, Mail, Phone, Clock } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import FadeUp from "@/components/animations/FadeUp";
import SectionLabel from "@/components/SectionLabel";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeUp>
              <SectionLabel text="Contact" className="mb-4" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
                Let's Start a{" "}
                <span className="gradient-text">Conversation</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Have a project in mind? We'd love to hear about it. Reach out and let's discuss how we can help your business grow.
              </p>
            </FadeUp>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeUp>
              <div>
                <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
                  Send us a message
                </h2>
                <ContactForm />
              </div>
            </FadeUp>

            {/* Contact Info */}
            <FadeUp delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
                    Contact Information
                  </h2>
                  <p className="text-text-secondary mb-8">
                    Prefer to reach out directly? Here's how you can get in touch with our team.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    { icon: Mail, label: "Email", value: "hello@m3dsai.com" },
                    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                    { icon: MapPin, label: "Address", value: "123 Tech Street, Suite 100\nSan Francisco, CA 94105" },
                    { icon: Clock, label: "Hours", value: "Mon - Fri: 9AM - 6PM PST\n24/7 Emergency Support" }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-accent-primary" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-text-primary mb-1">{item.label}</p>
                        <p className="text-text-secondary text-sm whitespace-pre-line">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calendar Embed Placeholder */}
                <div className="glass rounded-2xl p-6 mt-8">
                  <h3 className="font-display font-bold text-text-primary mb-4">
                    Book a Meeting
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    Schedule a free 30-minute strategy call with our team.
                  </p>
                  <div className="bg-bg-card rounded-xl p-8 text-center">
                    <p className="text-text-muted text-sm">
                      [Calendly Embed Placeholder]<br />
                      Add your Calendly link in production
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
