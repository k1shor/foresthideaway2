import PackageForm from "../PackageForm";
import AdminPageTitle from "@/components/admin/AdminPageTitle";

export default function NewPackagePage() {
  return (
    <div>
      <AdminPageTitle className="mb-6">New Package</AdminPageTitle>
      <PackageForm />
    </div>
  );
}
