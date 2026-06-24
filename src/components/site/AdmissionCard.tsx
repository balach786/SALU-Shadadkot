import { QRCodeSVG } from "qrcode.react";
import logo from "@/assets/logo.png";
import { SITE } from "@/lib/site";

export type AdmissionData = {
  applicationId: string;
  fullName: string;
  fatherName: string;
  cnic: string;
  program: string;
  photoUrl?: string;
  submissionDate?: string;
  status?: string;
};

export function AdmissionCard({ data }: { data: AdmissionData }) {
  const verifyUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/find-application?cnic=${encodeURIComponent(data.cnic)}`;
  return (
    <div
      id="admission-card"
      className="mx-auto w-full max-w-[640px] bg-card border-2 border-primary rounded-2xl overflow-hidden shadow-elegant print:shadow-none"
      style={{ aspectRatio: "1.6 / 1" }}
    >
      <div className="bg-primary text-primary-foreground px-5 py-3 flex items-center gap-3">
        <img src={logo} alt="SALBU" width={44} height={44} className="h-11 w-11 bg-white rounded-full p-0.5" />
        <div className="leading-tight">
          <div className="font-display font-bold text-sm">{SITE.name}</div>
          <div className="text-[10px] text-gold uppercase tracking-widest">{SITE.campus} • Admission Card</div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-[10px] uppercase opacity-70">Application No.</div>
          <div className="font-mono font-bold text-gold">{data.applicationId}</div>
        </div>
      </div>

      <div className="grid grid-cols-[110px_1fr_110px] gap-4 p-5">
        <div className="aspect-[3/4] bg-muted border rounded-lg overflow-hidden flex items-center justify-center">
          {data.photoUrl ? (
            <img src={data.photoUrl} alt={data.fullName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-muted-foreground text-center px-2">Photo</span>
          )}
        </div>

        <div className="text-sm space-y-1.5">
          <Field label="Name" value={data.fullName} />
          <Field label="Father's Name" value={data.fatherName} />
          <Field label="CNIC" value={data.cnic} mono />
          <Field label="Program" value={data.program} />
          <Field label="Submitted" value={data.submissionDate || new Date().toLocaleDateString()} />
          <Field label="Status" value={data.status || "Submitted"} highlight />
        </div>

        <div className="flex flex-col items-center justify-between">
          <div className="bg-white p-1.5 rounded">
            <QRCodeSVG value={verifyUrl} size={92} level="M" />
          </div>
          <div className="text-[9px] text-muted-foreground text-center mt-1 leading-tight">
            Scan to verify
          </div>
        </div>
      </div>

      <div className="bg-gold/15 px-5 py-2 text-[10px] text-primary flex justify-between">
        <span>This card is electronically generated. No signature required.</span>
        <span className="font-semibold">salbu-shadadkot.edu.pk</span>
      </div>
    </div>
  );
}

function Field({ label, value, mono, highlight }: { label: string; value: string; mono?: boolean; highlight?: boolean }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-2">
      <span className="text-[11px] uppercase text-muted-foreground font-semibold">{label}</span>
      <span className={`${mono ? "font-mono" : ""} ${highlight ? "text-success font-bold" : "text-foreground"} truncate`}>{value}</span>
    </div>
  );
}
