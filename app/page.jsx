import { redirect } from "next/navigation";

export default function Page() {
  // Only redirect when request is to root `/`
  redirect("/en");
}