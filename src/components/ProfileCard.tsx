import { Mail, Linkedin, Github } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import BrandLogo from "./BrandLogo";

const CONTACT_ROWS = [
  { icon: Mail, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: Linkedin, label: "LinkedIn", href: personalInfo.linkedin },
  { icon: Github, label: "GitHub", href: personalInfo.github },
];

// Real DOM business card (credit-card proportions) for the Card3D hero slot.
const ProfileCard = () => (
  <div className="relative w-full aspect-[16/10] rounded-3xl border border-white/10 shadow-accent-strong overflow-hidden bg-gradient-to-br from-background/90 via-background/70 to-primary/10 backdrop-blur-xl">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.18)_0%,transparent_60%)] pointer-events-none" />
    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
      backgroundImage: "radial-gradient(hsl(var(--accent)) 1px, transparent 1px)",
      backgroundSize: "20px 20px",
    }} />

    <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-7">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-lg sm:text-xl font-bold tracking-tight text-foreground">{personalInfo.name}</p>
          <p className="text-xs sm:text-sm font-medium text-primary mt-1 tracking-wide uppercase">{personalInfo.role}</p>
        </div>
        <BrandLogo className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" />
      </div>

      <div className="flex flex-col gap-2">
        {CONTACT_ROWS.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary transition-colors w-fit"
          >
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary/80 group-hover:text-primary transition-colors shrink-0" />
            <span className="truncate">{label}</span>
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default ProfileCard;
