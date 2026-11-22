import type { ReactNode } from "react";
import { ui } from "@/content/site";

/** rel für Verweise auf fremde Websites: kein Zugriff auf das Fenster, kein Referrer. */
export const EXTERN_REL = "noopener noreferrer";

/** Verweis auf eine fremde Website. Öffnet in neuem Tab. */
export function ExternerLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel={EXTERN_REL} className={className}>
      {children}
      <span className="sr-only"> {ui.neuerTab}</span>
    </a>
  );
}
