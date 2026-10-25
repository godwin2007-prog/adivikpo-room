import type { BookingForm } from "../../hooks/useBookingForm";
import FormField from "./FormField";

// Les 4 champs texte de contact, générés à partir d'une liste.
const fields = [
  { name: "firstName", label: "Prénom", type: "text", autoComplete: "given-name" },
  { name: "lastName", label: "Nom", type: "text", autoComplete: "family-name" },
  { name: "email", label: "E-mail", type: "email", autoComplete: "email" },
  { name: "phone", label: "Téléphone", type: "tel", autoComplete: "tel" },
] as const;

export default function ContactFields({ form }: { form: BookingForm }) {
  const { data, errors, updateField } = form;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {fields.map((f) => (
        <FormField key={f.name} id={f.name} label={f.label} error={errors[f.name]}>
          <input id={f.name} type={f.type} autoComplete={f.autoComplete} value={data[f.name]}
            onChange={(e) => updateField(f.name, e.target.value)} className="field-input" />
        </FormField>
      ))}
    </div>
  );
}
