import Footer from "../ui/home/footer";
import Header from "../ui/home/header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid grid-rows-[min-content_auto_min-content] min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </section>
  );
}
