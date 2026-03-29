const globalForWatchlist = globalThis;

if (!globalForWatchlist.__etWatchlist) {
  globalForWatchlist.__etWatchlist = [];
}

export function getWatchlistStore() {
  return globalForWatchlist.__etWatchlist;
}
