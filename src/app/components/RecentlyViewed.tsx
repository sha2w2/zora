import { Link } from "react-router";
import { useAppContext } from "../context/AppContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ShoppingCart } from "lucide-react";

export function RecentlyViewed() {
  const { recentlyViewed, addToCart, isDeviceModalOpen, setIsDeviceModalOpen, deviceModel } = useAppContext();

  if (recentlyViewed.length === 0) return null;

  return (
    <div className="py-12 border-t border-[color:var(--bg-primary)]">
      <h2 className="text-2xl font-syne text-[color:var(--text-primary)] mb-8">Recently Viewed</h2>
      <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
        {recentlyViewed.map(product => (
          <div key={product.id} className="min-w-[200px] sm:min-w-[240px] flex-shrink-0 snap-start group relative bg-[color:var(--bg-card)] p-4 rounded-xl flex flex-col">
            <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 bg-[color:var(--bg-primary)]">
              <ImageWithFallback src={product.images.main} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex-1 flex flex-col">
              <Link to={`/product/${product.id}`} className="flex-1">
                <h3 className="font-space text-sm mb-1 text-[color:var(--text-primary)] group-hover:text-[color:var(--accent)] transition-colors">{product.name}</h3>
                <p className="font-bold text-[color:var(--text-primary)]">€{product.price.toFixed(2)}</p>
              </Link>
              <button 
                onClick={() => {
                  if (!deviceModel) {
                    setIsDeviceModalOpen(true);
                    return;
                  }
                  addToCart({
                    product,
                    quantity: 1,
                    deviceModel: `${deviceModel.brand} ${deviceModel.model}`,
                    caseType: product.caseType,
                    color: product.color
                  });
                }}
                className="w-full mt-4 py-2 border border-[color:var(--text-primary)] text-[color:var(--text-primary)] rounded-full hover:bg-[color:var(--text-primary)] hover:text-[color:var(--bg-primary)] transition-colors flex items-center justify-center gap-2 text-sm font-bold"
              >
                <ShoppingCart size={14} />
                Quick Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
