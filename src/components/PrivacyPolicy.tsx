'use client';

import { useEffect } from 'react';
import { usePageBySlug } from '@/hooks/wordpress';
import type { WordPressPage } from '@/types/wordpress';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  slug?: string; // defaults to 'privacy-policy'
}

export default function PrivacyPolicyModal({ open, onClose, slug = 'privacy-policy' }: ModalProps) {
  const { data: page, isLoading, error } = usePageBySlug(slug);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative max-w-3xl w-full bg-white rounded-xl shadow-xl overflow-auto max-h-[80vh] p-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary">{page?.title?.rendered || 'Privacy Policy'}</h2>
          <button onClick={onClose} className="text-text-light hover:text-primary cursor-pointer">Close</button>
        </div>

        {isLoading && <p className="text-text-light">Loading...</p>}
        {error && <p className="text-red-500">Failed to load content.</p>}
        {page && (
          <div className="p-4">
            <style dangerouslySetInnerHTML={{
              __html: `
                .prose ul {
                  list-style-type: disc !important;
                  padding-left: 1.5rem !important;
                }
                .prose ol {
                  list-style-type: decimal !important;
                  padding-left: 1.5rem !important;
                }
                .prose li {
                  margin-bottom: 0.5rem !important;
                  color: var(--text) !important;
                }
                .prose p {
                  color: var(--text) !important;
                }
                .prose h1 {
                  font-size: 1.875rem !important;
                  line-height: 2.25rem !important;
                }
                .prose h2 {
                  font-size: 1.5rem !important;
                  line-height: 2rem !important;
                }
                .prose h3 {
                  font-size: 1.25rem !important;
                  line-height: 1.75rem !important;
                }
                .prose p, .prose li {
                  font-size: 1rem !important;
                  line-height: 1.75rem !important;
                }
              `
            }} />
            <div
              className="prose prose-lg max-w-none
                prose-headings:text-text prose-headings:font-serif prose-headings:font-bold
                prose-h1:text-3xl prose-h1:text-primary prose-h1:mb-6 prose-h1:mt-8
                prose-h2:text-2xl prose-h2:text-primary prose-h2:mb-4 prose-h2:mt-6
                prose-h3:text-xl prose-h3:text-primary prose-h3:mb-3 prose-h3:mt-4
                prose-p:text-text prose-p:leading-relaxed prose-p:mb-3 prose-p:text-base
                prose-strong:text-text prose-strong:font-semibold
                prose-em:text-text prose-em:italic
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:pl-4 prose-blockquote:py-3 prose-blockquote:my-4 prose-blockquote:rounded-r-lg
                prose-ul:my-4 prose-ul:pl-4 prose-ul:list-disc
                prose-ol:my-4 prose-ol:pl-4 prose-ol:list-decimal
                prose-li:text-text prose-li:leading-relaxed prose-li:mb-1
                prose-li:marker:text-accent
                prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono prose-code:text-primary
                prose-pre:bg-gray-900 prose-pre:text-white prose-pre:overflow-x-auto prose-pre:rounded prose-pre:p-3
                prose-img:rounded prose-img:shadow prose-img:my-4"
              dangerouslySetInnerHTML={{ __html: (page as WordPressPage).content.rendered }}
            />
          </div>
        )}
      </div>
    </div>
  );
}