export function Logo({ size = 28 }: { size?: number }) {
  // Mini Amiga Guru Meditation banner: red border on black with the iconic
  // "GURU" wordmark hinting at the original system error screen.
  const w = size * 2;
  const h = size;
  return (
    <svg width={w} height={h} viewBox="0 0 64 32" aria-hidden="true">
      <rect x="1.5" y="1.5" width="61" height="29" rx="2" fill="#000" stroke="#ff2222" strokeWidth="3" />
      <text
        x="32"
        y="22"
        textAnchor="middle"
        fill="#ff2222"
        fontFamily="ui-monospace, Menlo, Consolas, monospace"
        fontWeight="700"
        fontSize="14"
        letterSpacing="0.5"
      >
        GURU
      </text>
    </svg>
  );
}
