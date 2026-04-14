import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919999999999';
  const message = encodeURIComponent('Hi ELANTRAA, I need help with my order.');
  return (
    <Link
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-20 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-luxe md:bottom-6"
    >
      <MessageCircle size={18} />
      WhatsApp
    </Link>
  );
}
