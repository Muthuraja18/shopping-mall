import { ArrowLeft } from 'lucide-react';

interface InfoPageHeaderProps {
  title: string;
  onBack: () => void;
}

export default function InfoPageHeader({ title, onBack }: InfoPageHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-neutral-100 px-5 py-4 flex items-center gap-3">
      <button
        onClick={onBack}
        className="p-2 -ml-2 hover:bg-neutral-100 rounded-full text-neutral-500 hover:text-black transition-colors cursor-pointer"
        aria-label="Back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <h1 className="text-base font-semibold tracking-tight">{title}</h1>
    </div>
  );
}