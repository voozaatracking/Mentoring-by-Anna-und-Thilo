import type { ReactNode } from "react";

/** Rahmenkasten in heller Statusfarbe mit Rahmen in der Statusfarbe. */
export function Hinweis({
  status = "hinweis",
  children,
  className = "",
}: {
  status?: "hinweis" | "erfolg" | "fehler";
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`hinweis ${className}`} data-status={status}>
      {children}
    </div>
  );
}
