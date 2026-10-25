import type { BookingForm } from "../../hooks/useBookingForm";
import ContactFields from "./ContactFields";
import FormField from "./FormField";

// Étape 3 : coordonnées, message libre et acceptation de la charte.
export default function ContactStep({ form }: { form: BookingForm }) {
  const { data, errors, updateField } = form;

  return (
    <fieldset className="flex flex-col gap-6">
      <legend className="step-title">Vos coordonnées</legend>
      <ContactFields form={form} />
      <FormField id="message" label="Un message pour nous (facultatif)">
        <textarea id="message" rows={3} value={data.message} placeholder="Heure d'arrivée, demande particulière…"
          onChange={(e) => updateField("message", e.target.value)} className="field-input" />
      </FormField>
      <div>
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" checked={data.acceptRules} onChange={(e) => updateField("acceptRules", e.target.checked)} className="mt-1 accent-foret" />
          <span>
            J'accepte la <a href="/#charte" target="_blank" rel="noreferrer" className="text-lagune underline">charte de la maison</a> :
            pièce d'identité à l'arrivée, calme après 22 h, maison non-fumeur.
          </span>
        </label>
        {errors.acceptRules && <p className="field-error" role="alert">{errors.acceptRules}</p>}
      </div>
    </fieldset>
  );
}
