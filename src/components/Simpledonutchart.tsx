interface DonutDatum {
  label: string;
  value: number;
  color: string;
}

interface SimpleDonutChartProps {
  data: DonutDatum[];
  size?: number;
}

export default function SimpleDonutChart({ data, size = 160 }: SimpleDonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;
  const segments = data.map((d) => {
    const fraction = total > 0 ? d.value / total : 0;
    const dash = fraction * circumference;
    const offset = cumulative * circumference;
    cumulative += fraction;
    return { ...d, dash, offset, fraction };
  });

  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="flex-shrink-0">
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f5f5f5" strokeWidth={14} />
          {segments.map((s) => (
            <circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={14}
              strokeDasharray={`${s.dash} ${circumference - s.dash}`}
              strokeDashoffset={-s.offset}
              strokeLinecap="butt"
            />
          ))}
        </g>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-neutral-900"
          style={{ fontSize: 20, fontWeight: 600 }}
        >
          {total}
          {total <= 100 ? '%' : ''}
        </text>
      </svg>

      <div className="space-y-2.5">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
            <span className="text-xs text-neutral-600 font-light">{d.label}</span>
            <span className="text-xs text-neutral-400 font-mono">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}