import { redirect } from "next/navigation";

export default function TenantRedirect() {
  redirect("/admin/tenants");
}
