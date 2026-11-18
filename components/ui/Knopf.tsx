import Link from "next/link";
import type { ReactNode } from "react";
import { ui } from "@/content/site";

type Variante = "primaer" | "sekundaer";

function klassen(variante: Variante, klein: boolean, className: string) {
  return [
    "knopf",
    variante === "primaer" ? "knopf-primaer" : "knopf-sekundaer",
    klein ? "knopf-klein" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

/** Verweis im Aussehen eines Knopfs. Externe Ziele öffnen in neuem Tab. */
export function KnopfLink({
  href,
  variante = "primaer",
  klein = false,
  extern = false,
  className = "",
  onClick,
  children,
}: {
  href: string;
  variante?: Variante;
  klein?: boolean;
  extern?: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const alleKlassen = klassen(variante, klein, className);
  if (extern) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className={alleKlassen}
        onClick={onClick}
      >
        {children}
        <span className="sr-only"> {ui.neuerTab}</span>
      </a>
    );
  }
  return (
    <Link href={href} className={alleKlassen} onClick={onClick}>
      {children}
    </Link>
  );
}
