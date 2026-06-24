import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Target, Eye, Heart, ShieldCheck, Building2, Wifi, BookMarked, Trophy } from "lucide-react";
import directorImg from "@/assets/director.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SALBU Shadadkot Campus" },
      { name: "description", content: "History, mission, vision, governance and accreditation of Shah Abdul Latif Bhattai University, Shadadkot Campus." },
      { property: "og:title", content: "About SALBU Shadadkot" },
      { property: "og:description", content: "Our story, mission and the leadership shaping the future of higher education in Sindh." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <PageHero eyebrow="About Us" title="A heritage of learning, a future of impact." subtitle="Discover the story, leadership and values of SALBU Shadadkot Campus." />

      <section className="section">
        <div className="container-narrow grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-primary mb-4">Our History</h2>
            <p className="text-muted-foreground mb-4">
              Established as a constituent campus of Shah Abdul Latif Bhattai University, the Shadadkot
              Campus emerged from a vision to bring quality higher education to the heart of upper Sindh.
              Since its inception, the campus has grown into a comprehensive institution offering programs
              across computing, business, humanities and sciences.
            </p>
            <p className="text-muted-foreground mb-8">
              Inspired by the universalist spirit of Shah Abdul Latif Bhittai, the campus continues to be
              a place where diverse minds gather, where knowledge meets compassion, and where every
              graduate carries forward a tradition of service and excellence.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { i: <Target />, t: "Mission", d: "Provide world-class education accessible to all, grounded in research and ethics." },
                { i: <Eye />, t: "Vision", d: "To be Sindh's leading regional university recognized for academic excellence." },
                { i: <Heart />, t: "Values", d: "Integrity, inclusion, curiosity, and lifelong service to society." },
              ].map((v) => (
                <Card key={v.t} className="border-t-4 border-t-gold">
                  <CardContent className="p-5">
                    <div className="text-primary mb-3">{v.i}</div>
                    <h3 className="font-bold text-primary mb-1">{v.t}</h3>
                    <p className="text-sm text-muted-foreground">{v.d}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <aside className="bg-muted/40 rounded-2xl p-6 h-fit">
            <h3 className="font-bold text-primary mb-3">Quick Facts</h3>
            <ul className="text-sm space-y-3">
              <li className="flex justify-between border-b pb-2"><span>Founded</span><b>1995</b></li>
              <li className="flex justify-between border-b pb-2"><span>Campus</span><b>Shadadkot</b></li>
              <li className="flex justify-between border-b pb-2"><span>Students</span><b>5,000+</b></li>
              <li className="flex justify-between border-b pb-2"><span>Faculty</span><b>150+</b></li>
              <li className="flex justify-between border-b pb-2"><span>Programs</span><b>20+</b></li>
              <li className="flex justify-between"><span>Accreditation</span><b>HEC</b></li>
            </ul>
          </aside>
        </div>
      </section>

      {/* DIRECTOR MESSAGE */}
      <section className="section bg-muted/40">
        <div className="container-narrow grid md:grid-cols-[260px_1fr] gap-8 items-start">
          <div>
            <img src={directorImg} alt="Campus Director" width={400} height={400} loading="lazy" className="rounded-2xl shadow-elegant" />
            <div className="mt-4 text-center">
              <div className="font-bold text-primary">Prof. Dr. Aslam Channa</div>
              <div className="text-sm text-gold font-semibold">Campus Director</div>
            </div>
          </div>
          <div>
            <Quote className="h-10 w-10 text-gold mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-4">A Message from the Campus Director</h2>
            <p className="text-muted-foreground mb-3">
              Welcome to Shah Abdul Latif Bhattai University, Shadadkot Campus. Our institution is more than
              a place of learning — it is a community where ideas are born, character is shaped, and futures
              are forged. Whether you are a prospective student, a parent, or a partner in education, you
              will find here an environment committed to your success.
            </p>
            <p className="text-muted-foreground">
              We invite you to be part of our journey toward academic excellence and social impact.
            </p>
          </div>
        </div>
      </section>

      {/* GOVERNANCE & ACCREDITATION */}
      <section className="section">
        <div className="container-narrow grid md:grid-cols-2 gap-10">
          <Card>
            <CardContent className="p-7">
              <ShieldCheck className="h-9 w-9 text-gold mb-3" />
              <h3 className="text-xl font-bold text-primary mb-3">Governance</h3>
              <p className="text-muted-foreground mb-4">The campus is governed by the University Senate and Syndicate, with academic affairs led by the Academic Council and Boards of Studies for each discipline.</p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Vice Chancellor — Office of the Main University</li>
                <li>• Campus Director — Prof. Dr. Aslam Channa</li>
                <li>• Academic Council & Boards of Studies</li>
                <li>• Office of the Registrar</li>
                <li>• Office of the Controller of Examinations</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-7">
              <Trophy className="h-9 w-9 text-gold mb-3" />
              <h3 className="text-xl font-bold text-primary mb-3">Accreditation & Recognition</h3>
              <p className="text-muted-foreground mb-4">The university is fully chartered and recognized by the Higher Education Commission (HEC) of Pakistan, with programs accredited by relevant national councils.</p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• HEC Recognized Degree-Awarding Institution</li>
                <li>• NCEAC accredited Computing Programs</li>
                <li>• NBEAC accredited Business Programs</li>
                <li>• Member, HEC Quality Enhancement Cell network</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="section bg-muted/40">
        <div className="container-narrow">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">Campus Facilities</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { i: <BookMarked />, t: "Central Library", d: "60,000+ books, digital journals, study halls." },
              { i: <Building2 />, t: "Modern Labs", d: "Computing, science and engineering laboratories." },
              { i: <Wifi />, t: "Smart Classrooms", d: "Multimedia-equipped, connected classrooms." },
              { i: <Trophy />, t: "Sports & Hostels", d: "Cricket ground, gym, and separate hostels." },
            ].map((f) => (
              <Card key={f.t} className="hover:shadow-elegant transition">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-3">{f.i}</div>
                  <h3 className="font-bold text-primary mb-1">{f.t}</h3>
                  <p className="text-sm text-muted-foreground">{f.d}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
