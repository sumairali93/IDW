import Reveal from "../ui/Reveal.jsx";

const ITEMS = [
  { k: "Asset-light", v: "Intermediary model" },
  { k: "Vendor-neutral", v: "Multi-provider sourcing" },
  { k: "Single layer", v: "Accountable coordination" },
  { k: "Pakistan-focused", v: "Local market expertise" },
];

export default function StatRow() {
  return (
    <div className="border-y border-line bg-panel/40">
      <div className="mx-auto w-full max-w-[90rem] px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {ITEMS.map((it, i) => (
            <Reveal
              key={it.k}
              delay={i * 0.07}
              className={`px-2 py-[30px] ${
                i < ITEMS.length - 1 ? "md:border-r md:border-line" : ""
              } ${i < 2 ? "border-b border-line md:border-b-0" : ""}`}
            >
              <div className="font-display text-[22px] font-semibold text-ink">{it.k}</div>
              <div className="mt-1.5 text-[13.5px] text-grey">{it.v}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
