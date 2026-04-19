import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import CatalogPage from "./pages/CatalogPage.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import FaqPage from "./pages/FaqPage.tsx";
import GalleryPage from "./pages/GalleryPage.tsx";
import PayPage from "./pages/PayPage.tsx";
import PartnersPage from "./pages/PartnersPage.tsx";
import ReviewsPage from "./pages/ReviewsPage.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminOverview from "./pages/admin/AdminOverview.tsx";
import AdminCategories from "./pages/admin/AdminCategories.tsx";
import AdminProducts from "./pages/admin/AdminProducts.tsx";
import AdminLeads from "./pages/admin/AdminLeads.tsx";
import AdminContent from "./pages/admin/AdminContent.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/galery" element={<GalleryPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/pay" element={<PayPage />} />
          <Route path="/content/partnerstvo" element={<PartnersPage />} />
          <Route path="/content/otzyvy" element={<ReviewsPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="content" element={<AdminContent />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
