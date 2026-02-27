"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ServicesPage() {
  const heroSlides = [
    { img: '/k1.jpg', caption: 'Gentle hands. Confident movement.' },
    { img: '/k2.jpg', caption: 'Care that comes to you.' },
    { img: '/j5.png', caption: 'Stories of strength and grace.' },
  ]

  function FadeCarousel({ slides = heroSlides, interval = 4500 }) {
    const [index, setIndex] = useState(0)
    useEffect(() => {
      const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval)
      return () => clearInterval(t)
    }, [slides.length, interval])

    return (
      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-linear ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <img src={s.img} alt={s.caption} className="w-full h-full object-cover" />
            <div className="absolute left-6 bottom-6 bg-white/70 backdrop-blur rounded-md px-4 py-2 text-sm font-serif text-pink-900">
              {s.caption}
            </div>
          </div>
        ))}

        <div className="absolute left-4 top-4 opacity-80">
          {/* small floral svg */}
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-pink-200">
            <path d="M12 2c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z" fill="#FDECEC" />
            <circle cx="7" cy="17" r="3" fill="#FDECEC" />
            <circle cx="17" cy="17" r="3" fill="#FDECEC" />
          </svg>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} aria-label={`Go to slide ${i + 1}`} className={`w-2 h-2 rounded-full ${i === index ? 'bg-pink-700' : 'bg-white/70'}`} />
          ))}
        </div>
      </div>
    )
  }

  const journeys = [
    {
      id: 'neck-back',
      title: 'Neck & Back Therapy',
      lead: 'Restore strength and ease — regain daily confidence.',
      details:
        'Targeted manual therapy, movement retraining and progressive exercises to reduce pain, restore mobility and rebuild a resilient spine.',
    },
    {
      id: 'posture',
      title: 'Posture Correction',
      lead: 'Stand tall with poise and power.',
      details:
        'Assessment-led programs that combine ergonomic advice, motor-control exercises and posture education so you move with strength and grace.',
    },
    {
      id: 'yoga',
      title: 'Yoga & Mindful Movement',
      lead: 'Move with awareness — build strength, balance and calm.',
      details:
        'Therapeutic yoga sequences, breathwork and mindful movement to improve flexibility, reduce pain, and support mental wellbeing. Programs are adapted for all levels and include pregnancy-safe options.',
    },
    {
      id: 'prenatal',
      title: 'Prenatal & Postnatal Care',
      lead: 'Gentle, trusted care through pregnancy and beyond.',
      details:
        'Pregnancy-safe strengthening, pelvic stability and guided return-to-activity after birth — empowering mothers with confidence and comfort.',
    },
    {
      id: 'pelvic',
      title: 'Pelvic Floor Strengthening',
      lead: 'Quiet strength that supports you every day.',
      details:
        'Guided pelvic floor rehabilitation, breath work and functional integration to restore control and comfort with compassion and privacy.',
    },
    {
      id: 'sports',
      title: 'Sports Injury Rehabilitation',
      lead: 'Return stronger, play with purpose.',
      details:
        'Progressive load management, strength conditioning and sport-specific rehab to bring you back to your best with reduced re-injury risk.',
    },
    {
      id: 'neuro',
      title: 'Neurological Recovery',
      lead: 'Rebuild movement, rediscover independence.',
      details:
        'Task-specific neuro-rehab, balance and gait retraining designed to restore function and confidence after neurological injury.',
    },
    {
      id: 'home',
      title: 'Home Visit Care',
      lead: 'Comfort of home, excellence of clinic.',
      details:
        'Clinic-standard physiotherapy delivered at home — ideal for postoperative, elderly or mobility-limited patients who need personalised care at their doorstep.',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white text-gray-900 font-sans">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-pink-900">Healing Journeys</h1>
            <p className="text-pink-600 max-w-xl text-lg">Strength, confidence and graceful healing — personalised physiotherapy to restore your movement and your life.</p>

            

            <div className="mt-4 text-sm text-pink-600 max-w-md">
              <p>
                We specialise in women-centred care and whole-person rehabilitation — from prenatal strength to neurological recovery. Our approach blends evidence-based therapy with compassionate support so you can move with power and grace.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-lg bg-white/80 backdrop-blur p-4 text-center sm:text-left">
                <div className="text-sm font-medium text-pink-900">Sessions</div>
                <div className="text-lg font-semibold text-pink-700">Tailored to you</div>
              </div>
              <div className="rounded-lg bg-white/80 backdrop-blur p-4 text-center sm:text-left">
                <div className="text-sm font-medium text-pink-900">Approach</div>
                <div className="text-lg font-semibold text-pink-700">Hands-on & progressive</div>
              </div>
            </div>
          </div>

          <div>
            <FadeCarousel />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="rounded-3xl bg-white shadow-lg p-6 md:p-10">
          <div className="flex flex-col items-center gap-2 md:gap-4 mb-6 text-center">
            <h2 className="text-2xl font-serif text-pink-900">Our Healing Journeys</h2>
            <p className="text-sm md:text-base text-pink-600 max-w-md md:max-w-xl mx-auto md:leading-relaxed mt-2">Choose the path that fits your life — we walk with you every step.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {journeys.map((j) => (
              <article key={j.id} className="rounded-2xl bg-amber-50/40 p-4 sm:p-6 shadow-sm border border-pink-50 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 text-xl">🌸</div>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg text-pink-900">{j.title}</h3>
                    <p className="text-pink-600 mt-1 text-sm">{j.lead}</p>
                  </div>
                </div>

                <div className="mt-4 text-sm text-pink-700 leading-relaxed max-w-prose mx-auto sm:mx-0">{j.details}</div>

              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials + Transformations carousel */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-serif text-pink-900">Patient Transformations</h3>
            <p className="mt-2 text-pink-600">Real stories — quiet courage, real results.</p>

            <div className="mt-6 space-y-4">
              <blockquote className="bg-white p-5 rounded-lg shadow-sm border border-pink-50">
                <p className="text-pink-700">“After months of pain, I found strength and confidence. Dr. Kamini listened and guided me gently back to life.”</p>
                <div className="mt-2 text-sm font-medium text-pink-900">— Veena malik </div>
              </blockquote>

              <blockquote className="bg-white p-5 rounded-lg shadow-sm border border-pink-50">
                <p className="text-pink-700">“Home visits made recovery easy for my mother — professional and compassionate care at our doorstep.”</p>
                <div className="mt-2 text-sm font-medium text-pink-900">— Renu Sehgal.</div>
              </blockquote>
            </div>
          </div>

          <div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <FadeCarousel slides={[{ img: '/J.jpg', caption: 'Therapy session' }, { img: '/J2.jpg', caption: 'Recovery moments' }, { img: '/j4.png', caption: 'Home visit care' }]} interval={3500} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-pink-50 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-pink-600 to-pink-700 text-white p-8 md:p-12">
            <h3 className="text-2xl font-serif">Ready to Begin Your Healing Journey?</h3>
            <p className="mt-2 opacity-90">Call or message us to request a home visit, schedule your first session, or ask a question.</p>
            <div className="mt-6">
              <Link href="/contact" className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 border border-white/30 rounded-full text-white transition transform hover:scale-105 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40">Begin Your Healing Journey</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
