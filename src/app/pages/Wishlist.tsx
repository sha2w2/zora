import { Link } from "react-router";
import { useAppContext } from "../context/AppContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ShoppingCart, Trash2 } from "lucide-react";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useAppContext();

  const handleAddAll = () => {
    wishlist.forEach(item => {
      addToCart({
        product: item,
        quantity: 1,
        deviceModel: "iPhone 16 Pro",
        caseType: "Snap",
        color: "Default"
      });
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-4xl md:text-5xl font-syne text-[color:var(--text-primary)]">Your Wishlist</h1>
        {wishlist.length > 0 && (
          <button 
            onClick={handleAddAll}
            className="hidden sm:block text-sm border-b border-[color:var(--text-primary)] pb-1 hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
          >
            Add All to Cart
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 bg-[color:var(--bg-card)] rounded-2xl">
          <div className="w-16 h-16 rounded-full bg-[color:var(--bg-primary)] flex items-center justify-center text-[color:var(--text-primary)] opacity-50 mb-4">
            <Trash2 size={24} />
          </div>
          <h2 className="text-2xl font-syne text-[color:var(--text-primary)]">Your wishlist is empty.</h2>
          <p className="text-[color:var(--text-primary)] opacity-70 max-w-md">
            Browse our collections to find designs you'll love.
          </p>
          <Link 
            to="/collection"
            className="px-8 py-3 bg-[color:var(--accent)] text-[color:var(--text-on-accent)] font-bold rounded-full hover:opacity-90 transition-opacity"
          >
            Shop Phone Cases
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map(item => (
              <div key={item.id} className="group relative bg-[color:var(--bg-card)] p-4 rounded-xl flex flex-col">
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full bg-[color:var(--bg-primary)] flex items-center justify-center text-[color:var(--text-primary)] hover:text-[color:var(--accent)] transition-colors"
                >
                  <Trash2 size={14} />
                </button>
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 bg-[color:var(--bg-primary)]">
                  <ImageWithFallback src={item.images.main} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-1 flex flex-col">
                  <Link to={`/product/${item.id}`} className="flex-1">
                    <h3 className="font-space text-sm mb-1 text-[color:var(--text-primary)] group-hover:text-[color:var(--accent)] transition-colors">{item.name}</h3>
                    <p className="font-bold text-[color:var(--text-primary)]">€{item.price.toFixed(2)}</p>
                  </Link>
                  <button 
                    onClick={() => addToCart({
                      product: item,
                      quantity: 1,
                      deviceModel: "iPhone 16 Pro",
                      caseType: "Snap",
                      color: "Default"
                    })}
                    className="w-full mt-4 py-2 border border-[color:var(--text-primary)] text-[color:var(--text-primary)] rounded-full hover:bg-[color:var(--text-primary)] hover:text-[color:var(--bg-primary)] transition-colors flex items-center justify-center gap-2 text-sm font-bold"
                  >
                    <ShoppingCart size={14} />
                    Quick Add
                  </button>
                </div>
              </div>
            ))}
          </div>
          {wishlist.length > 0 && (
            <div className="mt-8 text-center sm:hidden">
              <button 
                onClick={handleAddAll}
                className="text-sm border-b border-[color:var(--text-primary)] pb-1 hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
              >
                Add All to Cart
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}