import type { Room } from "../../types/room";

// Caractéristiques principales d'une chambre, en ligne.
export default function RoomFacts({ room }: { room: Room }) {
  const facts = [
    { label: "Surface", value: `${room.size} m²` },
    { label: "Couchage", value: room.bed },
    { label: "Voyageurs", value: `${room.capacity} max.` },
  ];

  return (
    <dl className="grid grid-cols-3 gap-4 border-y border-pierre/20 py-6">
      {facts.map((f) => (
        <div key={f.label}>
          <dt className="text-xs text-pierre">{f.label}</dt>
          <dd className="mt-1 text-sm font-medium">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
