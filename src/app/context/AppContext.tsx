import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export type Product = {
  id: string;
  name: string;
  price: number;
  images: {
    main: string;
    detail: string;
  };
  category: string;
  color: string;
  caseType: string;
  isMagSafe: boolean;
  isNew?: boolean;
  isSale?: boolean;
  isSoldOut?: boolean;
  vibe?: string;
};

type CartItem = {
  cartItemId: string;
  product: Product;
  quantity: number;
  deviceModel: string;
  caseType: string;
  color: string;
};

type User = {
  firstName: string;
  lastName: string;
  email: string;
  loyaltyPoints: number;
};

type AppContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "cartItemId">) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartExpiry: number | null;
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  deviceModel: { brand: string; model: string } | null;
  setDeviceModel: (model: { brand: string; model: string } | null) => void;
  isDeviceModalOpen: boolean;
  setIsDeviceModalOpen: (open: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Theme
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("zora_theme", newTheme);
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(newTheme);
      return newTheme;
    });
  };

  // Load from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("zora_theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartExpiry, setCartExpiry] = useState<number | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("zora_cart");
    const savedExpiry = localStorage.getItem("zora_cart_expiry");
    
    if (savedCart && savedExpiry) {
      const expiry = parseInt(savedExpiry);
      if (Date.now() < expiry) {
        setCart(JSON.parse(savedCart));
        setCartExpiry(expiry);
      } else {
        // Expired
        localStorage.removeItem("zora_cart");
        localStorage.removeItem("zora_cart_expiry");
      }
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("zora_cart", JSON.stringify(newCart));
    
    if (newCart.length > 0) {
      // 1 hour expiry
      const expiry = Date.now() + 60 * 60 * 1000;
      setCartExpiry(expiry);
      localStorage.setItem("zora_cart_expiry", expiry.toString());
    } else {
      setCartExpiry(null);
      localStorage.removeItem("zora_cart_expiry");
    }
  };

  const addToCart = (item: Omit<CartItem, "cartItemId">) => {
    const newItem = { ...item, cartItemId: Math.random().toString(36).substr(2, 9) };
    saveCart([...cart, newItem]);
    toast.success(`Added ${item.product.name} to cart`);
  };

  const removeFromCart = (cartItemId: string) => {
    const itemToRemove = cart.find(item => item.cartItemId === cartItemId);
    const newCart = cart.filter(item => item.cartItemId !== cartItemId);
    saveCart(newCart);
    
    if (itemToRemove) {
      toast("Item removed from cart", {
        action: {
          label: "Undo",
          onClick: () => saveCart([...newCart, itemToRemove])
        },
        duration: 5000
      });
    }
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity < 1 || quantity > 10) return;
    const newCart = cart.map(item =>
      item.cartItemId === cartItemId ? { ...item, quantity } : item
    );
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  // Wishlist
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("zora_wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  const saveWishlist = (newWishlist: Product[]) => {
    setWishlist(newWishlist);
    localStorage.setItem("zora_wishlist", JSON.stringify(newWishlist));
  };

  const addToWishlist = (product: Product) => {
    if (!wishlist.find(p => p.id === product.id)) {
      saveWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (productId: string) => {
    const product = wishlist.find(p => p.id === productId);
    const newWishlist = wishlist.filter(p => p.id !== productId);
    saveWishlist(newWishlist);
    
    if (product) {
      toast("Item removed from wishlist", {
        action: {
          label: "Undo",
          onClick: () => saveWishlist([...newWishlist, product])
        },
        duration: 5000
      });
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  // Recently Viewed
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("zora_recently_viewed");
    if (saved) setRecentlyViewed(JSON.parse(saved));
  }, []);

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 4);
      localStorage.setItem("zora_recently_viewed", JSON.stringify(updated));
      return updated;
    });
  };

  // Device Model
  const [deviceModel, setDeviceModel] = useState<{ brand: string; model: string } | null>(null);
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // User State
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("zora-current-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("zora-current-user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("zora-current-user");
  };

  useEffect(() => {
    const saved = localStorage.getItem("zora_device");
    if (saved) setDeviceModel(JSON.parse(saved));
  }, []);

  const saveDeviceModel = (model: { brand: string; model: string } | null) => {
    setDeviceModel(model);
    if (model) {
      localStorage.setItem("zora_device", JSON.stringify(model));
    } else {
      localStorage.removeItem("zora_device");
    }
  };

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartExpiry,
      wishlist, addToWishlist, removeFromWishlist, isInWishlist,
      recentlyViewed, addRecentlyViewed,
      deviceModel, setDeviceModel: saveDeviceModel,
      isDeviceModalOpen, setIsDeviceModalOpen,
      isSearchOpen, setIsSearchOpen,
      theme, toggleTheme,
      user, login, logout
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}