import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AdmissionCard, type AdmissionData } from "@/components/site/AdmissionCard";
import { Search, AlertCircle, Printer, Download, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { z } from "zod";
import { APPS_SCRIPT_URL } from "@/lib/site";

const searchSchema = z.object({
  cnic: z.string().optional(),
});

export const Route = createFileRoute("/find-application")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Find My Application — SALBU Shadadkot" },
      { name: "description", content: "Search your SALBU Shadadkot admission application status by CNIC." },
      { property: "og:title", content: "Find My Application" },
      { property: "og:description", content: "Track your admission status." },
    ],
  }),
  component: FindApplication,
});

const cnicRegex = /^\d{5}-\d{7}-\d$/;

function FindApplication() {
  const search = Route.useSearch();
  const [cnic, setCnic] = useState(search.cnic ?? "");
  const [state, setState] = useState<"idle" | "loading" | "found" | "notfound" | "err">("idle");
  const [data, setData] = useState<AdmissionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function doSearch(value: string) {
    setError(null);
    if (!cnicRegex.test(value)) {
      setError("Enter CNIC in format xxxxx-xxxxxxx-x");
      return;
    }
    setState("loading");
    if (!APPS_SCRIPT_URL) {
      setState("err");
      setError("Apps Script URL is not configured. See DEPLOYMENT.md.");
      return;
    }
    try {
      const res = await fetch(`/api/proxy?action=find&cnic=${encodeURIComponent(value)}`);
      const json = await res.json();
      if (!json.ok) {
        setState(json.notFound ? "notfound" : "err");
        if (!json.notFound) setError(json.error || "Search failed");
        return;
      }
      setData(json.application as AdmissionData);
      setState("found");
    } catch (e) {
      setState("err");
      setError(e instanceof Error ? e.message : "Search failed");
    }
  }

  useEffect(() => {
    if (search.cnic && cnicRegex.test(search.cnic)) {
      void doSearch(search.cnic);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SiteLayout>
      <PageHero eyebrow="Application Lookup" title="Find My Application" subtitle="Enter your CNIC to view the status of your admission application." />
      <section className="section">
        <div className="container-narrow max-w-3xl">
          <Card className="mb-6">
            <CardContent className="p-6">
              <form
                className="flex flex-col sm:flex-row gap-3"
                onSubmit={(e) => { e.preventDefault(); void doSearch(cnic); }}
              >
                <Input
                  placeholder="xxxxx-xxxxxxx-x"
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                  className="text-base"
                />
                <Button type="submit" className="btn-gold border-0" disabled={state === "loading"}>
                  {state === "loading" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                  Search
                </Button>
              </form>
              {error && <p className="text-xs text-destructive mt-2">{error}</p>}
            </CardContent>
          </Card>

          {state === "notfound" && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Not found</AlertTitle>
              <AlertDescription>No application was found for this CNIC.</AlertDescription>
            </Alert>
          )}

          {state === "found" && data && (
            <>
              <AdmissionCard data={data} />
              <div className="flex flex-wrap gap-3 mt-6 justify-center print:hidden">
                <Button className="btn-gold border-0" onClick={() => window.print()}><Download className="mr-2 h-4 w-4" /> Save as PDF</Button>
                <Button variant="outline" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" /> Print</Button>
              </div>
            </>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
