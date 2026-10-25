import type { BookingForm } from "../../hooks/useBookingForm";
import { extras } from "../../data/extras";
import { formatPrice } from "../../utils/format";

// Étape 2 : options facultatives, sous forme de cartes à cocher.
export default function ExtrasStep({ form }: { form: BookingForm }) {
  return (
    <fieldset>
      <legend className="step-title">Ajoutez des options</legend>
      <p className="-mt-2 mb-6 text-sm text-pierre">Facultatif : vous pouvez passer directement à l'étape suivante.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {extras.map((extra) => {
          const checked = form.data.extras.includes(extra.id);
          return (
            <label key={extra.id} className={`flex cursor-pointer gap-4 rounded-sm border bg-white p-5 transition
              ${checked ? "border-foret ring-1 ring-foret" : "border-pierre/25 hover:border-pierre/50"}`}>
              <input type="checkbox" checked={checked} onChange={() => form.toggleExtra(extra.id)} className="mt-1 accent-foret" />
              <span>
                <span className="block font-medium">{extra.label}</span>
                <span className="mt-1 block text-sm text-pierre">{extra.description}</span>
                <span className="mt-2 block text-sm font-semibold text-foret">
                  {formatPrice(extra.price)} <span className="font-normal text-pierre">/ {extra.per === "nuit" ? "nuit" : "séjour"}</span>
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
