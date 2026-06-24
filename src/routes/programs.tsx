import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PROGRAMS, type Program } from "@/lib/data";
import { Calendar, CheckCircle2, Wallet, GraduationCap, Briefcase, BookOpen } from "lucide-react";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs & Courses — SALBU Shadadkot" },
      { name: "description", content: "Explore undergraduate and postgraduate programs at SALBU Shadadkot: BS CS, BBA, BS English, MCS, MBA and more." },
      { property: "og:title", content: "Programs at SALBU Shadadkot" },
      { property: "og:description", content: "Detailed curriculum, eligibility, fees and career paths." },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  const undergrad = PROGRAMS.filter((p) => p.level === "Undergraduate");
  const postgrad = PROGRAMS.filter((p) => p.level === "Postgraduate");

  return (
    <SiteLayout>
      <PageHero eyebrow="Academics" title="Programs & Courses" subtitle="Choose from a rich portfolio of HEC-recognized programs designed for real-world impact." />
      <section className="section">
        <div className="container-narrow">
          <Tabs defaultValue="ug" className="w-full">
            <TabsList className="grid w-full sm:w-fit grid-cols-2 mb-8">
              <TabsTrigger value="ug">Undergraduate</TabsTrigger>
              <TabsTrigger value="pg">Postgraduate</TabsTrigger>
            </TabsList>
            <TabsContent value="ug" className="space-y-5">
              {undergrad.map((p) => <ProgramCard key={p.slug} p={p} />)}
            </TabsContent>
            <TabsContent value="pg" className="space-y-5">
              {postgrad.map((p) => <ProgramCard key={p.slug} p={p} />)}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </SiteLayout>
  );
}

function ProgramCard({ p }: { p: Program }) {
  return (
    <Card className="border-l-4 border-l-gold overflow-hidden">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <Badge variant="secondary" className="mb-2">{p.level}</Badge>
            <h3 className="text-xl md:text-2xl font-bold text-primary">{p.name}</h3>
          </div>
          <Badge className="bg-gold text-gold-foreground">{p.duration}</Badge>
        </div>
        <p className="text-muted-foreground mb-5">{p.description}</p>

        <div className="grid sm:grid-cols-3 gap-3 mb-5">
          <InfoChip icon={<Calendar className="h-4 w-4" />} label="Duration" value={p.duration} />
          <InfoChip icon={<CheckCircle2 className="h-4 w-4" />} label="Eligibility" value={p.eligibility} />
          <InfoChip icon={<Wallet className="h-4 w-4" />} label="Fee" value={p.fee} />
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="curr">
            <AccordionTrigger className="text-primary font-semibold">
              <span className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-gold" /> Curriculum highlights</span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                {p.curriculum.map((c) => (
                  <li key={c} className="flex gap-2"><span className="text-gold">▸</span>{c}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="career">
            <AccordionTrigger className="text-primary font-semibold">
              <span className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-gold" /> Career opportunities</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                {p.careers.map((c) => (
                  <Badge key={c} variant="outline" className="border-primary/30 text-primary">{c}</Badge>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

function InfoChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-muted/50 border">
      <div className="text-[11px] uppercase text-gold font-bold flex items-center gap-1">{icon}{label}</div>
      <div className="text-sm font-medium text-foreground mt-1">{value}</div>
    </div>
  );
}

// keep GraduationCap import used
void GraduationCap;
