import GuestReviewForm from "../GuestReviewForm";
import AdminPageTitle from "@/components/admin/AdminPageTitle";

export default function NewGuestReviewPage() {
  return (
    <div>
      <AdminPageTitle className="mb-6">New Guest Review</AdminPageTitle>
      <GuestReviewForm />
    </div>
  );
}
