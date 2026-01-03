export const metadata = {
  title: "BrandRaize - Elevating Brands Above the Noise",
  description: "Creative digital agency specializing in digital marketing, web & app development, branding, and IT solutions.",
};

export default function RootLayout({ children }) {
  // Root layout should not redirect; `/` is handled by app/page.jsx
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
