import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { NEWS } from "@/lib/data";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events — SALBU Shadadkot" },
      { name: "description", content: "Latest news, announcements and events from SALBU Shadadkot Campus." },
      { property: "og:title", content: "News & Events" },
      { property: "og:description", content: "Stay up to date with what's happening on campus." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Newsroom" title="News & Events" subtitle="Stay informed about what's happening on and around campus." />
      <section className="section">
        <div className="container-narrow grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEWS.map((n) => (
            <Card key={n.title} className="overflow-hidden hover:shadow-elegant transition">
              <div className="aspect-video bg-gradient-to-br from-primary to-primary-dark relative">
                <div className="absolute top-3 left-3"><Badge className="bg-gold text-gold-foreground">{n.category}</Badge></div>
              </div>
              <CardContent className="p-5">
                <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(n.date).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}
                </div>
                <h3 className="font-bold text-primary mb-2">{n.title}</h3>
                <p className="text-sm text-muted-foreground">{n.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
