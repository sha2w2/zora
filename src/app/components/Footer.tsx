import { Link } from "react-router";
import { AltLogo } from "./AltLogo";
import { Instagram, Twitter, Facebook, CreditCard } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[color:var(--text-primary)] text-[color:var(--bg-primary)] py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
          <div className="flex flex-col items-start md:items-start justify-center space-y-4">
            <AltLogo className="w-12 h-12" starColor="var(--bg-primary)" zColor="var(--text-primary)" />
            <p className="font-space text-sm opacity-80 max-w-xs text-center md:text-left">
              Elevating everyday essentials into objects of desire.
            </p>
            <div className="flex gap-4 opacity-80 mt-2">
              <a href="#" className="hover:opacity-100 transition-opacity" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" className="hover:opacity-100 transition-opacity" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className="hover:opacity-100 transition-opacity" aria-label="Facebook"><Facebook size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="font-syne font-bold mb-4 uppercase tracking-widest text-sm">Shop</h3>
            <ul className="space-y-3 font-space text-sm opacity-80">
              <li><Link to="/collection" className="hover:opacity-100 hover:underline">Phone Cases</Link></li>
              <li><Link to="/collection?category=airpods" className="hover:opacity-100 hover:underline">AirPods</Link></li>
              <li><Link to="/collection?category=ipad" className="hover:opacity-100 hover:underline">iPad</Link></li>
              <li><Link to="/collection?category=accessories" className="hover:opacity-100 hover:underline">Accessories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-syne font-bold mb-4 uppercase tracking-widest text-sm">Support</h3>
            <ul className="space-y-3 font-space text-sm opacity-80">
              <li><Link to="/help" className="hover:opacity-100 hover:underline">Help & FAQ</Link></li>
              <li><Link to="/returns" className="hover:opacity-100 hover:underline">Returns & Exchanges</Link></li>
              <li><Link to="/orders" className="hover:opacity-100 hover:underline">Track Order</Link></li>
              <li><Link to="/loyalty" className="hover:opacity-100 hover:underline">Loyalty Points</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-syne font-bold mb-4 uppercase tracking-widest text-sm">About</h3>
            <ul className="space-y-3 font-space text-sm opacity-80">
              <li><Link to="/about" className="hover:opacity-100 hover:underline">My story</Link></li>
              <li><Link to="/careers" className="hover:opacity-100 hover:underline">Career</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-syne font-bold mb-4 uppercase tracking-widest text-sm">Newsletter</h3>
            <p className="font-space text-sm opacity-80 mb-4">Subscribe for early access to new drops.</p>
            <form className="flex border-b border-[color:var(--bg-primary)] pb-2 opacity-80 focus-within:opacity-100 transition-opacity">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent border-none outline-none flex-grow text-sm font-space placeholder-[color:var(--bg-primary)] placeholder-opacity-50"
              />
              <button type="submit" className="font-bold font-syne text-xs uppercase tracking-widest">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[color:var(--bg-primary)] border-opacity-20 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-space">
          <p className="opacity-60">© {new Date().getFullYear()} ZORA. All rights reserved.</p>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="opacity-60 uppercase tracking-widest font-bold">We Accept:</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"><CreditCard size={16} /> Visa</span>
              <span className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"><CreditCard size={16} /> Mastercard</span>
              <span className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"><CreditCard size={16} /> Apple Pay</span>
              <span className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"><CreditCard size={16} /> Google Pay</span>
              <span className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"><CreditCard size={16} /> PayPal</span>
            </div>
          </div>

          <div className="flex gap-4 opacity-60">
            <Link to="#" className="hover:opacity-100 transition-opacity">Terms</Link>
            <Link to="#" className="hover:opacity-100 transition-opacity">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
