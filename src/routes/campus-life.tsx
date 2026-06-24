import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Music2, Dumbbell, BookHeart, Utensils, Bus, Tent } from "lucide-react";

export const Route = createFileRoute("/campus-life")({
  head: () => ({
    meta: [
      { title: "Campus Life — SALBU Shadadkot" },
      { name: "description", content: "Student societies, sports, hostels, events and the vibrant campus experience at SALBU Shadadkot." },
      { property: "og:title", content: "Campus Life at SALBU Shadadkot" },
      { property: "og:description", content: "A community where students learn, grow and thrive." },
    ],
  }),
  component: CampusLifePage,
});

function CampusLifePage() {
  const items = [
    { i: <Users />, t: "Student Societies", d: "Literary, Sindhi Adabi, IEEE Student Branch, Debate Society and more." },
    { i: <Dumbbell />, t: "Sports", d: "Cricket, football, hockey, badminton, table tennis and an annual sports gala." },
    { i: <Music2 />, t: "Cultural Events", d: "Sufi nights, Sindhi cultural week, mushaira and art exhibitions." },
    { i: <Trophy />, t: "Competitions", d: "Hackathons, business plan contests and inter-campus quiz championships." },
    { i: <BookHeart />, t: "Community Service", d: "Blood donation drives, literacy programs and rural outreach." },
    { i: <Utensils />, t: "Dining & Cafés", d: "Affordable meals at the central cafeteria and faculty café." },
    { i: <Bus />, t: "Transport", d: "Campus shuttle service from key locations in Shadadkot and nearby towns." },
    { i: <Tent />, t: "Hostels", d: "Separate, secure hostels for male and female students with WiFi and study rooms." },
  ];
  return (
    <SiteLayout>
      <PageHero eyebrow="Campus Life" title="More than a degree — a way of life." subtitle="Discover the people, spaces and experiences that make SALBU unforgettable." />
      <section className="section">
        <div className="container-narrow grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => (
            <Card key={it.t} className="hover:shadow-elegant transition border-t-4 border-t-gold">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">{it.i}</div>
                <h3 className="font-bold text-primary mb-1">{it.t}</h3>
                <p className="text-sm text-muted-foreground">{it.d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
