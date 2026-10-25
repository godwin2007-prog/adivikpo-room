// Affiche un prix au format local : 65000 -> "65 000 FCFA".
export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}
