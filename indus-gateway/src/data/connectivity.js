import {
  Waypoints,
  Router,
  Cable,
  Network,
  Cloud,
  Boxes,
  Building2,
  Radio,
  Landmark,
  ServerCog,
} from "lucide-react";

/* Hero ConnectivityHub diagram — the business model made visible:
 * upstream providers (left) flow through the Indus Gateway coordination
 * layer (centre) to the clients it serves (right). These are generic
 * category types, not named companies, so no approval gate applies. */
export const UPSTREAM_PROVIDERS = [
  { icon: Waypoints, label: "Tier-1 Carriers" },
  { icon: Router, label: "Tier-2 Carriers" },
  { icon: Cable, label: "Fiber Operators" },
  { icon: Network, label: "IXPs" },
  { icon: Cloud, label: "Cloud Providers" },
  { icon: Boxes, label: "CDN Partners" },
];

export const CLIENT_SEGMENTS = [
  { icon: Building2, label: "Enterprises" },
  { icon: Radio, label: "ISPs & Carriers" },
  { icon: Landmark, label: "Government & Public Sector" },
  { icon: ServerCog, label: "Cloud-Native Businesses" },
];
