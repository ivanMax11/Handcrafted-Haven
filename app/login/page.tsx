import FormSign from "../ui/login/formSign";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Login',
};


export default function login() {
  return (
    <div>
      <FormSign />
    </div>
  );
}
