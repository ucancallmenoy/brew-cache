'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('🍺 Cheers! Your message has been sent. We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
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
            Contact <span className="text-accent">Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light max-w-2xl mx-auto">
            Got questions about craft beer, brewing tips, or just want to say cheers? Drop us a line!
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">📬</div>
            <h2 className="text-4xl font-serif font-bold text-primary mb-6">Let&rsquo;s Brew Some Conversation</h2>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              Fill out the form below, and we&rsquo;ll respond faster than a cold beer on a hot day.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl border border-primary max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-primary mb-3">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-xl border-2 border-primary/20 focus:border-accent focus:outline-none transition-colors duration-300 text-base"
                  placeholder="e.g., Beer Enthusiast"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-primary mb-3">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 rounded-xl border-2 border-primary/20 focus:border-accent focus:outline-none transition-colors duration-300 text-base"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div className="mb-8">
              <label htmlFor="subject" className="block text-sm font-semibold text-primary mb-3">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-xl border-2 border-primary/20 focus:border-accent focus:outline-none transition-colors duration-300 text-base"
                placeholder="e.g., Beer Review Request"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-semibold text-primary mb-3">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-5 py-4 rounded-xl border-2 border-primary/20 focus:border-accent focus:outline-none transition-colors duration-300 resize-none text-base"
                placeholder="Tell us what's on your mind..."
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent hover:bg-accent/90 text-primary px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            {submitMessage && (
              <p className="mt-6 text-center text-sm font-medium text-accent">{submitMessage}</p>
            )}
          </form>
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
              While you wait for our reply, discover our latest beer reviews, brewing guides, and brewery stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blogs" className="bg-accent hover:bg-accent/90 text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-block text-center">
                Browse Blogs
              </Link>
              <Link href="/about" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 inline-block text-center">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}