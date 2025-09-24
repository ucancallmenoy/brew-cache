export default function ContactPage() {
  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-accent py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-6xl animate-bounce delay-100">🍺</div>
          <div className="absolute top-40 right-20 text-4xl animate-bounce delay-300">🍻</div>
          <div className="absolute bottom-20 left-1/4 text-5xl animate-bounce delay-500">🥂</div>
          <div className="absolute bottom-40 right-1/3 text-3xl animate-bounce delay-700">🍺</div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <span className="text-white/90 text-sm font-medium">Brew Cache</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Contact Us - <span className="text-accent">Coming Soon</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light max-w-2xl mx-auto">
            We are brewing up something special. Our contact page will be ready soon with ways to reach out and connect.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-8">📬</div>
          <h2 className="text-4xl font-serif font-bold text-primary mb-6">Stay Tuned</h2>
          <p className="text-lg text-text-light mb-8 leading-relaxed max-w-2xl mx-auto">
            We are working hard to bring you the best way to get in touch with our team. In the meantime, join our newsletter to be the first to know when our contact page goes live.
          </p>

          {/* Newsletter Signup */}
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border-2 border-primary/20 focus:border-accent focus:outline-none transition-colors duration-300"
              />
              <button className="bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Explore Our Content
            </h3>
            <p className="text-white/90 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              While you wait, discover our latest beer reviews, brewing guides, and brewery stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Browse Blogs
              </button>
              <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                About Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}