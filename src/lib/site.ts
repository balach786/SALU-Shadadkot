export const SITE = {
  name: "Shah Abdul Latif Bhattai University",
  shortName: "SALBU",
  campus: "Shadadkot Campus",
  tagline: "Empowering Minds. Building Futures.",
  address: "Main Campus Road, Shadadkot, District Kambar Shahdadkot, Sindh, Pakistan",
  phone: "+92 74 4012345",
  phone2: "+92 300 1234567",
  email: "info@salbu-shadadkot.edu.pk",
  admissionEmail: "admissions@salbu-shadadkot.edu.pk",
  socials: {
    facebook: "https://facebook.com/",
    twitter: "https://twitter.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
  },
};

// Set this to your deployed Google Apps Script Web App URL.
// You can override at build time with: VITE_APPS_SCRIPT_URL=...
export const APPS_SCRIPT_URL: string =
  (import.meta.env?.VITE_APPS_SCRIPT_URL as string | undefined) ?? "";
