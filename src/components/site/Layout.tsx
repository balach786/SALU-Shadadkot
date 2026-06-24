import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section
      className="relative text-primary-foreground"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="container-narrow py-16 md:py-24">
        {eyebrow && (
          <div className="text-gold uppercase tracking-widest text-xs font-semibold mb-3">
            {eyebrow}
          </div>
        )}
        <h1 className="text-3xl md:text-5xl font-bold text-balance max-w-3xl">{title}</h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-primary-foreground/85 text-lg">{subtitle}</p>
        )}
      </div>
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </section>
  );
}
