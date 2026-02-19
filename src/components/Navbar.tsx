interface NavbarProps {
  title: string;
  cta: string;
}

export function Navbar({ title, cta }: NavbarProps): JSX.Element {
  return (
    <header className="sticky top-0 z-30 border-b border-border/50 bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="text-lg font-semibold tracking-tight">{title}</div>
        <a
          href="#waitlist"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          {cta}
        </a>
      </div>
    </header>
  );
}
