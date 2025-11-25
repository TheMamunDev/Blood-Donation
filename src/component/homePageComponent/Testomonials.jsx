// src/components/landing/Testimonials.jsx
import React from 'react';
import { FiQuote } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    quote:
      'Registering was fast, and I was matched with a patient in my area the next day. This network truly saves lives!',
    name: 'Aisha K.',
  },
  {
    quote:
      'After my registration, I received a notification for O+ blood near my hospital. The system is incredibly efficient and easy to use.',
    name: 'Reza M.',
  },
  {
    quote:
      'As a seeker, I posted a request and got multiple calls within an hour. I highly recommend LifeStream.',
    name: 'Farah L.',
  },
];

export default function Testomonials() {
  return (
    <section className="py-16 bg-base-200">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Voices of Hope and Gratitude
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="card bg-white shadow-lg p-6 transition duration-300 hover:shadow-xl border-t-4 border-red-500"
          >
            <FaQuoteLeft className="text-5xl text-red-400 mb-4 opacity-70" />
            <p className="text-lg italic mb-4 text-gray-700">{t.quote}</p>
            <p className="font-semibold text-right text-gray-900">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
