interface BarChartDatum {
  label: string;
  value: number; // 0-100
  color?: string;
}

interface SimpleBarChartProps {
  data: BarChartDatum[];
  suffix?: string;
}

export default function SimpleBarChart({ data, suffix = '%' }: SimpleBarChartProps) {
  return (
    <div className="space-y-4">
      {data.map((d) => (
        <div key={d.label}>
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="text-xs text-neutral-700 font-medium">{d.label}</span>
            <span className="text-xs text-neutral-400 font-mono">
              {d.value}
              {suffix}
            </span>
          </div>
          <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(100, d.value)}%`,
                backgroundColor: d.color || '#0a0a0a',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}