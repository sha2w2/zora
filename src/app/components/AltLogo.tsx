import svgPaths from "../../imports/Group1-3/svg-eqhd78fjlm";

interface Props {
  className?: string;
  starColor?: string;
  zColor?: string;
}

export function AltLogo({ className = "", starColor = "var(--text-primary)", zColor = "var(--bg-primary)" }: Props) {
  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <svg className="block w-full h-full" fill="none" viewBox="0 0 387 386" preserveAspectRatio="xMidYMid meet">
        <g id="Group 1">
          <path d={svgPaths.p2905d300} fill={starColor} id="Star 1" />
          <path d={svgPaths.p3089b3c0} id="Vector 1" stroke={zColor} strokeWidth="5" />
        </g>
      </svg>
    </div>
  );
}
