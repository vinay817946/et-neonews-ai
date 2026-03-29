export default function GlassCard({ className = "", children }) {
  return <div className={`neo-panel rounded-[32px] ${className}`}>{children}</div>;
}
