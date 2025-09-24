import Image from 'next/image';
import Link from 'next/link';
import type { WordPressPost } from '@/types/wordpress';

interface BeersGridProps {
  beers: WordPressPost[];
}

export default function BeersGrid({ beers }: BeersGridProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">Our Tasted Beers Gallery</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            A visual collection of the craft beers we&rsquo;ve tasted and reviewed. Click on any image to read the full review.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {beers.map(beer => {
            const media = beer._embedded?.['wp:featuredmedia']?.[0];
            const imageSrc = media?.source_url;
            return (
              <Link key={beer.id} href={`/blogs/${beer.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-secondary/10 to-accent/10">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={media.alt_text || beer.title.rendered}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, (min-width:640px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <span className="text-6xl opacity-60">🍻</span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <h3 className="text-white font-serif font-bold text-lg mb-2 line-clamp-2">
                      {beer.title.rendered}
                    </h3>
                    <span className="bg-accent text-primary px-3 py-1 rounded-full font-semibold text-sm">
                      Read Review →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {beers.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🍺</div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">No Reviews Yet</h3>
            <p className="text-text-light text-lg">Check back soon for new tasting reviews from our team.</p>
          </div>
        )}
      </div>
    </section>
  );
}