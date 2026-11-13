import { teileAnMarke } from "@/lib/text";

/** Text mit der Marke {email}, an deren Stelle ein Mail-Link steht. */
export function MitEmail({ text, email }: { text: string; email: string }) {
  const [vor, nach] = teileAnMarke(text, "email");
  return (
    <>
      {vor}
      <a href={`mailto:${email}`}>{email}</a>
      {nach}
    </>
  );
}
