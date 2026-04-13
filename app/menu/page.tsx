import Footer from "../components/Footer";
import Header from "../components/Header";
import MenuPreview from "../components/MenuPreview";

export default function MenuPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <MenuPreview />
      </main>
      <Footer />
    </>
  );
}
