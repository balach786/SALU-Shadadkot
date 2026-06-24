import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FlaskConical, Brain, BookOpen, Globe2, Microscope, FileSearch } from "lucide-react";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — SALBU Shadadkot" },
      { name: "description", content: "Research centers, publications and academic collaborations at SALBU Shadadkot." },
      { property: "og:title", content: "Research at SALBU Shadadkot" },
      { property: "og:description", content: "Driving discovery and scholarship across Sindh and beyond." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const centers = [
    { i: <Brain />, t: "AI & Data Science Lab", d: "Applied research in machine learning, NLP, and computer vision." },
    { i: <Microscope />, t: "Sindh Studies Center", d: "Cultural, linguistic and historical scholarship on Sindh." },
    { i: <FlaskConical />, t: "Agricultural Innovation", d: "Sustainable farming, water management and food security." },
    { i: <Globe2 />, t: "Climate & Environment", d: "Regional climate impact, biodiversity and conservation." },
  ];
  return (
    <SiteLayout>
      <PageHero eyebrow="Research" title="Knowledge created here, for the world." subtitle="Our faculty and students drive research that matters — locally and globally." />
      <section className="section">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold text-primary mb-6">Research Centers</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {centers.map((c) => (
              <Card key={c.t} className="hover:shadow-elegant transition">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-3">{c.i}</div>
                  <h3 className="font-bold text-primary text-lg mb-1">{c.t}</h3>
                  <p className="text-muted-foreground text-sm">{c.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-muted/40">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold text-primary mb-6">Recent Publications</h2>
          <div className="space-y-4">
            {[
              { t: "Deep Learning Approaches for Sindhi Text Classification", a: "Dr. S. Memon, Dr. A. Channa", j: "Journal of NLP Research, 2026", tag: "AI" },
              { t: "Water Stress Modeling in the Indus Basin", a: "Dr. R. Soomro et al.", j: "Climate & Society, 2025", tag: "Climate" },
              { t: "Heritage Preservation in Upper Sindh", a: "Dr. N. Mahar", j: "South Asian Studies, 2025", tag: "Culture" },
              { t: "Microfinance and Rural Entrepreneurship", a: "Dr. F. Khoso", j: "Business Review of Pakistan, 2024", tag: "Business" },
            ].map((p) => (
              <Card key={p.t}>
                <CardContent className="p-5 flex flex-wrap items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <FileSearch className="h-5 w-5 text-gold shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-primary">{p.t}</div>
                      <div className="text-sm text-muted-foreground">{p.a}</div>
                      <div className="text-xs text-muted-foreground italic mt-1">{p.j}</div>
                    </div>
                  </div>
                  <Badge variant="secondary">{p.tag}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow text-center max-w-3xl mx-auto">
          <BookOpen className="h-10 w-10 text-gold mx-auto mb-3" />
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">Collaborate with us</h2>
          <p className="text-muted-foreground">We welcome partnerships with industry, government, and other academic institutions. For collaboration inquiries, reach out to our Office of Research, Innovation and Commercialization.</p>
        </div>
      </section>
    </SiteLayout>
  );
}
