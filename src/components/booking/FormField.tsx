import type { ReactNode } from "react";

interface Props {
  id: string;
  label: string;
  error?: string;
  children: ReactNode; // le champ lui-même (<input>, <select>…)
}

// Enveloppe commune : libellé au-dessus, message d'erreur en dessous.
export default function FormField({ id, label, error, children }: Props) {
  return (
    <div>
      <label htmlFor={id} className="field-label">{label}</label>
      {children}
      {error && <p className="field-error" role="alert">{error}</p>}
    </div>
  );
}
