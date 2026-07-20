import { Scale } from 'lucide-react';
import InfoPageHeader from './InfoPageHeader';
import SimpleBarChart from './Simplebarchart';

interface TermsOfServiceProps {
  onBack: () => void;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-semibold tracking-tight text-neutral-900 mt-8 mb-3 first:mt-0">{children}</h2>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-neutral-500 font-light leading-relaxed mb-3">{children}</p>;
}

function HeroIllustration() {
  return (
    <div className="w-full h-40 rounded-3xl bg-gradient-to-br from-neutral-900 via-stone-900 to-black relative overflow-hidden flex items-center justify-center mb-8">
      <div className="absolute top-0 left-0 w-48 h-48 bg-neutral-800 rounded-full -ml-12 -mt-12 blur-3xl opacity-40" />
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-stone-800 rounded-full blur-3xl opacity-30" />
      <div className="relative z-10 w-16 h-16 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
        <Scale className="w-8 h-8 text-amber-300" />
      </div>
    </div>
  );
}

export default function TermsOfService({ onBack }: TermsOfServiceProps) {
  return (
    <div id="terms-of-service-page" className="w-full min-h-screen bg-white">
      <InfoPageHeader title="Terms of Service" onBack={onBack} />

      <div className="max-w-2xl mx-auto px-5 py-8">
        <HeroIllustration />

        <Paragraph>
          These Terms of Service govern your use of the LUXE Mall platform, membership program, and concierge
          booking services. By creating an account, you agree to the terms outlined below.
        </Paragraph>

        <SectionHeading>Membership Tier Thresholds</SectionHeading>
        <Paragraph>
          Tiers are unlocked automatically as your points balance grows through bookings and purchases:
        </Paragraph>
        <div className="bg-neutral-50 rounded-2xl p-6 my-4">
          <SimpleBarChart
            suffix=" pts"
            data={[
              { label: 'Signature', value: 0, color: '#a3a3a3' },
              { label: 'Elite', value: 25, color: '#525252' },
              { label: 'Prestige', value: 50, color: '#262626' },
              { label: 'Inner Circle', value: 100, color: '#0a0a0a' },
            ]}
          />
          <p className="text-[10px] text-neutral-400 font-light mt-4">
            Bar length shown proportionally (Signature: 0 · Elite: 2,500 · Prestige: 5,000 · Inner Circle:
            10,000 points)
          </p>
        </div>

        <SectionHeading>Reservations & Cancellations</SectionHeading>
        <Paragraph>
          Bookings made through the platform — including personal shopping consultations, private fitting
          suites, valet parking, and lounge access — are subject to availability. Please arrive within 15
          minutes of your scheduled slot; late arrivals may result in forfeiture of the reservation.
        </Paragraph>

        <SectionHeading>Conduct</SectionHeading>
        <Paragraph>
          Members and guests are expected to treat boutique staff, concierge personnel, and fellow guests with
          respect. LUXE Mall reserves the right to suspend membership privileges in cases of abuse, fraud, or
          repeated no-shows.
        </Paragraph>

        <SectionHeading>Liability</SectionHeading>
        <Paragraph>
          LUXE Mall facilitates reservations with independent boutiques and service providers. Product
          quality, pricing, and in-store experiences are the responsibility of the respective retailer.
        </Paragraph>

        <SectionHeading>Changes to These Terms</SectionHeading>
        <Paragraph>
          We may update these terms from time to time. Continued use of the platform after changes take
          effect constitutes acceptance of the revised terms.
        </Paragraph>
      </div>
    </div>
  );
}