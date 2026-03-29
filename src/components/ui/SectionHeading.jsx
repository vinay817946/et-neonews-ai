export default function SectionHeading({ eyebrow, title, description }) {
  return <div>{eyebrow ? <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p> : null}<h2 className="mt-1 text-2xl font-semibold md:text-3xl">{title}</h2>{description ? <p className="mt-3 max-w-3xl text-white/70">{description}</p> : null}</div>;
}
