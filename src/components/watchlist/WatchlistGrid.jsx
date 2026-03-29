import WatchlistCard from "./WatchlistCard";
export default function WatchlistGrid({ items }) { return <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{items.map((item) => <WatchlistCard key={item.docId || item.name} item={item} />)}</section>; }
