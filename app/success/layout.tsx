/**
 * Ensures /success is not fully static so the client receives the real URL
 * (query string) reliably with useSearchParams after navigation from Square.
 */
export const dynamic = "force-dynamic";

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
