'use client';

import { useState } from 'react';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitMessage('Your email has sent to the administrator, wait for confirmation if you are qualified to brew some cache!');
        setEmail('');
      } else {
        setSubmitMessage('Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Oops! Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Subscribe to <span className="text-accent">Brew Cache</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light max-w-2xl mx-auto">
            Join our community of craft beer enthusiasts. Get the latest reviews, brewing tips, and exclusive content delivered to your inbox.
          </p>
        </div>
      </section>

      {/* Subscribe Form Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">📬</div>
          <h2 className="text-4xl font-serif font-bold text-primary mb-6">Brew Some Cache with Us</h2>
          <p className="text-lg text-text-light mb-8">
            Enter your email below to apply for subscription. We&apos;ll review your request and confirm if you&apos;re ready to join the brew!
          </p>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-primary">
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-semibold text-primary mb-3">
                Your Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-xl border-2 border-primary/20 focus:border-accent focus:outline-none transition-colors duration-300 text-base"
                placeholder="your.email@example.com"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent hover:bg-accent/90 text-primary px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Subscribe Now'}
              </button>
            </div>
            {submitMessage && (
              <p className="mt-6 text-center text-sm font-medium text-accent">{submitMessage}</p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}