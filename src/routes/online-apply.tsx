import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AdmissionCard, type AdmissionData } from "@/components/site/AdmissionCard";
import { AlertCircle, CheckCircle2, Download, Printer, Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PROGRAMS } from "@/lib/data";
import { APPS_SCRIPT_URL } from "@/lib/site";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/online-apply")({
  head: () => ({
    meta: [
      { title: "Online Admission Portal — SALBU Shadadkot" },
      { name: "description", content: "Submit your online application to SALBU Shadadkot Campus. Smart portal with auto-generated admission card and QR verification." },
      { property: "og:title", content: "Apply Online — SALBU Shadadkot" },
      { property: "og:description", content: "Fast, secure online application." },
    ],
  }),
  component: OnlineApply,
});

const cnicRegex = /^\d{5}-\d{7}-\d$/;

const schema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(100),
  fatherName: z.string().trim().min(2, "Father's name is required").max(100),
  cnic: z.string().regex(cnicRegex, "CNIC must be in format xxxxx-xxxxxxx-x"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  phone: z.string().trim().min(10, "Valid phone required").max(20),
  email: z.string().trim().email("Valid email required").max(120),
  address: z.string().trim().min(5, "Address required").max(300),
  program: z.string().min(1, "Please select a program"),
});

type FormValues = z.infer<typeof schema>;

export default function OnlineApply() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [result, setResult] = useState<AdmissionData | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { gender: "Male" },
  });

  const onSubmit = async (values: FormValues, e?: React.BaseSyntheticEvent) => {
    setServerError(null);
    setSubmitting(true);
    try {
      const form = e?.target as HTMLFormElement;
      const photo = (form.querySelector('input[name="photo"]') as HTMLInputElement | null)?.files?.[0];
      const documents = (form.querySelector('input[name="documents"]') as HTMLInputElement | null)?.files?.[0];
      const feeSlip = (form.querySelector('input[name="feeSlip"]') as HTMLInputElement | null)?.files?.[0];

      if (!photo) throw new Error("Please upload your photograph.");

      if (!APPS_SCRIPT_URL) {
        // Demo / preview mode — generate a local admission card
        const fake: AdmissionData = {
          applicationId: `ADM-2026-${String(Math.floor(100 + Math.random() * 899)).padStart(6, "0")}`,
          fullName: values.fullName,
          fatherName: values.fatherName,
          cnic: values.cnic,
          program: values.program,
          photoUrl: URL.createObjectURL(photo),
          submissionDate: new Date().toLocaleDateString("en-PK"),
          status: "Submitted (Demo Mode)",
        };
        setResult(fake);
        setServerError("Demo mode: VITE_APPS_SCRIPT_URL is not configured, so this application was not saved. See DEPLOYMENT.md to connect Google Sheets.");
        return;
      }

      const fd = new FormData();
      fd.append("action", "apply");
      Object.entries(values).forEach(([k, v]) => fd.append(k, String(v)));
      if (photo) fd.append("photo", photo);
      if (documents) fd.append("documents", documents);
      if (feeSlip) fd.append("feeSlip", feeSlip);

      const res = await fetch(APPS_SCRIPT_URL, { method: "POST", body: fd });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Submission failed");

      setResult({
        applicationId: data.applicationId,
        fullName: values.fullName,
        fatherName: values.fatherName,
        cnic: values.cnic,
        program: values.program,
        photoUrl: data.photoUrl || URL.createObjectURL(photo),
        submissionDate: new Date().toLocaleDateString("en-PK"),
        status: data.status || "Submitted",
      });
      if (data.cardUrl) setPdfUrl(data.cardUrl);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <SiteLayout>
        <PageHero eyebrow="Submission Successful" title="Welcome aboard — your application is in!" subtitle="Save or print your digital admission card below. You can also look it up later using your CNIC." />
        <section className="section">
          <div className="container-narrow max-w-3xl">
            <Alert className="mb-6 border-success/30 bg-success/5">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <AlertTitle className="text-success">Registration Successful</AlertTitle>
              <AlertDescription>
                Your Application ID is <b className="font-mono">{result.applicationId}</b>. A confirmation has been sent to your email.
              </AlertDescription>
            </Alert>

            {serverError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}

            <AdmissionCard data={result} />

            <div className="flex flex-wrap gap-3 mt-6 justify-center print:hidden">
              {pdfUrl ? (
                <Button asChild className="btn-gold border-0"><a href={pdfUrl} target="_blank" rel="noreferrer"><Download className="mr-2 h-4 w-4" /> Download PDF Card</a></Button>
              ) : (
                <Button className="btn-gold border-0" onClick={() => window.print()}><Download className="mr-2 h-4 w-4" /> Save as PDF</Button>
              )}
              <Button variant="outline" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" /> Print</Button>
              <Button asChild variant="outline"><Link to="/find-application" search={{ cnic: result.cnic }}><Search className="mr-2 h-4 w-4" /> View Application</Link></Button>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Online Admission Portal" title="Smart Admission System" subtitle="Complete this form to apply. Most students finish in under 10 minutes." />
      <section className="section">
        <div className="container-narrow max-w-4xl">
          {!APPS_SCRIPT_URL && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Demo Mode</AlertTitle>
              <AlertDescription>
                The Google Apps Script Web App URL is not configured yet. The form will work and preview the admission card, but submissions won't be saved. See <code className="font-mono">DEPLOYMENT.md</code> in your project to connect Google Sheets.
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardContent className="p-6 md:p-8">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <Section title="Personal Information">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full Name" error={errors.fullName?.message}>
                      <Input {...register("fullName")} placeholder="As per CNIC" />
                    </Field>
                    <Field label="Father's Name" error={errors.fatherName?.message}>
                      <Input {...register("fatherName")} />
                    </Field>
                    <Field label="CNIC" error={errors.cnic?.message}>
                      <Input {...register("cnic")} placeholder="xxxxx-xxxxxxx-x" inputMode="numeric" />
                    </Field>
                    <Field label="Date of Birth" error={errors.dob?.message}>
                      <Input type="date" {...register("dob")} />
                    </Field>
                    <Field label="Gender" error={errors.gender?.message}>
                      <RadioGroup
                        value={watch("gender")}
                        onValueChange={(v) => setValue("gender", v as FormValues["gender"])}
                        className="flex gap-5 pt-2"
                      >
                        {(["Male", "Female", "Other"] as const).map((g) => (
                          <label key={g} className="flex items-center gap-2 text-sm cursor-pointer">
                            <RadioGroupItem value={g} id={`g-${g}`} /> {g}
                          </label>
                        ))}
                      </RadioGroup>
                    </Field>
                    <Field label="Phone" error={errors.phone?.message}>
                      <Input {...register("phone")} type="tel" placeholder="03xxxxxxxxx" />
                    </Field>
                    <Field label="Email" error={errors.email?.message}>
                      <Input {...register("email")} type="email" />
                    </Field>
                    <Field label="Program Applied" error={errors.program?.message}>
                      <Select onValueChange={(v) => setValue("program", v)}>
                        <SelectTrigger><SelectValue placeholder="Select a program" /></SelectTrigger>
                        <SelectContent>
                          {PROGRAMS.map((p) => (
                            <SelectItem key={p.slug} value={p.name}>{p.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                  <Field label="Postal Address" error={errors.address?.message}>
                    <Textarea {...register("address")} rows={3} />
                  </Field>
                </Section>

                <Section title="Document Uploads">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Field label="Photograph (required)">
                      <Input type="file" name="photo" accept="image/*" required />
                    </Field>
                    <Field label="Documents (PDF/ZIP)">
                      <Input type="file" name="documents" accept=".pdf,.zip,image/*" />
                    </Field>
                    <Field label="Fee Slip / Screenshot">
                      <Input type="file" name="feeSlip" accept="image/*,.pdf" />
                    </Field>
                  </div>
                  <p className="text-xs text-muted-foreground">Max file size: 10 MB each. Photograph should be a recent passport-size image.</p>
                </Section>

                {serverError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{serverError}</AlertDescription>
                  </Alert>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button type="submit" size="lg" disabled={submitting} className="btn-gold border-0 shadow-elegant">
                    {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Application"}
                  </Button>
                  <p className="text-xs text-muted-foreground">By submitting, you confirm that all information is accurate and authentic.</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-lg font-bold text-primary border-b pb-2 mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5 block">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
