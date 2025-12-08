interface ScreenInfoRowProps {
  label: string;
  value: string | number;
}

/**
 * Displays a single row of screen information with label and value
 */
export function ScreenInfoRow({ label, value }: ScreenInfoRowProps) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-gray-800 last:border-b-0">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-white text-sm font-mono">{value}</span>
    </div>
  );
}
