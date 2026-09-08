import { Scale, Layers, Workflow } from "lucide-react";

/* USP — condensed 3-pillar version per marketing-approved homepage flow
   (PDF: "SECTION 5 – USP (Why Organizations Choose Indus Gateway)").
   Kept separate from DIFFERENTIATORS (ecosystem.js) so the fuller
   6-point version remains available for other pages if needed. */
export const USP = [
  {
    icon: Scale,
    title: "Vendor Neutral",
    text: "We have no obligation to any carrier or vendor. Our recommendations are based solely on what is best for you.",
  },
  {
    icon: Layers,
    title: "Wholesale Buying Power",
    text: "Aggregated demand across our client base helps us secure wholesale pricing and better commercial terms.",
  },
  {
    icon: Workflow,
    title: "Managed Operations",
    text: "Single pane of glass for monitoring, support, billing and reporting with one accountable partner.",
  },
];
