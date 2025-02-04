import type { Metadata } from "next";
import FormSign from "../../ui/login/formSign";

export const metadata: Metadata = {
  title: "Login",
};

export default function login() {
  return (
    <>
      <FormSign />
    </>
  );
}
