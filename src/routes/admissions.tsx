import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Calendar, CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions 2026 — SALBU Shadadkot" },
      { name: "description", content: "Admission requirements, important dates, fee structure and documents for SALBU Shadadkot Campus." },
      { property: "og:title", content: "Admissions at SALBU Shadadkot" },
      { property: "og:description", content: "Everything you need to apply." },
    ],
  }),
  component: AdmissionsPage,
});

function AdmissionsPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Admissions 2026" title="Begin your journey at SALBU Shadadkot." subtitle="Clear requirements, transparent fees, and a fully-online application." />

      <section className="section">
        <div className="container-narrow grid lg:grid-cols-[2fr_1fr] gap-10">
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Admission Requirements</h2>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  "Intermediate / equivalent with minimum required marks per program",
                  "Valid CNIC or Form-B for applicants under 18",
                  "Recent passport-size photograph",
                  "Character certificate from the last institution attended",
                  "No previous expulsion from any HEC-recognized institution",
                ].map((r) => <li key={r} className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-gold mt-0.5 shrink-0" />{r}</li>)}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Important Dates</h2>
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Applications open", "15 June 2026"],
                      ["Last date to apply", "15 August 2026"],
                      ["Entrance test (if applicable)", "25 August 2026"],
                      ["Merit list announcement", "5 September 2026"],
                      ["Fee deposit deadline", "15 September 2026"],
                      ["Classes commence", "1 October 2026"],
                    ].map(([e, d]) => (
                      <TableRow key={e}>
                        <TableCell>{e}</TableCell>
                        <TableCell className="text-right font-semibold text-primary">{d}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Fee Structure (Per Semester)</h2>
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program</TableHead>
                      <TableHead className="text-right">Tuition Fee</TableHead>
                      <TableHead className="text-right">Admission Fee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["BS Computer Science", "PKR 35,000", "PKR 15,000"],
                      ["BBA", "PKR 30,000", "PKR 15,000"],
                      ["BS English", "PKR 25,000", "PKR 12,000"],
                      ["MCS", "PKR 40,000", "PKR 18,000"],
                      ["MBA", "PKR 45,000", "PKR 20,000"],
                    ].map(([p, t, a]) => (
                      <TableRow key={p}>
                        <TableCell className="font-medium">{p}</TableCell>
                        <TableCell className="text-right">{t}</TableCell>
                        <TableCell className="text-right">{a}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
              <p className="text-xs text-muted-foreground mt-2">* Admission fee is a one-time payment. Examination and registration fees apply separately.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">How to Apply</h2>
              <ol className="space-y-3 text-muted-foreground list-decimal pl-5">
                <li>Create your application through our <Link to="/online-apply" className="text-primary underline">online portal</Link>.</li>
                <li>Upload your CNIC, photograph and academic documents.</li>
                <li>Generate your application receipt and pay the processing fee at any HBL branch.</li>
                <li>Upload the fee deposit screenshot in the same form.</li>
                <li>Wait for the merit list and offer letter via email/SMS.</li>
              </ol>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 h-fit">
            <Card className="border-t-4 border-t-gold">
              <CardContent className="p-6">
                <h3 className="font-bold text-primary mb-3">Required Documents</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• CNIC / B-Form</li>
                  <li>• Matric & Intermediate transcripts</li>
                  <li>• Character certificate</li>
                  <li>• Domicile certificate</li>
                  <li>• Photograph (passport size)</li>
                  <li>• Fee deposit slip</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h3 className="font-bold mb-3">Ready to apply?</h3>
                <p className="text-sm text-primary-foreground/85 mb-4">The online portal takes about 10 minutes.</p>
                <Button asChild className="btn-gold border-0 w-full">
                  <Link to="/online-apply">Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <FileText className="h-8 w-8 text-gold mb-2" />
                <h3 className="font-bold text-primary mb-2">Prospectus 2026</h3>
                <p className="text-sm text-muted-foreground mb-3">Download the full prospectus with all programs and policies.</p>
                <Button variant="outline" className="w-full" onClick={() => window.print()}>
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Calendar className="h-8 w-8 text-gold mb-2" />
                <h3 className="font-bold text-primary mb-1">Open Day</h3>
                <p className="text-sm text-muted-foreground">Visit the campus every Saturday, 10am — 2pm.</p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
