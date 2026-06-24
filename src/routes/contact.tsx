import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, Mail, MapPin, Building2 } from "lucide-react";
import { useState } from "react";
import { SITE, APPS_SCRIPT_URL } from "@/lib/site";
import { FAQS } from "@/lib/data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SALBU Shadadkot" },
      { name: "description", content: "Get in touch with SALBU Shadadkot Campus. Address, phone, email, departments and FAQ." },
      { property: "og:title", content: "Contact SALBU Shadadkot" },
      { property: "og:description", content: "We are here to help. Reach out to admissions or general inquiries." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!APPS_SCRIPT_URL) {
      setStatus("err");
      return;
    }
    setStatus("sending");
    try {
      const fd = new FormData(e.currentTarget);
      fd.append("action", "contact");
      await fetch(APPS_SCRIPT_URL, { method: "POST", body: fd });
      setStatus("ok");
      e.currentTarget.reset();
    } catch {
      setStatus("err");
    }
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Contact" title="We'd love to hear from you." subtitle="Questions about admissions, programs or visiting the campus? Reach out below." />
      <section className="section">
        <div className="container-narrow grid lg:grid-cols-[1fr_1.2fr] gap-10">
          <div className="space-y-5">
            <Card><CardContent className="p-6 flex gap-4">
              <MapPin className="h-6 w-6 text-gold shrink-0" />
              <div><div className="font-bold text-primary mb-1">Campus Address</div><div className="text-sm text-muted-foreground">{SITE.address}</div></div>
            </CardContent></Card>
            <Card><CardContent className="p-6 flex gap-4">
              <Phone className="h-6 w-6 text-gold shrink-0" />
              <div>
                <div className="font-bold text-primary mb-1">Phone</div>
                <div className="text-sm text-muted-foreground"><a href={`tel:${SITE.phone}`}>{SITE.phone}</a></div>
                <div className="text-sm text-muted-foreground"><a href={`tel:${SITE.phone2}`}>{SITE.phone2}</a></div>
              </div>
            </CardContent></Card>
            <Card><CardContent className="p-6 flex gap-4">
              <Mail className="h-6 w-6 text-gold shrink-0" />
              <div>
                <div className="font-bold text-primary mb-1">Email</div>
                <div className="text-sm text-muted-foreground"><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
                <div className="text-sm text-muted-foreground"><a href={`mailto:${SITE.admissionEmail}`}>{SITE.admissionEmail}</a></div>
              </div>
            </CardContent></Card>
            <Card><CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3"><Building2 className="h-5 w-5 text-gold" /><div className="font-bold text-primary">Department Contacts</div></div>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li className="flex justify-between border-b pb-2"><span>Admissions Office</span><b>Ext. 101</b></li>
                <li className="flex justify-between border-b pb-2"><span>Examinations</span><b>Ext. 110</b></li>
                <li className="flex justify-between border-b pb-2"><span>Accounts / Fee</span><b>Ext. 120</b></li>
                <li className="flex justify-between border-b pb-2"><span>Hostel Office</span><b>Ext. 130</b></li>
                <li className="flex justify-between"><span>Registrar</span><b>Ext. 140</b></li>
              </ul>
            </CardContent></Card>
          </div>

          <div>
            <Card><CardContent className="p-7">
              <h2 className="text-xl font-bold text-primary mb-1">Send us a message</h2>
              <p className="text-sm text-muted-foreground mb-5">We'll get back to you within 2 working days.</p>
              <form className="space-y-4" onSubmit={onSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label>Full Name</Label><Input name="name" required maxLength={100} /></div>
                  <div><Label>Email</Label><Input name="email" type="email" required maxLength={120} /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label>Phone</Label><Input name="phone" maxLength={20} /></div>
                  <div><Label>Subject</Label><Input name="subject" required maxLength={120} /></div>
                </div>
                <div><Label>Message</Label><Textarea name="message" required rows={6} maxLength={1500} /></div>
                <Button type="submit" disabled={status === "sending"} className="btn-gold border-0 w-full sm:w-auto">
                  {status === "sending" ? "Sending..." : "Send Message"}
                </Button>
                {status === "ok" && <p className="text-sm text-success">✓ Message sent. Thank you.</p>}
                {status === "err" && <p className="text-sm text-destructive">Couldn't send. Please ensure the Apps Script URL is configured (see deployment guide), or email us directly.</p>}
              </form>
            </CardContent></Card>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-primary mb-3">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="w-full bg-card border rounded-lg">
                {FAQS.map((f, i) => (
                  <AccordionItem key={f.q} value={`f${i}`} className="px-5">
                    <AccordionTrigger className="text-left text-primary font-semibold">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        <div className="container-narrow mt-12">
          <div className="rounded-2xl overflow-hidden border shadow-card aspect-[16/7]">
            <iframe
              title="SALBU Shadadkot Campus Map"
              src="https://www.google.com/maps?q=Shadadkot,Sindh,Pakistan&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
