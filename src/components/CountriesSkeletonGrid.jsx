import CountrySkeleton from "./CountrySkeleton";

function CountriesSkeletonGrid({ count = 8 }) {
  return (
    <div className="countries-grid">
      {Array.from({ length: count }).map((_, i) => (
        <CountrySkeleton key={i} />
      ))}
    </div>
  );
}

export default CountriesSkeletonGrid;
