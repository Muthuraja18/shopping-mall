import { Leaf, Recycle, Sun } from 'lucide-react';
import InfoPageHeader from './InfoPageHeader';
import SimpleBarChart from './Simplebarchart';

interface SustainabilityProps {
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
      <div className="absolute top-0 left-0 w-48 h-48 bg-green-900 rounded-full -ml-12 -mt-12 blur-3xl opacity-30" />
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-amber-900 rounded-full blur-3xl opacity-20" />
      <div className="relative z-10 w-16 h-16 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
        <Leaf className="w-8 h-8 text-green-400" />
      </div>
    </div>
  );
}

export default function Sustainability({ onBack }: SustainabilityProps) {
  return (
    <div id="sustainability-page" className="w-full min-h-screen bg-white">
      <InfoPageHeader title="Sustainability" onBack={onBack} />

      <div className="max-w-2xl mx-auto px-5 py-8">
        <HeroIllustration />

        <Paragraph>
          LUXE Mall is committed to reducing our environmental footprint while continuing to deliver an
          elevated retail experience.
        </Paragraph>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 mb-2">
          <div className="p-5 bg-neutral-50 rounded-2xl text-center">
            <Sun className="w-5 h-5 text-amber-500 mx-auto mb-2" />
            <h4 className="text-xs font-semibold text-neutral-900 mb-1">Solar Powered</h4>
            <p className="text-[10px] text-neutral-500 font-light leading-relaxed">
              Rooftop solar arrays offset a significant portion of our common-area energy use.
            </p>
          </div>
          <div className="p-5 bg-neutral-50 rounded-2xl text-center">
            <Recycle className="w-5 h-5 text-neutral-700 mx-auto mb-2" />
            <h4 className="text-xs font-semibold text-neutral-900 mb-1">Circular Packaging</h4>
            <p className="text-[10px] text-neutral-500 font-light leading-relaxed">
              Partner boutiques use recyclable or reusable packaging across in-store purchases.
            </p>
          </div>
          <div className="p-5 bg-neutral-50 rounded-2xl text-center">
            <Leaf className="w-5 h-5 text-green-600 mx-auto mb-2" />
            <h4 className="text-xs font-semibold text-neutral-900 mb-1">Green Valet Fleet</h4>
            <p className="text-[10px] text-neutral-500 font-light leading-relaxed">
              Our valet service prioritizes electric and hybrid vehicles for guest pickups.
            </p>
          </div>
        </div>

        <SectionHeading>Our Impact So Far</SectionHeading>
        <Paragraph>Progress against our current environmental targets:</Paragraph>
        <div className="bg-neutral-50 rounded-2xl p-6 my-4">
          <SimpleBarChart
            data={[
              { label: 'Renewable energy coverage', value: 62, color: '#fbbf24' },
              { label: 'Recycled / reusable packaging', value: 78, color: '#16a34a' },
              { label: 'Electric & hybrid valet fleet', value: 45, color: '#0a0a0a' },
            ]}
          />
        </div>

        <SectionHeading>Our Commitments</SectionHeading>
        <Paragraph>
          We work with boutique partners to encourage responsibly sourced materials, reduce single-use
          plastics in guest-facing services, and offset carbon emissions associated with mall-wide events
          such as trunk shows and seasonal launches.
        </Paragraph>

        <SectionHeading>Get Involved</SectionHeading>
        <Paragraph>
          Inner Circle members are invited to quarterly sustainability briefings hosted in the Skylight
          Conservatory, where we share updates on our environmental initiatives and gather member feedback.
        </Paragraph>
      </div>
    </div>
  );
}