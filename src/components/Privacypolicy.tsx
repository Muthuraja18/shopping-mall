import { ShieldCheck } from 'lucide-react';
import InfoPageHeader from './InfoPageHeader';
import SimpleDonutChart from './Simpledonutchart';

interface PrivacyPolicyProps {
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
      <div className="absolute top-0 right-0 w-48 h-48 bg-neutral-800 rounded-full -mr-12 -mt-12 blur-3xl opacity-40" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-stone-800 rounded-full blur-3xl opacity-30" />
      <div className="relative z-10 w-16 h-16 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
        <ShieldCheck className="w-8 h-8 text-amber-300" />
      </div>
    </div>
  );
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div id="privacy-policy-page" className="w-full min-h-screen bg-white">
      <InfoPageHeader title="Privacy Policy" onBack={onBack} />

      <div className="max-w-2xl mx-auto px-5 py-8">
        <HeroIllustration />

        <Paragraph>
          LUXE Mall ("we", "us", "our") is committed to protecting the privacy of every member, visitor, and
          guest who interacts with our boutiques, concierge services, and digital platform. This policy
          explains what information we collect and how it is used.
        </Paragraph>

        <SectionHeading>What We Collect</SectionHeading>
        <Paragraph>
          A breakdown of the categories of information tied to your LUXE account:
        </Paragraph>
        <div className="bg-neutral-50 rounded-2xl p-6 my-4">
          <SimpleDonutChart
            data={[
              { label: 'Account Info', value: 40, color: '#0a0a0a' },
              { label: 'Booking Data', value: 35, color: '#a3a3a3' },
              { label: 'Preferences', value: 25, color: '#fbbf24' },
            ]}
          />
        </div>

        <SectionHeading>How We Use Your Information</SectionHeading>
        <Paragraph>
          Your information is used to manage your membership tier and loyalty points, confirm and manage
          reservations, personalize concierge recommendations, and send service-related communications such
          as booking confirmations.
        </Paragraph>

        <SectionHeading>Data Sharing</SectionHeading>
        <Paragraph>
          We do not sell your personal information to third parties. Limited booking details (such as your
          name and reservation time) are shared with the specific boutique or service you reserve with,
          solely to fulfill that reservation.
        </Paragraph>

        <SectionHeading>Your Rights</SectionHeading>
        <Paragraph>
          You may request a copy of your data, ask us to correct inaccuracies, or request deletion of your
          account at any time by contacting our support team.
        </Paragraph>

        <SectionHeading>Contact</SectionHeading>
        <Paragraph>
          For any privacy-related questions or requests, reach us at{' '}
          <a href="mailto:privacy@luxemall.example" className="text-neutral-800 underline">
            privacy@luxemall.example
          </a>
          .
        </Paragraph>
      </div>
    </div>
  );
}