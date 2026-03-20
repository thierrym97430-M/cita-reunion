import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (webhookUrl) {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: parsed.data.prenom,
          last_name: parsed.data.nom,
          phone: parsed.data.telephone,
          email: parsed.data.email,
          address: parsed.data.adresse,
          postal_code: parsed.data.codePostal,
          city: parsed.data.ville,
          product_interest: parsed.data.typeProjet,
          message: parsed.data.besoin || "",
          timestamp: new Date().toISOString(),
          source: "cita-reunion",
        }),
      });

      if (!res.ok) {
        console.error("Webhook error:", res.status);
        return NextResponse.json(
          { error: "Erreur lors de l'envoi" },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
