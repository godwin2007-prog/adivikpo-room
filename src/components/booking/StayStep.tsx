import type { BookingForm } from "../../hooks/useBookingForm";
import { rooms } from "../../data/rooms";
import { addDays, todayISO } from "../../utils/dates";
import FormField from "./FormField";

// Étape 1 : chambre, voyageurs, arrivée et départ.
export default function StayStep({ form }: { form: BookingForm }) {
  const { data, errors, updateField } = form;

  return (
    <fieldset className="grid gap-5 md:grid-cols-2">
      <legend className="step-title">Votre séjour</legend>

      <FormField id="roomId" label="Chambre" error={errors.roomId}>
        <select id="roomId" value={data.roomId} onChange={(e) => updateField("roomId", e.target.value)} className="field-input">
          <option value="">Choisir une chambre</option>
          {rooms.map((r) => <option key={r.id} value={r.id}>{r.name} ({r.capacity} pers. max.)</option>)}
        </select>
      </FormField>

      <FormField id="guests" label="Voyageurs" error={errors.guests}>
        <input id="guests" type="number" min={1} max={3} value={data.guests}
          onChange={(e) => updateField("guests", Number(e.target.value))} className="field-input" />
      </FormField>

      <FormField id="checkIn" label="Arrivée" error={errors.checkIn}>
        <input id="checkIn" type="date" min={todayISO()} value={data.checkIn}
          onChange={(e) => updateField("checkIn", e.target.value)} className="field-input" />
      </FormField>

      <FormField id="checkOut" label="Départ" error={errors.checkOut}>
        <input id="checkOut" type="date" min={data.checkIn ? addDays(data.checkIn, 1) : todayISO()} value={data.checkOut}
          onChange={(e) => updateField("checkOut", e.target.value)} className="field-input" />
      </FormField>
    </fieldset>
  );
}
