type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

// Dark title band used at the top of every inner page.
export default function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      <div className="bg-dots absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_85%_0%,rgba(56,112,224,0.38),transparent_70%)]" />
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-36 lg:px-8 lg:pb-20 lg:pt-44">
        <p className="animate-fade-up text-sm font-bold uppercase tracking-[0.18em] text-gold-400">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl animate-fade-up text-4xl [animation-delay:120ms] font-extrabold leading-tight sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-6 max-w-3xl animate-fade-up text-lg leading-relaxed text-white/75 [animation-delay:240ms]">{description}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
