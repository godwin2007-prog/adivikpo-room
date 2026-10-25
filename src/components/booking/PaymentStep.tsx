import type { BookingForm } from "../../hooks/useBookingForm";
import type { PaymentMethod } from "../../types/booking";
import FormField from "./FormField";

const methods: { id: PaymentMethod; label: string; text: string; color: string }[] = [
  { id: "mtn", label: "MTN MoMo", text: "Paiement immédiat par Mobile Money", color: "#FFCB05" },
  { id: "moov", label: "Moov Money", text: "Paiement immédiat par Moov Money", color: "#0066B3" },
  { id: "arrivee", label: "À l'arrivée", text: "En espèces ou mobile money à la réception", color: "currentColor" },
];

// Étape 4 : moyen de paiement. Le numéro n'est demandé que pour le mobile money.
export default function PaymentStep({ form }: { form: BookingForm }) {
  const { data, errors, updateField } = form;

  return (
    <fieldset className="flex flex-col gap-6">
      <legend className="step-title">Paiement</legend>
      <div role="radiogroup" className="grid gap-4 md:grid-cols-3">
        {methods.map((m) => {
          const checked = data.paymentMethod === m.id;
          return (
            <label key={m.id} className={`cursor-pointer rounded-sm border bg-white p-5 transition
              ${checked ? "border-foret ring-1 ring-foret" : "border-pierre/25 hover:border-pierre/50"}`}>
              <input type="radio" name="payment" className="sr-only" checked={checked} onChange={() => updateField("paymentMethod", m.id)} />
              <span className="mb-3 block h-1.5 w-10 rounded-full" style={{ background: m.color }} />
              <span className="block font-medium">{m.label}</span>
              <span className="mt-1 block text-sm text-pierre">{m.text}</span>
            </label>
          );
        })}
      </div>
      {data.paymentMethod !== "arrivee" && (
        <FormField id="paymentPhone" label="Numéro de paiement" error={errors.paymentPhone}>
          <input id="paymentPhone" type="tel" placeholder="+229 01 97 00 00 00" value={data.paymentPhone}
            onChange={(e) => updateField("paymentPhone", e.target.value)} className="field-input md:w-1/2" />
        </FormField>
      )}
    </fieldset>
  );
}
