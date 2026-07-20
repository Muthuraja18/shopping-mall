import { Mail, Phone, MapPin, Clock, Headset } from 'lucide-react';
import InfoPageHeader from './InfoPageHeader';
import SimpleBarChart from './Simplebarchart';

interface ContactUsProps {
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
        <Headset className="w-8 h-8 text-amber-300" />
      </div>
    </div>
  );
}

export default function ContactUs({ onBack }: ContactUsProps) {
  return (
    <div id="contact-us-page" className="w-full min-h-screen bg-white">
      <InfoPageHeader title="Contact Us" onBack={onBack} />

      <div className="max-w-2xl mx-auto px-5 py-8">
        <HeroIllustration />

        <Paragraph>
          Our concierge team is available to assist with membership questions, reservation support, and
          general inquiries.
        </Paragraph>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-2xl">
            <MapPin className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold block mb-0.5">
                Location
              </span>
              <span className="text-xs text-neutral-700 font-light">
                LUXE Mall Grand Lobby, Main Entrance
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-2xl">
            <Phone className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold block mb-0.5">
                Phone
              </span>
              <a href="tel:+18005893392" className="text-xs text-neutral-700 font-light hover:underline">
                +1 (800) LUXE-MALL
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-2xl">
            <Mail className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold block mb-0.5">
                Email
              </span>
              <a href="mailto:concierge@luxemall.example" className="text-xs text-neutral-700 font-light hover:underline">
                concierge@luxemall.example
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-2xl">
            <Clock className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold block mb-0.5">
                Hours
              </span>
              <span className="text-xs text-neutral-700 font-light">Daily, 10:00 AM – 10:00 PM</span>
            </div>
          </div>
        </div>

        <SectionHeading>Typical Response Speed</SectionHeading>
        <Paragraph>How quickly you can expect to hear back, by channel:</Paragraph>
        <div className="bg-neutral-50 rounded-2xl p-6 my-4">
          <SimpleBarChart
            suffix=""
            data={[
              { label: 'AI Concierge (in-app)', value: 98, color: '#fbbf24' },
              { label: 'Phone', value: 85, color: '#0a0a0a' },
              { label: 'Email', value: 40, color: '#a3a3a3' },
            ]}
          />
          <p className="text-[10px] text-neutral-400 font-light mt-4">
            Bar length reflects relative response speed — AI Concierge: instant · Phone: under 10 min ·
            Email: within 4 hours
          </p>
        </div>

        <SectionHeading>Fastest Way to Reach Us</SectionHeading>
        <Paragraph>
          For anything reservation-related, the AI Concierge inside the app can usually resolve your request
          instantly — try asking it directly from the home screen.
        </Paragraph>
      </div>
    </div>
  );
}