import ReviewForm from '../../components/ReviewForm'

export default function Stories() {
  const testimonials = [
    {
      name: "Reema Bali",
      quote:
        "I walked in with severe shoulder pain and walked out with hope. The exercises were simple and effective.",
      when: "Mar 2025",
    },
    {
      name: "Rakesh Tolani",
      quote:
        "After knee surgery, Dr. Kamini mapped every step. I was back to climbing stairs in weeks.",
      when: "Jan 2025",
    },
    {
      name: "Kiran",
      quote:
        "The clinic feels calm and welcoming. Every visit made me stronger.",
      when: "Dec 2024",
    },
    {
      name: "Kalpana Rajpurohit",
      quote:
        "Very professional care. The home-visit program helped my father regain balance and confidence.",
      when: "Apr 2025",
    },
    {
      name: "Janvii Khorwal",
      quote:
        "The physiotherapist was professional, patient, and very supportive throughout the process. I truly appreciate the personalized care and expert guidance. Highly recommend for anyone dealing with neck stiffness or pain.",
      when: "Feb 2026",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-semibold text-teal-900">Patient Stories</h1>
        <p className="mt-2 text-slate-600">Real patients, real recoveries — a few stories from the clinic.</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <article key={t.name} className="rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-700 font-semibold">
                {t.name.split(" ")[0][0]}
              </div>
              <div>
                <p className="font-semibold text-teal-900">{t.name}</p>
                <p className="text-xs text-slate-500">{t.when}</p>
              </div>
            </div>

            <blockquote className="mt-4 text-sm leading-relaxed text-slate-700">“{t.quote}”</blockquote>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-1 text-amber-500">
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.564-.955L10 0l2.946 5.955 6.564.955-4.755 4.635 1.123 6.545z" />
                </svg>
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.564-.955L10 0l2.946 5.955 6.564.955-4.755 4.635 1.123 6.545z" />
                </svg>
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.564-.955L10 0l2.946 5.955 6.564.955-4.755 4.635 1.123 6.545z" />
                </svg>
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.564-.955L10 0l2.946 5.955 6.564.955-4.755 4.635 1.123 6.545z" />
                </svg>
                <svg className="h-4 w-4 opacity-60" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.564-.955L10 0l2.946 5.955 6.564.955-4.755 4.635 1.123 6.545z" />
                </svg>
              </div>

              <a href="#contact" className="text-sm font-semibold text-teal-800">Book a consult</a>
            </div>
          </article>
        ))}
      </section>

      <div className="mt-8">
        <ReviewForm />
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-slate-600">Want to share your story? Email us at <a href="mailto:drkaminishakyapt@gmail.com" className="text-teal-800">drkaminishakyapt@gmail.com</a></p>
      </div>
    </div>
  );
}
