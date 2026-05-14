import svgPaths from "../../imports/Group1-1/svg-u0tmeaxjz5";

interface Props {
  className?: string;
  hideStar?: boolean;
}

export function MainLogo({ className = "", hideStar = true }: Props) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <svg className="block w-full h-full" fill="none" viewBox="90 130 220 100" preserveAspectRatio="xMidYMid meet">
        <g id="Group 1">
          {!hideStar && <path d={svgPaths.p2905d300} fill="var(--bg-primary, #FFC5C5)" id="Star 1" />}
          <path d={svgPaths.p298af00} id="Vector 1" stroke="currentColor" strokeWidth="3" />
          <path d={svgPaths.p3676c180} id="Vector 3" stroke="currentColor" strokeWidth="3" />
          <path d={svgPaths.p1bd5e2f0} id="Vector 2" stroke="currentColor" strokeWidth="3" />
          <line id="Line 1" stroke="currentColor" strokeWidth="6" x1="198.997" x2="195.997" y1="148.138" y2="213.138" />
          <line id="Line 2" stroke="currentColor" strokeWidth="3" x1="201.061" x2="231.061" y1="181.939" y2="211.939" />
          <path d="M225 181.5L296 190" id="Line 3" stroke="currentColor" />
          <path d={svgPaths.pf294e00} id="Vector 4" stroke="currentColor" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}
