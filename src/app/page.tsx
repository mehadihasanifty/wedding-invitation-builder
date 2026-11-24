import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  Layers3,
  Music2,
  Play,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const conceptPreviews = [
  { name: "The Conservatory", style: "Botanical · Garden ceremony", initials: "A & M", date: "A day in bloom", palette: "from-[#e8eadc] via-[#f7f3e8] to-[#d4ddd0]", accent: "text-[#425c49]", detail: "A softer kind of forever" },
  { name: "The Heirloom", style: "Classic · Evening celebration", initials: "S & R", date: "Together, at last", palette: "from-[#f0dfcf] via-[#faf1e5] to-[#e6c8ba]", accent: "text-[#773c42]", detail: "Please join us for our wedding" },
  { name: "The Keepsake", style: "Modern · Intimate gathering", initials: "N & I", date: "Written in the stars", palette: "from-[#e7e4dd] via-[#f8f5ee] to-[#dad6cd]", accent: "text-[#504d49]", detail: "A celebration of two hearts" },
];

const steps = [
  { number: "01", icon: Layers3, title: "Find your feeling", description: "Explore invitation styles and choose a starting point that feels like the two of you." },
  { number: "02", icon: Sparkles, title: "Make it yours", description: "Add your names, celebration details, and the little touches that tell your story." },
  { number: "03", icon: Heart, title: "Share the joy", description: "When your invitation is ready, send one thoughtful link to the people you love." },
];

const features = [
  { icon: Sparkles, title: "A look that feels like you", description: "Choose a visual direction, then make the words and details your own." },
  { icon: Clock3, title: "The details, together", description: "Bring your date, celebration schedule, and venue into one considered place." },
  { icon: Music2, title: "Little moments of delight", description: "A digital invitation can make room for movement, music, and a warm welcome." },
  { icon: UsersRound, title: "Made to be shared", description: "Give guests a simple, mobile-friendly way to open your invitation." },
];

const faqs = [
  { question: "What is a digital wedding invitation?", answer: "It is a personal invitation your guests can open from a link on their phone, tablet, or computer." },
  { question: "Can guests view an invitation on a phone?", answer: "The invitation experience is being designed to feel clear and comfortable on smaller screens as well as desktop." },
  { question: "Do I need design or coding experience?", answer: "The builder is intended to help couples shape an invitation through guided controls, without writing code." },
  { question: "Can I include several wedding events?", answer: "The product plan includes support for multiple celebrations such as a ceremony and reception. That feature is still to come." },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <SiteHeader />
      <section className="relative isolate">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_22%,color-mix(in_oklch,var(--brand-champagne),transparent_65%),transparent_42%),linear-gradient(180deg,var(--brand-ivory),color-mix(in_oklch,var(--brand-parchment),white_25%))]" />
        <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-page pb-20 pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 lg:pb-24 lg:pt-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:mx-0">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand-rose-gold/20 bg-card/70 px-4 py-2 text-xs font-medium tracking-[0.15em] text-brand-burgundy shadow-soft"><span className="size-1.5 rounded-full bg-brand-rose-gold" />YOUR STORY, BEAUTIFULLY INVITED</div>
            <h1 className="max-w-2xl text-5xl leading-[1.04] tracking-[-0.045em] sm:text-7xl lg:text-[5.35rem]">An invitation<br />to your <span className="italic text-primary">forever.</span></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">Gather your favorite people around a day that is yours. Create a digital wedding invitation with all the details, wrapped in a little wonder.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button render={<Link href="/templates" />} size="lg" className="w-full sm:w-auto">Explore invitation styles <ArrowRight aria-hidden="true" /></Button>
              <Button render={<a href="#how-it-works" />} variant="ghost" size="lg" className="w-full sm:w-auto"><Play aria-hidden="true" className="fill-current" /> See how it works</Button>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Check aria-hidden="true" className="size-4 text-brand-botanical" /> Made for every screen</span>
              <span className="inline-flex items-center gap-2"><Check aria-hidden="true" className="size-4 text-brand-botanical" /> Your details, your way</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[590px] lg:ml-auto">
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-champagne/55 blur-3xl" />
            <div className="relative aspect-[1.02/1]">
              <div className="absolute left-[7%] top-[7%] h-[72%] w-[64%] rotate-[-8deg] rounded-t-[48%] rounded-b-[44%] border border-white/70 bg-gradient-to-br from-[#d6ded1] via-[#f4eadb] to-[#c5d0c1] shadow-[0_35px_80px_-32px_rgba(58,48,37,0.35)]"><div className="absolute inset-[5%] rounded-t-[48%] rounded-b-[44%] border border-white/70" /></div>
              <div className="absolute right-[7%] top-[3%] h-[78%] w-[58%] rotate-[7deg] rounded-t-[48%] rounded-b-[44%] border border-white/70 bg-gradient-to-br from-[#c4d0bf] via-[#e7dfcf] to-[#b9c9bc] shadow-[0_35px_80px_-30px_rgba(58,48,37,0.3)]"><div className="absolute inset-[5%] rounded-t-[48%] rounded-b-[44%] border border-white/70" /></div>
              <div className="absolute left-[21%] top-[11%] flex h-[76%] w-[60%] -rotate-[2deg] flex-col items-center justify-center overflow-hidden rounded-t-[48%] rounded-b-[44%] border border-white/80 bg-gradient-to-b from-[#fbf7ed] via-[#f8f1e5] to-[#efe2d0] text-center shadow-[0_32px_70px_-24px_rgba(57,41,32,0.35)]">
                <div aria-hidden="true" className="absolute inset-[4%] rounded-t-[48%] rounded-b-[44%] border border-brand-rose-gold/25" />
                <div aria-hidden="true" className="absolute inset-x-0 top-[12%] h-20 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--brand-champagne),transparent_25%),transparent_72%)]" />
                <span className="relative text-[0.52rem] uppercase tracking-[0.16em] text-brand-botanical sm:text-xs sm:tracking-[0.2em]">Together with family</span>
                <span className="relative mt-6 font-heading text-[clamp(2.3rem,6vw,4.3rem)] leading-[0.9] text-brand-burgundy">A &amp; M</span>
                <span className="relative mt-5 font-serif text-[clamp(0.55rem,1.2vw,0.75rem)] uppercase tracking-[0.25em] text-stone-600">Invite you to celebrate</span>
                <span aria-hidden="true" className="relative my-5 h-px w-12 bg-brand-rose-gold/70" />
                <span className="relative font-serif text-[clamp(0.65rem,1.4vw,0.9rem)] text-stone-700">A day in bloom</span>
                <span className="relative mt-2 font-serif text-[clamp(0.55rem,1.1vw,0.72rem)] uppercase tracking-[0.2em] text-stone-600">Save the date</span>
              </div>
              <div className="absolute bottom-[7%] left-[3%] hidden rounded-2xl border border-white/80 bg-card/90 p-4 shadow-soft backdrop-blur sm:block motion-safe:animate-[float_6s_ease-in-out_infinite]">
                <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-secondary text-primary"><Heart aria-hidden="true" className="size-4" /></span><span><span className="block text-sm font-medium">A little more personal</span><span className="mt-0.5 block text-xs text-muted-foreground">Every detail in one place</span></span></div>
              </div>
              <span className="absolute right-[2%] top-[16%] grid size-11 place-items-center rounded-full border border-white/80 bg-card/80 text-brand-rose-gold shadow-soft motion-safe:animate-[float_7s_ease-in-out_infinite]"><Sparkles aria-hidden="true" className="size-5" /></span>
              <span className="absolute bottom-[14%] right-[8%] rounded-full border border-white/80 bg-card/90 px-4 py-2 text-xs text-muted-foreground shadow-soft">A digital keepsake</span>
            </div>
            <p className="mt-1 text-center text-xs tracking-wide text-muted-foreground">A visual concept for the invitation experience</p>
          </div>
        </div>
      </section>

      <section id="concepts" aria-labelledby="concepts-title" className="scroll-mt-8 py-section">
        <div className="mx-auto max-w-7xl px-page">
          <SectionHeading eyebrow="A FEW WAYS TO BEGIN" title="Find a style that feels like you" description="An early look at the visual directions the invitation collection can explore. These are design concepts, not selectable templates yet." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {conceptPreviews.map((preview, index) => <article key={preview.name} className="group">
              <div className={`relative aspect-[0.91/1] overflow-hidden rounded-[1.7rem] bg-gradient-to-br ${preview.palette} p-6 shadow-soft transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none`}>
                <div aria-hidden="true" className="absolute inset-3 rounded-[1.35rem] border border-white/60" /><div aria-hidden="true" className="absolute -right-12 -top-14 size-48 rounded-full border border-white/55" /><div aria-hidden="true" className="absolute -bottom-12 -left-10 size-52 rounded-full border border-white/55" />
                <div className={`relative mx-auto flex h-full max-w-[78%] flex-col items-center justify-center rounded-t-[48%] rounded-b-[42%] border border-white/80 bg-[#fffdf8]/80 px-5 text-center shadow-[0_20px_50px_-28px_rgba(51,39,31,0.35)] backdrop-blur-sm transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none ${preview.accent}`}>
                  <span className="text-[0.6rem] uppercase tracking-[0.22em]">An invitation</span><span className="mt-5 font-heading text-4xl leading-none">{preview.initials}</span><span aria-hidden="true" className="my-4 h-px w-9 bg-brand-rose-gold/65" /><span className="font-serif text-sm text-stone-700">{preview.detail}</span><span className="mt-3 font-serif text-[0.6rem] uppercase tracking-[0.18em] text-stone-500">{preview.date}</span>
                </div>
                <span className="absolute right-8 top-8 grid size-9 place-items-center rounded-full bg-white/70 text-brand-rose-gold"><Sparkles aria-hidden="true" className="size-4" /></span>
              </div>
              <div className="flex items-start justify-between gap-4 px-1 pt-4"><div><h3 className="font-heading text-xl">{preview.name}</h3><p className="mt-1 text-sm text-muted-foreground">{preview.style}</p></div><span aria-label={`Concept ${index + 1}`} className="mt-1 font-mono text-xs text-muted-foreground">0{index + 1}</span></div>
            </article>)}
          </div>
        </div>
      </section>

      <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-8 bg-secondary/55 py-section">
        <div className="mx-auto max-w-7xl px-page"><SectionHeading eyebrow="THOUGHTFULLY SIMPLE" title="From first idea to the first hello" description="A gentle path for bringing the details of your celebration together." />
          <div className="relative mt-12 grid gap-5 md:grid-cols-3"><div aria-hidden="true" className="absolute left-[16%] right-[16%] top-9 hidden border-t border-dashed border-brand-rose-gold/40 md:block" />
            {steps.map((step) => { const Icon = step.icon; return <article key={step.number} className="relative rounded-2xl border border-border/70 bg-card/80 p-6 shadow-soft sm:p-8"><div className="flex items-center justify-between"><span className="grid size-12 place-items-center rounded-full border border-brand-rose-gold/30 bg-brand-ivory text-primary"><Icon aria-hidden="true" className="size-5" /></span><span className="font-mono text-xs tracking-widest text-brand-rose-gold">{step.number}</span></div><h3 className="mt-7 font-heading text-2xl">{step.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p></article>; })}
          </div>
        </div>
      </section>

      <section id="features" aria-labelledby="features-title" className="scroll-mt-8 py-section">
        <div className="mx-auto grid max-w-7xl gap-12 px-page lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          <div><SectionHeading eyebrow="THE THOUGHT BEHIND IT" title="More than a date and a place" description="A wedding invitation can hold the practical details and the feeling of the day, all in one welcoming experience." /><Button render={<a href="#mobile-experience" />} variant="outline" className="mt-7">See the invitation experience <ArrowDown aria-hidden="true" /></Button></div>
          <div className="grid gap-3 sm:grid-cols-2">{features.map((feature) => { const Icon = feature.icon; return <article key={feature.title} className="rounded-2xl border border-border/70 bg-card p-5 transition-colors hover:border-brand-rose-gold/35 hover:bg-card/80 sm:p-6 motion-reduce:transition-none"><span className="grid size-10 place-items-center rounded-xl bg-secondary text-primary"><Icon aria-hidden="true" className="size-5" /></span><h3 className="mt-5 font-heading text-xl">{feature.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p></article>; })}</div>
        </div>
      </section>

      <section id="mobile-experience" aria-labelledby="mobile-title" className="scroll-mt-8 px-page pb-section">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#332a28] px-6 py-12 text-[#fbf7ef] sm:px-12 sm:py-16 lg:px-20">
          <div aria-hidden="true" className="absolute -right-28 -top-40 size-[28rem] rounded-full border border-white/10" /><div aria-hidden="true" className="absolute -right-12 -top-24 size-[23rem] rounded-full border border-white/10" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]"><div className="max-w-xl"><p className="text-xs font-medium uppercase tracking-[0.2em] text-[#e4b7a7]">A welcome in their pocket</p><h2 id="mobile-title" className="mt-4 font-heading text-4xl leading-tight sm:text-5xl">Your invitation, wherever they are.</h2><p className="mt-5 text-sm leading-7 text-white/70 sm:text-base">A considered digital invitation makes it easy for loved ones to find the time, place, and meaning of your celebration from the screen they already carry.</p><ul className="mt-7 space-y-3 text-sm text-white/80"><li className="flex items-start gap-3"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#e4b7a7]" /> Easy-to-read details on a small screen</li><li className="flex items-start gap-3"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#e4b7a7]" /> A personal welcome, shared with a link</li></ul></div>
            <div className="relative mx-auto w-full max-w-[270px]"><div className="rounded-[2.6rem] border border-white/20 bg-[#171413] p-2.5 shadow-[0_30px_70px_-28px_rgba(0,0,0,0.8)]"><div className="relative flex aspect-[9/17] flex-col items-center overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#dce3d7] via-[#f8f1e6] to-[#eee0ce] px-5 pb-7 pt-12 text-center text-stone-800"><span className="absolute left-1/2 top-2 h-4 w-20 -translate-x-1/2 rounded-full bg-[#171413]" /><span className="text-[0.58rem] uppercase tracking-[0.2em] text-brand-botanical">Together with their families</span><span className="mt-9 font-heading text-4xl text-brand-burgundy">A &amp; M</span><span aria-hidden="true" className="my-4 h-px w-10 bg-brand-rose-gold" /><span className="font-serif text-sm">Invite you to celebrate</span><span className="mt-2 font-heading text-2xl italic text-brand-burgundy">their forever</span><div className="mt-auto w-full rounded-2xl border border-white/70 bg-white/55 p-3 text-left shadow-soft"><span className="block text-[0.58rem] uppercase tracking-[0.15em] text-brand-botanical">The celebration</span><span className="mt-1 block font-serif text-xs">Saturday, the fourteenth of June</span><span className="mt-1 block text-[0.62rem] text-muted-foreground">Ceremony · Dinner · Dancing</span></div><span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-burgundy px-3 py-1.5 text-[0.62rem] text-white"><Heart aria-hidden="true" className="size-3" /> With love</span></div></div><p className="mt-4 text-center text-xs text-white/55">An illustrative mobile concept</p></div>
          </div>
        </div>
      </section>

      <FAQSection />
      <section className="px-page pb-section"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 rounded-[2rem] border border-brand-rose-gold/15 bg-gradient-to-br from-card via-brand-parchment/70 to-brand-champagne/25 p-7 shadow-soft sm:p-10 lg:flex-row lg:items-center lg:p-14"><div className="max-w-2xl"><p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-botanical">THE FIRST CHAPTER</p><h2 className="mt-3 font-heading text-3xl leading-tight sm:text-4xl">Every great day begins with an invitation.</h2><p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">Explore the design direction and see what we are creating for your celebration.</p></div><Button render={<a href="#concepts" />} size="lg" className="w-full shrink-0 sm:w-auto">Explore the concepts <ArrowRight aria-hidden="true" /></Button></div></section>
      <SiteFooter />
    </main>
  );
}

function SiteHeader() {
  return <header className="relative z-20 border-b border-border/60 bg-background/85 backdrop-blur-md"><div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-page py-4">
    <Link href="/" aria-label="Everafter home" className="flex shrink-0 items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm"><Heart aria-hidden="true" className="size-4" /></span><span><span className="block font-heading text-xl leading-none">Everafter</span><span className="mt-1 block text-[0.6rem] tracking-[0.2em] text-muted-foreground">WEDDING INVITATIONS</span></span></Link>
    <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex"><a className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="#concepts">Invitation styles</a><a className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="#how-it-works">How it works</a><a className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="#features">Features</a><a className="text-sm text-muted-foreground transition-colors hover:text-foreground" href="#faq">FAQ</a></nav>
    <div className="flex items-center gap-2"><Link href="/login" className="hidden rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground sm:inline-flex">Sign in</Link><Button render={<Link href="/register" />} size="sm">Create account</Button></div>
  </div></header>;
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-botanical">{eyebrow}</p><h2 className="mt-3 text-3xl leading-tight sm:text-4xl">{title}</h2><p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">{description}</p></div>;
}

function FAQSection() {
  return <section id="faq" aria-labelledby="faq-title" className="scroll-mt-8 bg-secondary/45 py-section"><div className="mx-auto grid max-w-7xl gap-10 px-page lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-botanical">A FEW GOOD QUESTIONS</p><h2 id="faq-title" className="mt-3 text-3xl leading-tight sm:text-4xl">Good to know.</h2><p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">A little more about digital invitations and the experience we are shaping.</p></div><div className="divide-y divide-border/80 border-y border-border/80">{faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left font-medium marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden"><span>{faq.question}</span><ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" /></summary><p className="max-w-2xl pr-8 pt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p></details>)}</div></div></section>;
}

function SiteFooter() {
  return <footer className="bg-[#282220] text-[#f8f3eb]"><div className="mx-auto grid max-w-7xl gap-10 px-page py-12 md:grid-cols-[1.2fr_0.8fr] md:items-end"><div><Link href="/" className="inline-flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-[#e4b7a7]"><Heart aria-hidden="true" className="size-4" /></span><span className="font-heading text-2xl">Everafter</span></Link><p className="mt-4 max-w-md text-sm leading-6 text-white/60">A thoughtful beginning for the invitation to your next chapter.</p></div><nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65 md:justify-end"><a className="inline-flex min-h-10 items-center transition-colors hover:text-white" href="#concepts">Invitation styles</a><a className="inline-flex min-h-10 items-center transition-colors hover:text-white" href="#how-it-works">How it works</a><a className="inline-flex min-h-10 items-center transition-colors hover:text-white" href="#features">Features</a><a className="inline-flex min-h-10 items-center transition-colors hover:text-white" href="#faq">FAQ</a></nav></div><div className="border-t border-white/10 px-page py-4 text-center text-xs text-white/45">Everafter. Created with care.</div></footer>;
}
