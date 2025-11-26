'use client';

import { useState } from 'react';
import { FiSend, FiMail, FiUser, FiMessageSquare } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Thank you! Your message has been received.');
      e.target.reset();
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card-body bg-base-100 shadow-xl rounded-lg"
    >
      <div className="form-control fieldset">
        <label className="label">
          <span className="label-text flex items-center">
            <FiUser className="mr-2" />
            Your Name
          </span>
        </label>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="form-control fieldset">
        <label className="label">
          <span className="label-text flex items-center">
            <FiMail className="mr-2" />
            Your Email
          </span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="email@example.com"
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="form-control fieldset">
        <label className="label">
          <span className="label-text flex items-center">
            <FiMessageSquare className="mr-2" />
            Message
          </span>
        </label>
        <textarea
          name="message"
          placeholder="How can we help?"
          className="textarea textarea-bordered h-24 w-full"
          required
        ></textarea>
      </div>

      <div className="form-control mt-6 fieldset">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <>
              <FiSend className="mr-2" /> Send Message
            </>
          )}
        </button>
      </div>
    </form>
  );
}
