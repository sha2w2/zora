import { Link } from "react-router";
import svgPathsDark from "../../imports/Group1-4/svg-7ot06llxcm";
import svgPathsLight from "../../imports/Group1-1-1/svg-cv60hk3nun";

export function FloatingAboutButton() {
  return (
    <Link 
      to="/about" 
      className="fixed bottom-6 left-6 z-50 w-20 h-20 md:w-24 md:h-24 hover:scale-105 transition-transform drop-shadow-xl"
      aria-label="About ZORA"
    >
      {/* Light Mode SVG */}
      <svg className="dark:hidden block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 387 386">
        <g clipPath="url(#clip0_6024_93)" id="Group 1">
          <path d={svgPathsLight.p2905d300} fill="var(--fill-0, #FFC5C5)" id="Star 1" />
          <path d={svgPathsLight.p3089b3c0} id="Vector 1" stroke="var(--stroke-0, #8B3B3B)" strokeWidth="3" />
        </g>
        <defs>
          <clipPath id="clip0_6024_93">
            <rect fill="white" height="386" width="387" />
          </clipPath>
        </defs>
      </svg>
      {/* Dark Mode SVG */}
      <svg className="hidden dark:block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 387 386">
        <g clipPath="url(#clip0_6024_79)" id="Group 1">
          <path d={svgPathsDark.p2905d300} fill="var(--fill-0, #A22828)" id="Star 1" />
          <path d={svgPathsDark.p3089b3c0} id="Vector 1" stroke="var(--stroke-0, white)" strokeWidth="3" />
        </g>
        <defs>
          <clipPath id="clip0_6024_79">
            <rect fill="white" height="386" width="387" />
          </clipPath>
        </defs>
      </svg>
    </Link>
  );
}