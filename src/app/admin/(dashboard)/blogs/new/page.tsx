import BlogForm from "../BlogForm";
import AdminPageTitle from "@/components/admin/AdminPageTitle";

export default function NewBlogPage() {
  return (
    <div>
      <AdminPageTitle className="mb-6">New Blog</AdminPageTitle>
      <BlogForm />
    </div>
  );
}
