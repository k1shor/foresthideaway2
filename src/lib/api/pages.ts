import { apiFetch } from "./config";
import type {
  HomePageContent,
  AboutPageContent,
  BardiaPageContent,
  ContactPageContent,
  ActivitiesPageContent,
  PackagesPageContent,
  BlogsPageContent,
  GuestReviewsPageContent,
} from "./types";

export function getHomePage() {
  return apiFetch<HomePageContent>("/api/pages/home");
}

export function getAboutPage() {
  return apiFetch<AboutPageContent>("/api/pages/about");
}

export function getBardiaPage() {
  return apiFetch<BardiaPageContent>("/api/pages/bardia-national-park");
}

export function getContactPage() {
  return apiFetch<ContactPageContent>("/api/pages/contact");
}

export function getActivitiesPage() {
  return apiFetch<ActivitiesPageContent>("/api/pages/activities");
}

export function getPackagesPage() {
  return apiFetch<PackagesPageContent>("/api/pages/packages");
}

export function getBlogsPage() {
  return apiFetch<BlogsPageContent>("/api/pages/blogs");
}

export function getGuestReviewsPage() {
  return apiFetch<GuestReviewsPageContent>("/api/pages/guest-reviews");
}
