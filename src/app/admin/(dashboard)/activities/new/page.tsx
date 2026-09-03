import ActivityForm from "../ActivityForm";
import AdminPageTitle from "@/components/admin/AdminPageTitle";

export default function NewActivityPage() {
  return (
    <div>
      <AdminPageTitle className="mb-6">New Activity</AdminPageTitle>
      <ActivityForm />
    </div>
  );
}
