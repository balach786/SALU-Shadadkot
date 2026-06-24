import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap, BookOpen, Award, Users, FileText, CreditCard,
  CheckCircle2, Building2, Wallet, Briefcase, ArrowRight, Calendar,
  IdCard, ScanLine,
} from "lucide-react";
import heroImg from "@/assets/hero-campus.jpg";
import studentsImg from "@/assets/students.jpg";
import { PROGRAMS, NEWS } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shah Abdul Latif Bhattai University — Shadadkot Campus | Official" },
      { name: "description", content: "Official website of SALBU Shadadkot Campus. Admissions open 2026. Apply online for BS, BBA, MCS, MBA programs." },
      { property: "og:title", content: "SALBU Shadadkot Campus — Admissions Open 2026" },
      { property: "og:description", content: "Empowering Minds. Building Futures." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="University campus"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/80 to-primary-dark/50" />
        </div>
        <div className="relative container-narrow py-20 md:py-32 text-primary-foreground">
          <Badge className="bg-gold text-gold-foreground hover:bg-gold mb-5 uppercase tracking-wider">
            Admissions Open 2026
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold max-w-4xl text-balance leading-tight">
            Welcome to Shah Abdul Latif Bhattai University
            <span className="block text-gold mt-2">Shadadkot Campus</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl text-primary-foreground/90">
            Empowering Minds. Building Futures. A premier institution committed to academic
            excellence, research, and the holistic development of Sindh's next generation.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="btn-gold border-0 shadow-elegant">
              <Link to="/online-apply">Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white hover:text-primary">
              <Link to="/programs">Explore Programs</Link>
            </Button>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {[
              { n: "5,000+", l: "Students" },
              { n: "20+", l: "Programs" },
              { n: "150+", l: "Faculty" },
              { n: "30+", l: "Years Legacy" },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-gold pl-4">
                <div className="text-3xl font-bold font-display text-gold">{s.n}</div>
                <div className="text-xs uppercase tracking-wider text-white/80">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section bg-background">
        <div className="container-narrow grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-gold font-semibold mb-3">About SALBU Shadadkot</div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-5">
              A legacy of knowledge, rooted in the soil of Sindh.
            </h2>
            <p className="text-muted-foreground mb-4">
              Shah Abdul Latif Bhattai University — Shadadkot Campus stands as a beacon of higher
              education in upper Sindh. Inspired by the humanist vision of the great Sufi poet
              Shah Abdul Latif Bhittai, we cultivate critical thinkers, ethical leaders, and
              compassionate citizens.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <Stat icon={<GraduationCap className="h-6 w-6" />} label="Mission" text="Academic Excellence" />
              <Stat icon={<BookOpen className="h-6 w-6" />} label="Vision" text="Research-Driven" />
              <Stat icon={<Award className="h-6 w-6" />} label="Values" text="Integrity & Service" />
            </div>
            <Button asChild className="mt-8" variant="default">
              <Link to="/about">Learn more about us <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="relative">
            <img src={studentsImg} alt="Students at SALBU" width={1280} height={800} loading="lazy" className="rounded-2xl shadow-elegant" />
            <div className="absolute -bottom-6 -left-6 bg-gold text-gold-foreground rounded-xl p-5 shadow-elegant max-w-[200px] hidden md:block">
              <div className="text-3xl font-bold font-display">HEC</div>
              <div className="text-xs font-semibold">Recognized & Chartered</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="section bg-muted/40">
        <div className="container-narrow">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">Academic Offerings</div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Featured Programs</h2>
            </div>
            <Button asChild variant="outline"><Link to="/programs">View all programs</Link></Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.slice(0, 6).map((p) => (
              <Card key={p.slug} className="border-t-4 border-t-gold hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3">{p.level}</Badge>
                  <h3 className="text-xl font-bold text-primary mb-2">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{p.description}</p>
                  <ul className="text-sm space-y-2 mb-5">
                    <li className="flex gap-2"><Calendar className="h-4 w-4 text-gold mt-0.5" /><span><b>Duration:</b> {p.duration}</span></li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-gold mt-0.5" /><span><b>Eligibility:</b> {p.eligibility}</span></li>
                  </ul>
                  <Button asChild size="sm" variant="ghost" className="text-primary hover:text-primary">
                    <Link to="/programs">View details <ArrowRight className="ml-1 h-3 w-3" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSION CTA */}
      <section className="relative overflow-hidden text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, var(--gold) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative container-narrow py-16 md:py-20 grid md:grid-cols-[1fr_auto] items-center gap-8">
          <div>
            <Badge className="bg-gold text-gold-foreground mb-3">Admissions Open</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-3">Your future starts here.</h2>
            <p className="text-primary-foreground/85 text-lg max-w-xl">
              Submit your online application in minutes. Get an auto-generated admission card with QR verification.
            </p>
          </div>
          <Button asChild size="lg" className="btn-gold border-0 shadow-elegant">
            <Link to="/online-apply">Apply Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">How to Apply</div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Admission Process</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Five simple steps from application to confirmation.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { i: <FileText />, t: "Register", d: "Fill the online admission form" },
              { i: <IdCard />, t: "Submit Documents", d: "Upload CNIC, transcripts, photo" },
              { i: <ScanLine />, t: "Get Admission Card", d: "Auto-generated digital card with QR" },
              { i: <CreditCard />, t: "Pay Fee", d: "Submit fee challan with screenshot" },
              { i: <CheckCircle2 />, t: "Confirmation", d: "Receive offer letter via email" },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <Card className="h-full hover:shadow-elegant transition">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-4">
                      {step.i}
                    </div>
                    <div className="text-xs text-gold font-bold mb-1">STEP {idx + 1}</div>
                    <h3 className="font-bold text-primary mb-1">{step.t}</h3>
                    <p className="text-sm text-muted-foreground">{step.d}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="section bg-muted/40">
        <div className="container-narrow">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">Latest Updates</div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">News & Announcements</h2>
            </div>
            <Button asChild variant="outline"><Link to="/news">All news</Link></Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {NEWS.slice(0, 3).map((n) => (
              <Card key={n.title} className="overflow-hidden hover:shadow-elegant transition">
                <div className="aspect-video bg-gradient-to-br from-primary to-primary-dark relative">
                  <div className="absolute top-3 left-3"><Badge className="bg-gold text-gold-foreground">{n.category}</Badge></div>
                </div>
                <CardContent className="p-5">
                  <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(n.date).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                  <h3 className="font-bold text-primary mb-2">{n.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{n.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-widest text-gold font-semibold mb-2">Why Choose SALBU</div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Excellence in every dimension.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { i: <Users />, t: "Qualified Faculty", d: "PhDs and industry experts dedicated to your growth." },
              { i: <Building2 />, t: "Modern Campus", d: "State-of-the-art labs, library, hostels, and sports." },
              { i: <Wallet />, t: "Affordable Fees", d: "Quality education within reach of every Sindhi family." },
              { i: <Briefcase />, t: "Career Support", d: "Internships, placements and entrepreneurship mentoring." },
            ].map((f) => (
              <div key={f.t} className="text-center p-6 rounded-2xl bg-card border hover:border-gold transition">
                <div className="mx-auto h-14 w-14 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-4">
                  {f.i}
                </div>
                <h3 className="font-bold text-primary mb-2">{f.t}</h3>
                <p className="text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Stat({ icon, label, text }: { icon: React.ReactNode; label: string; text: string }) {
  return (
    <div className="p-3 rounded-lg bg-secondary">
      <div className="text-primary mb-1">{icon}</div>
      <div className="text-[10px] uppercase tracking-wider text-gold font-bold">{label}</div>
      <div className="text-sm font-semibold text-primary">{text}</div>
    </div>
  );
}
