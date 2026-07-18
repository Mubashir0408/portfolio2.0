"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SITE_CONFIG } from "@/lib/constants";
import { fadeLeft, fadeRight, viewportOnce } from "@/lib/animations";
import { SectionHeading } from "@/components/section-heading";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormValues) {
  setStatus("submitting");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    setStatus("success");
    reset();

    setTimeout(() => setStatus("idle"), 4000);
  } catch (error) {
    console.error(error);
    setStatus("idle");
    alert("Something went wrong. Please try again.");
  }
}


  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="container-custom flex flex-col gap-14">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          description="Have a project in mind or an opportunity to discuss? My inbox is always open."
        />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeLeft}
            className="flex flex-col gap-6"
          >
            <div className="rounded-3xl border border-border bg-card/40 p-7">
              <h3 className="mb-5 text-lg font-semibold text-foreground">
                Contact Information
              </h3>
              <div className="flex flex-col gap-4">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="size-4" />
                  </span>
                  {SITE_CONFIG.email}
                </a>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex size-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <MapPin className="size-4" />
                  </span>
                  {SITE_CONFIG.location}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card/40 p-7">
              <h3 className="mb-5 text-lg font-semibold text-foreground">
                Connect with me
              </h3>
              <SocialLinks />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeRight}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="glass flex flex-col gap-5 rounded-3xl p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    aria-invalid={!!errors.name}
                    {...register("name")}
                  />
                  {errors.name ? (
                    <p className="text-xs text-destructive">{errors.name.message}</p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email ? (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Project inquiry"
                  aria-invalid={!!errors.subject}
                  {...register("subject")}
                />
                {errors.subject ? (
                  <p className="text-xs text-destructive">{errors.subject.message}</p>
                ) : null}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  aria-invalid={!!errors.message}
                  {...register("message")}
                />
                {errors.message ? (
                  <p className="text-xs text-destructive">{errors.message.message}</p>
                ) : null}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="mt-2"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="size-4" />
                    Message Sent
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
