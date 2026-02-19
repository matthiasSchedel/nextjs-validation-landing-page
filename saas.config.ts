export interface SaasConfig {
  meta: {
    title: string;
    description: string;
    url: string;
    ogImage: string;
    twitterHandle?: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
    ctaSecondary?: string;
    ctaSecondaryUrl?: string;
    image: string;
    badge?: string;
  };
  features: Array<{
    title: string;
    description: string;
    image?: string;
    icon?: string;
  }>;
  socialProof?: {
    stats: Array<{ value: string; label: string }>;
    quotes: Array<{ text: string; author: string; role?: string }>;
  };
  pricing: {
    headline: string;
    subheadline?: string;
    tiers: Array<{
      name: string;
      price: number;
      description?: string;
      features: string[];
      cta: string;
      highlighted?: boolean;
    }>;
  };
  theme: {
    primary: string;
    primaryForeground?: string;
    background: string;
    foreground?: string;
    muted?: string;
    font: string;
    mode: "dark" | "light";
    borderRadius?: string;
  };
  integrations: {
    resendAudienceId: string;
    resendApiKey: string;
    plausibleDomain?: string;
  };
  framework: {
    buyerPersona: string;
    corePain: string;
    channel: string;
    phase: 0 | 1 | 2 | 3 | 4 | 5;
  };
}

export const saasConfig: SaasConfig = {
  meta: {
    title: "FlowSync",
    description:
      "Route, filter, and replay webhook events across all your tools without writing glue code.",
    url: "https://flowsync.app",
    ogImage: "/images/og-flowsync.svg",
    twitterHandle: "@flowsynchq"
  },
  hero: {
    badge: "Now in beta",
    headline: "Route every webhook event exactly where it should go.",
    subheadline:
      "FlowSync gives product and ops teams reliable webhook routing, retries, and observability in one place.",
    cta: "Join the waitlist",
    ctaSecondary: "Read docs preview",
    ctaSecondaryUrl: "#features",
    image: "/images/hero-flowsync.svg"
  },
  features: [
    {
      title: "Smart routing rules",
      description:
        "Match on payload fields and route to multiple destinations with deterministic rule ordering.",
      icon: "\ud83e\udded"
    },
    {
      title: "Replay and retry",
      description:
        "Reprocess failed events in bulk with idempotency-safe replays and full delivery history.",
      icon: "\ud83d\udd04"
    },
    {
      title: "Destination controls",
      description:
        "Set per-destination rate limits, secrets, and failover behavior without redeploying code.",
      icon: "\u2699\ufe0f"
    },
    {
      title: "Audit trail",
      description:
        "Inspect every event from ingestion to delivery, including headers, response codes, and latency.",
      icon: "\ud83d\udcc8"
    },
    {
      title: "Dead-letter queues",
      description:
        "Automatically isolate bad payloads and recover safely once schema issues are fixed.",
      icon: "\ud83d\udee1\ufe0f"
    },
    {
      title: "Team workflows",
      description:
        "Share rule sets, add reviewers, and keep infrastructure and GTM teams aligned.",
      icon: "\ud83e\udd1d"
    }
  ],
  socialProof: {
    stats: [
      { value: "500M+", label: "events processed monthly in prior systems" },
      { value: "99.99%", label: "delivery reliability target" },
      { value: "<150ms", label: "median routing latency" }
    ],
    quotes: [
      {
        text: "FlowSync cut our webhook incident time in half within the first week.",
        author: "Nadia Kim",
        role: "Head of Platform, Mirofox"
      },
      {
        text: "We replaced three brittle scripts and gained full delivery visibility.",
        author: "Victor Hale",
        role: "Senior Engineer, Cartline"
      },
      {
        text: "Replay controls alone saved us from major launch-day churn.",
        author: "Elliot Ross",
        role: "CTO, Submerge"
      }
    ]
  },
  pricing: {
    headline: "Simple pricing that scales with event volume",
    subheadline: "Pricing locks in at launch for early waitlist teams.",
    tiers: [
      {
        name: "Starter",
        price: 0,
        description: "For early-stage products validating event flows.",
        features: [
          "Up to 100k events/month",
          "3 destinations",
          "Basic retry policy",
          "Community support"
        ],
        cta: "Get early access"
      },
      {
        name: "Growth",
        price: 149,
        description: "For teams scaling multi-source webhook pipelines.",
        features: [
          "Up to 10M events/month",
          "Unlimited destinations",
          "Advanced routing + replay",
          "Priority support"
        ],
        cta: "Lock in growth pricing",
        highlighted: true
      },
      {
        name: "Enterprise",
        price: 799,
        description: "For high-throughput platforms with strict compliance.",
        features: [
          "Custom event volume",
          "SLA + dedicated support",
          "Private networking",
          "Compliance controls"
        ],
        cta: "Talk to sales"
      }
    ]
  },
  theme: {
    primary: "#0F766E",
    primaryForeground: "#F8FAFC",
    background: "#F8FAFC",
    foreground: "#0F172A",
    muted: "#E2E8F0",
    font: "Inter",
    mode: "light",
    borderRadius: "0.75rem"
  },
  integrations: {
    resendAudienceId: process.env.RESEND_AUDIENCE_ID ?? "",
    resendApiKey: process.env.RESEND_API_KEY ?? "",
    plausibleDomain: "flowsync.app"
  },
  framework: {
    buyerPersona: "Founders and platform engineers running webhook-heavy SaaS products",
    corePain:
      "Webhook pipelines break silently, retries are manual, and incident debugging burns senior engineering time.",
    channel: "Founder-led outbound to CTOs + LinkedIn demo clips",
    phase: 1
  }
};
