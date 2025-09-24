import type { WordPressCategory } from '@/types/wordpress';

interface BlogCategoriesSectionProps {
  categories: WordPressCategory[];
  selectedCategory: number | null;
  setSelectedCategory: (category: number | null) => void;
  title?: string;
  description?: string;
}

export default function BlogCategoriesSection({
  categories,
  selectedCategory,
  setSelectedCategory,
  title = "Explore by Category",
  description = "Discover content tailored to your brewing interests"
}: BlogCategoriesSectionProps) {
  return (
    <section id="categories-section" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">{title}</h2>
          <p className="text-text-light">{description}</p>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`group px-6 py-3 rounded-full border-2 font-semibold transition-all duration-300 ${
              selectedCategory === null 
                ? 'bg-primary text-white border-primary shadow-lg' 
                : 'border-primary/30 text-primary hover:border-primary hover:bg-primary cursor-pointer hover:text-white hover:shadow-md'
            }`}
          >
            <span className="flex items-center gap-2">
              All Stories
            </span>
          </button>
          
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`group px-6 py-3 rounded-full border-2 font-semibold transition-all duration-300 ${
                selectedCategory === cat.id 
                  ? 'bg-primary text-white border-primary shadow-lg' 
                  : 'border-primary/30 text-primary hover:border-primary cursor-pointer hover:bg-primary hover:text-white hover:shadow-md'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}