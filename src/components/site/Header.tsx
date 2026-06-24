import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/admissions", label: "Admissions" },
  { to: "/research", label: "Research" },
  { to: "/campus-life", label: "Campus Life" },
  { to: "/news", label: "News & Events" },
  { to: "/contact", label: "Contact" },
  { to: "/find-application", label: "Find My Application" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top utility strip */}
      <div className="hidden md:block bg-primary-dark text-primary-foreground text-xs">
        <div className="container-narrow flex items-center justify-between py-2">
          <span>{SITE.address}</span>
          <span className="flex gap-4">
            <a href={`tel:${SITE.phone}`} className="hover:text-gold">{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`} className="hover:text-gold">{SITE.email}</a>
          </span>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b transition-shadow",
          scrolled && "shadow-md",
        )}
      >
        <div className="container-narrow flex items-center justify-between gap-4 py-3">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="SALBU crest" width={48} height={48} className="h-12 w-12" />
            <div className="leading-tight">
              <div className="font-display text-base md:text-lg font-bold text-primary">
                {SITE.name}
              </div>
              <div className="text-[11px] md:text-xs uppercase tracking-wider text-gold font-semibold">
                {SITE.campus}
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.slice(0, 8).map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-md hover:bg-secondary transition-colors"
                activeProps={{ className: "text-primary bg-secondary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/online-apply"
              className="ml-2 inline-flex items-center rounded-md btn-gold px-4 py-2 text-sm shadow-md"
            >
              Apply Now
            </Link>
          </nav>

          <button
            className="lg:hidden p-2 text-primary"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t bg-background">
            <div className="container-narrow py-3 flex flex-col">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-sm font-medium border-b last:border-0"
                  activeProps={{ className: "text-primary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/online-apply"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex justify-center rounded-md btn-gold px-4 py-2.5 text-sm"
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
