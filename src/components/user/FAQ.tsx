import { useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import SectionHeading from '@/components/user/SectionHeading';
import Reveal from '@/components/user/Reveal';
import { cn } from '@/lib/utils';

interface FaqEntry {
  question: string;
  answer: string;
}

const FAQS: FaqEntry[] = [
  {
    question: 'How do I join the community?',
    answer:
      'Drop your email below or join us on Discord. Then show up to one workshop or build night — that first visit is the whole application.',
  },
  {
    question: 'What do I get after joining?',
    answer:
      'Hands-on workshops, code reviews from core members, a team to build with, and first dibs on event seats and project roles.',
  },
  {
    question: 'How do I become a core member?',
    answer:
      'Contribute consistently for about 3 months — ship to a community project, help run events, mentor newcomers. Consistency matters more than skill level.',
  },
];

function FaqItem({ question, answer, open, onToggle }: FaqEntry & { open: boolean; onToggle: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        'rounded-2xl border transition-colors duration-300',
        open ? 'border-red-200 bg-red-50/40' : 'border-slate-200 bg-white hover:border-slate-300'
      )}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-heading text-[15px] font-semibold text-slate-950 md:text-base">
          {question}
        </span>
        <span
          className={cn(
            'grid h-8 w-8 shrink-0 place-items-center rounded-full text-white transition-all duration-300',
            open ? 'rotate-45 bg-slate-950' : 'bg-red-700'
          )}
        >
          <Plus size={18} />
        </span>
      </button>
      <div
        ref={panelRef}
        style={{ maxHeight: open ? panelRef.current?.scrollHeight : 0 }}
        className="overflow-hidden transition-[max-height] duration-300 ease-out"
      >
        <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{answer}</p>
      </div>
    </div>
  );
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      toast.error('Enter a valid email address');
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setEmail('');
      toast.success("You're on the list. Talk soon.");
    }, 700);
  };

  return (
    <section aria-label="Frequently asked questions" data-section-id="faq" className="scroll-mt-24">
      <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
      <div className="grid grid-cols-1 items-start gap-10 py-10 md:grid-cols-2 md:gap-14">
        <Reveal className="space-y-3">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.question}
              {...faq}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </Reveal>

        <Reveal delay={120} className="md:sticky md:top-28">
          <div className="relative overflow-hidden rounded-3xl border border-red-100 bg-red-700/[0.05] p-8 md:p-10">
            <div className="relative space-y-5">
              <p className="text-xs font-bold tracking-[0.22em] text-red-700 uppercase">
                Get involved
              </p>
              <h2 className="font-heading text-3xl leading-tight font-bold text-balance text-slate-950 md:text-4xl">
                How you can be part of us
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-slate-600 md:text-base">
                One email. Workshop invites, project calls, and event seats from Biratnagar
                International College — no spam, ever.
              </p>
              <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="faq-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="faq-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full flex-1 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-red-700 focus:ring-4 focus:ring-red-700/10 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-red-700 px-7 py-3.5 text-sm font-bold whitespace-nowrap text-white transition hover:-translate-y-0.5 hover:bg-red-800 active:translate-y-0 disabled:opacity-60"
                >
                  {sending ? 'Joining…' : "Let's talk"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FAQ;
