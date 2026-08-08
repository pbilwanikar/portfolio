import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const API_URL = process.env.REACT_APP_API_URL || 'https://pbilwanikar-portfolio.onrender.com';

export default function Contact() {
  const [ref, isVisible] = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: data.message });
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div ref={ref} className={`contact__container reveal ${isVisible ? 'reveal--visible' : ''}`}>
        <h2 className="section__title">Get In Touch</h2>
        <p className="contact__subtitle">
          Have a question or want to work together? Send me a message!
        </p>
        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="contact__field">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact__field">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact__field">
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn--primary" disabled={sending}>
            {sending ? 'Sending...' : 'Send Message'}
          </button>
          {status.message && (
            <p className={`contact__status contact__status--${status.type}`}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
