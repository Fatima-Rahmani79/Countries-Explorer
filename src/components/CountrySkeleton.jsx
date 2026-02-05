import "./CountrySkeleton.css";

function CountrySkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-flag"></div>
      <div className="skeleton-body">
        <div className="skeleton-line title"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
      </div>
    </div>
  );
}

export default CountrySkeleton;
