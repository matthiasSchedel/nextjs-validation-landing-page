interface FooterProps {
  title: string;
  twitterHandle?: string;
}

function toTwitterUrl(handle: string): string {
  const normalizedHandle = handle.startsWith("@") ? handle.slice(1) : handle;
  return `https://x.com/${normalizedHandle}`;
}

export function Footer({ title, twitterHandle }: FooterProps): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 text-sm text-foreground/70 sm:flex-row sm:items-center sm:justify-between">
        <span>
          {title} © {year}
        </span>
        {twitterHandle ? (
          <a href={toTwitterUrl(twitterHandle)} target="_blank" rel="noreferrer" className="hover:text-primary">
            {twitterHandle}
          </a>
        ) : null}
      </div>
    </footer>
  );
}
