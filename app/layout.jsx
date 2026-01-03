import { redirect } from "next/navigation";

// Root layout that redirects to default language
export const metadata = {
  title: "BrandRaize - Elevating Brands Above the Noise",
  description: "Creative digital agency specializing in digital marketing, web & app development, branding, and IT solutions.",
};

export default function RootLayout({ children }) {
  // This should never render as requests are redirected at build time
  // but keeping as fallback
  redirect("/en");
}
