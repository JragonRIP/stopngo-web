import OrderMenuClient from "./OrderMenuClient";

export const revalidate = 60;
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { sanityClient, sanityConfigured } from "@/lib/sanity/client";
import { menuItemsQuery } from "@/lib/sanity/queries";
import type { SanityMenuItem } from "@/lib/types/menu";
import Link from "next/link";

export default async function OrderPage() {
  if (!sanityConfigured) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-2xl flex-1 px-4 py-20 sm:px-6">
          <h1 className="text-2xl font-semibold text-white">
            Menu isn&apos;t connected yet
          </h1>
          <p className="mt-3 text-white/65">
            Add{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">
              NEXT_PUBLIC_SANITY_PROJECT_ID
            </code>{" "}
            and{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">
              NEXT_PUBLIC_SANITY_DATASET
            </code>{" "}
            to your environment, publish menu items in{" "}
            <Link href="/studio" className="text-sn-gold underline">
              Sanity Studio
            </Link>
            , then refresh this page.
          </p>
        </main>
        <Footer />
      </>
    );
  }

  const items = await sanityClient.fetch<SanityMenuItem[]>(menuItemsQuery);

  if (!items.length) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-2xl flex-1 px-4 py-20 sm:px-6">
          <h1 className="text-2xl font-semibold text-white">Menu on the way</h1>
          <p className="mt-3 text-white/65">
            Order Online reads from Sanity (documents of type{" "}
            <strong className="font-medium text-white/80">Menu Item</strong>
            ), while the public Menu page still uses the static list in{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">
              lib/menu-data.ts
            </code>
            . Open{" "}
            <Link href="/studio" className="text-sn-gold underline">
              Sanity Studio
            </Link>{" "}
            and create one <strong className="font-medium text-white/80">Menu Item</strong>{" "}
            per dish you want to sell online: set{" "}
            <strong className="font-medium text-white/80">Name</strong>, click{" "}
            <strong className="font-medium text-white/80">Generate</strong> on Slug, choose a{" "}
            <strong className="font-medium text-white/80">Category</strong> (match the section:
            Hot Drinks, Energy Drinks, Breakfast, Lunch/Food Menu, or Specials), then either a{" "}
            <strong className="font-medium text-white/80">Base price</strong> or enable{" "}
            <strong className="font-medium text-white/80">Has sizes</strong> and fill Small/Medium/Large
            prices. Add optional description, image, modifiers, or flavor options.{" "}
            <strong className="font-medium text-white/80">Publish</strong> each document, then refresh
            this page.
          </p>
        </main>
        <Footer />
      </>
    );
  }

  return <OrderMenuClient items={items} />;
}
