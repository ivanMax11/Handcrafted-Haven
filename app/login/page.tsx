import Footer from "../ui/home/footer";
import Header from "../ui/home/header";
import FormSign from "../ui/login/formSign";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function login() {
  return (
    <>
      <Header />

      <FormSign />

      <Footer />
    </>
  );
}
