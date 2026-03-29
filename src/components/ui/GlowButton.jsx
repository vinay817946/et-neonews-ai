export default function GlowButton({ children, href, variant = "solid", className = "" }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300";
  const solid = "bg-white text-slate-950 shadow-[0_12px_30px_rgba(255,255,255,0.18)] hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(255,255,255,0.24)]";
  const ghost = "border border-white/10 bg-white/5 text-white hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-white/10 hover:shadow-[0_16px_40px_rgba(69,167,255,0.12)]";
  const classes = `${base} ${variant === "solid" ? solid : ghost} ${className}`;
  if (href) return <a href={href} className={classes}>{children}</a>;
  return <button className={classes}>{children}</button>;
}
