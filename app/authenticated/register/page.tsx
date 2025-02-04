import type { Metadata } from "next";
import FormRegister from "../../ui/login/formRegister";

export const metadata: Metadata = {
  title: "register",
};

export default function login() {
  return (
    <>
      <FormRegister />
    </>
  );
}
