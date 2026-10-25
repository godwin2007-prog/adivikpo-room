interface Props {
  title: string;
  subtitle?: string;
  image: string;
}

// Bandeau photo en haut des pages intérieures (Chambres, Réserver).
export default function PageBanner({ title, subtitle, image }: Props) {
  return (
    <section className="relative flex h-72 items-end overflow-hidden md:h-96">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-foret/90 via-foret/40 to-foret/10" />
      <div className="container-site relative pb-10">
        <h1 className="text-4xl text-lin md:text-6xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-xl text-lin/80">{subtitle}</p>}
      </div>
    </section>
  );
}
