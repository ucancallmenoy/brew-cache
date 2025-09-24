import { Suspense } from 'react';
import BlogView from "@/view/blog/index";

export default function BlogsPage() {
  return (
    <Suspense fallback={
      <div className="bg-background-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🍺</span>
            </div>
          </div>
          <h3 className="text-xl font-serif font-bold text-primary mb-2">Loading Beer Stories</h3>
          <p className="text-text-light">Preparing the perfect brew of content...</p>
        </div>
      </div>
    }>
      <BlogView />
    </Suspense>
  );
}