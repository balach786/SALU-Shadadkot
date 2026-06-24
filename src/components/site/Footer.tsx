import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-primary-dark text-primary-foreground mt-20">
      <div className="container-narrow py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="SALBU" width={48} height={48} className="h-12 w-12 bg-white rounded-full p-1" loading="lazy" />
            <div>
              <div className="font-display font-bold">{SITE.shortName}</div>
              <div className="text-xs text-gold">{SITE.campus}</div>
            </div>
          </div>
          <p className="text-sm text-primary-foreground/80">
            A premier institution dedicated to academic excellence, research, and community service in upper Sindh.
          </p>
        </div>

        <div>
          <h4 className="font-display text-gold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/programs" className="hover:text-gold">Programs</Link></li>
            <li><Link to="/admissions" className="hover:text-gold">Admissions</Link></li>
            <li><Link to="/online-apply" className="hover:text-gold">Apply Online</Link></li>
            <li><Link to="/find-application" className="hover:text-gold">Find My Application</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-gold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/85">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-gold" />{SITE.address}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-gold" /><a href={`tel:${SITE.phone}`}>{SITE.phone}</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-gold" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-gold mb-4">Follow Us</h4>
          <div className="flex gap-3">
            <a href={SITE.socials.facebook} className="p-2 rounded-full bg-white/10 hover:bg-gold hover:text-primary-dark transition" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
            <a href={SITE.socials.twitter} className="p-2 rounded-full bg-white/10 hover:bg-gold hover:text-primary-dark transition" aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
            <a href={SITE.socials.instagram} className="p-2 rounded-full bg-white/10 hover:bg-gold hover:text-primary-dark transition" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
            <a href={SITE.socials.youtube} className="p-2 rounded-full bg-white/10 hover:bg-gold hover:text-primary-dark transition" aria-label="YouTube"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-narrow py-5 text-xs text-primary-foreground/70 flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} {SITE.name} — {SITE.campus}. All rights reserved.</span>
          <span>Designed for academic excellence.</span>
        </div>
      </div>
    </footer>
  );
}
