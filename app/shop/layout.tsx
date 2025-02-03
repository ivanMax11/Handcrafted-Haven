import Footer from "../ui/home/footer";
import Header from "../ui/home/header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      <main>{children}</main>
      <Footer />
    </section>
  );
}
