import { Link, useNavigate } from "react-router";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [countdown, setCountdown] = useState(7);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-8xl font-syne text-[color:var(--accent)] mb-6">404</h1>
      <h2 className="text-3xl font-syne text-[color:var(--text-primary)] mb-4">
        Looks like this case is out of stock... and so is this page.
      </h2>
      <p className="text-[color:var(--text-primary)] opacity-70 mb-8 max-w-lg">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <div className="w-full max-w-md relative mb-12">
        <input 
          type="text" 
          placeholder="Search ZORA..." 
          className="w-full bg-[color:var(--bg-card)] border border-[color:var(--bg-primary)] rounded-full py-4 pl-6 pr-12 text-[color:var(--text-primary)] focus:outline-none focus:border-[color:var(--accent)] transition-colors"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--text-primary)] opacity-50 hover:opacity-100 hover:text-[color:var(--accent)] transition-colors">
          <Search size={20} />
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Link to="/collection" className="text-sm font-space text-[color:var(--text-primary)] hover:text-[color:var(--accent)] underline-offset-4 hover:underline">Phone Cases</Link>
        <span className="text-[color:var(--text-primary)] opacity-30">•</span>
        <Link to="/collection?category=airpods" className="text-sm font-space text-[color:var(--text-primary)] hover:text-[color:var(--accent)] underline-offset-4 hover:underline">AirPods Cases</Link>
        <span className="text-[color:var(--text-primary)] opacity-30">•</span>
        <Link to="/" className="text-sm font-space text-[color:var(--text-primary)] hover:text-[color:var(--accent)] underline-offset-4 hover:underline">Home</Link>
      </div>

      <p className="text-xs font-space text-[color:var(--text-primary)] opacity-50">
        Redirecting you home in {countdown} seconds...
      </p>
    </div>
  );
}