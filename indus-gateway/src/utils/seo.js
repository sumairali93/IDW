import { useEffect } from "react";

/* Per-route SEO metadata for the simplified five-page site. */
export const SEO = {
  home: {
    title: "Indus Gateway | Building the Digital Highway",
    description:
      "Indus Gateway helps organisations source, coordinate, monitor, and optimise network connectivity through a vendor-neutral intermediary model.",
    path: "/",
  },
  about: {
    title: "About Indus Gateway | Vendor-Neutral Network Intermediary",
    description:
      "Learn about Indus Gateway, a Pakistan-registered technology company focused on vendor-neutral connectivity aggregation and managed network coordination.",
    path: "/about",
  },
  services: {
    title: "Connectivity Services | Indus Gateway",
    description:
      "Explore transit aggregation, inter-city connectivity, cloud connectivity, managed network operations, professional services, and IPv4 leasing.",
    path: "/services",
  },
  ipv4: {
    title: "IPv4 Leasing & Address Brokerage | Indus Gateway",
    description:
      "Structured IPv4 leasing, sourcing, verification, routing readiness, and managed address-space coordination for networks and resource holders.",
    path: "/ipv4-leasing",
  },
  contact: {
    title: "Contact Indus Gateway",
    description:
      "Contact Indus Gateway for enterprise connectivity, IP transit, cloud connectivity, managed network operations, IPv4 leasing, and partnership enquiries.",
    path: "/contact",
  },
};

const SITE_ORIGIN = "https://www.igw.com.pk";

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(path) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", SITE_ORIGIN + (path || "/"));
}

/* Updates document title, meta description, and canonical link. */
export function useSeo(key) {
  useEffect(() => {
    const meta = SEO[key];
    if (!meta) return;
    document.title = meta.title;
    setMeta("description", meta.description);
    setCanonical(meta.path);
  }, [key]);
}
