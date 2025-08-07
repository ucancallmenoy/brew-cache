import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-accent py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif">
            Welcome to{" "}
            <span className="text-accent">Brew Cache</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light max-w-2xl mx-auto">
            Your ultimate destination for craft beer stories, brewing insights, and beer culture chronicles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-full font-medium text-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Explore Beers
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full font-medium text-lg transition-all duration-200">
              Latest Reviews
            </button>
          </div>
        </div>
      </section>

      {/* Photo + Text Hero Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image on Left */}
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/hero-beers.png"
                  alt="Craft beer brewing process"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay for better text contrast if needed */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-accent text-white px-6 py-4 rounded-xl shadow-lg transform rotate-3">
                <p className="text-sm font-bold !text-white">Cheers!</p>
              </div>
            </div>

            {/* Text Content on Right */}
            <div className="lg:pl-8">
              <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                Premium Craft Beer Coverage
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6 font-serif leading-tight">
                Discover the Art of 
                <span className="text-accent"> Craft Brewing</span>
              </h2>
              
              <p className="text-lg text-text-light mb-8 leading-relaxed">
                From small-batch microbreweries to industry-leading craft beer innovations, 
                we bring you the stories, techniques, and passion behind every perfect pour. 
                Join our community of beer enthusiasts and discover your next favorite brew.
              </p>

              {/* Feature List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-text font-medium">Expert beer reviews and ratings</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-text font-medium">Behind-the-scenes brewery stories</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-text font-medium">Home brewing guides and tips</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                  Start Exploring
                </button>
                <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-200">
                  View Latest Reviews
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">500+</p>
                  <p className="text-sm text-text-light">Beer Reviews</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">150+</p>
                  <p className="text-sm text-text-light">Breweries Featured</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">25k+</p>
                  <p className="text-sm text-text-light">Community Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4 font-serif">
              Craft Beer Chronicles
            </h2>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              Dive deep into the world of craft brewing with our expertly curated content, 
              reviews, and stories from brewers around the globe.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                {/* Beer Glass Icon */}
                <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 6h14l-1 8H6L5 6zm1.5 2l.5 4h6l.5-4h-7zM8 2h8v2H8V2zm11 4v1a3 3 0 01-3 3h-1l-.5-4H19zm-3 12a1 1 0 100 2 1 1 0 000-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 font-serif">
                Beer Reviews
              </h3>
              <p className="text-text-light">
                In-depth reviews of craft beers from microbreweries to established brands.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                {/* Factory/Brewery Icon */}
                <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 18h20v2H2v-2zm3-6h2v6H5v-6zm4-3h2v9H9V9zm4-3h2v12h-2V6zm4 3h2v9h-2V9zM3 4l1.5 6L3 16h18l-1.5-6L21 4H3zm2 2h14l-1 4H6L5 6z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 font-serif">
                Brewery Stories
              </h3>
              <p className="text-text-light">
                Behind-the-scenes stories from breweries and the passionate people who run them.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="w-12 h-12 bg-muted/20 rounded-lg flex items-center justify-center mb-4">
                {/* Book/Guide Icon */}
                <svg className="w-6 h-6 text-muted" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 font-serif">
                Brewing Guides
              </h3>
              <p className="text-text-light">
                Learn the art and science of brewing with our comprehensive guides and tips.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}