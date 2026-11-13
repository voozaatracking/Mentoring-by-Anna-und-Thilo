/*
 * POST /api/anfrage. Läuft in der Node.js-Laufzeit. Das ist bei aktivem
 * cacheComponents die einzige Laufzeit; ein Export "runtime" ist dort
 * laut Next-Dokumentation nicht erlaubt.
 *
 * Grundgerüst: Validierung und Mailversand folgen mit dem Formular.
 */
export async function POST() {
  return Response.json({ ok: false, fehler: "nicht_umgesetzt" }, { status: 501 });
}
