import { z } from "zod";

export const contactSchema = z.object({
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  telephone: z
    .string()
    .regex(
      /^(0|\+33)[1-9](\d{2}){4}$/,
      "Numéro de téléphone invalide"
    ),
  email: z.string().email("Adresse email invalide"),
  adresse: z.string().min(5, "Veuillez renseigner votre adresse"),
  codePostal: z.string().regex(/^97[0-9]{3}$/, "Code postal invalide (ex: 97400)"),
  ville: z.string().min(2, "Veuillez renseigner votre ville"),
  typeProjet: z.enum([
    "Vidéosurveillance",
    "Alarme",
    "Portique antivol",
    "Téléassistance",
  ], { message: "Veuillez sélectionner un type de projet" }),
  besoin: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
