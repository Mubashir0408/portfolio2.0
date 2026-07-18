import type { NavItem } from "@/types/project";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Social links (GitHub/LinkedIn/email) are derived from PERSONAL_INFO in
// site.config.ts — update your usernames there, not here.
export { SOCIAL_LINKS } from "@/site.config";

export const FOOTER_LINKS = {
  navigation: NAV_ITEMS,
  resources: [
    { label: "Resume", href: "/resume" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};
