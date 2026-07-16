"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'

function FadeCarousel({ slides, interval = 4500 }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval)
    return () => clearInterval(t)
  }, [slides.length, interval])

  return (
    <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
      {slides.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <img src={s.img} alt={s.caption} className="w-full h-full object-cover" />
          <div className="absolute left-5 bottom-5 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 text-sm font-medium text-pink-900">
            {s.caption}
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-pink-600' : 'w-2 bg-white/70'}`}
          />
        ))}
      </div>
    </div>
  )
}

const heroSlides = [
  { img: '/k1.jpg', caption: 'Gentle hands. Confident movement.' },
  { img: '/k2.jpg', caption: 'Care that comes to you.' },
  { img: '/j5.png', caption: 'Stories of strength and grace.' },
]

const journeys = [
  {
    id: 'neck-back',
    title: 'Neck & Back Therapy',
    lead: 'Restore strength and ease — regain daily confidence.',
    details: 'Targeted manual therapy, movement retraining and progressive exercises to reduce pain, restore mobility and rebuild a resilient spine.',
    img: '/services-ai/neck-back-therapy.jpg',
  },
  {
    id: 'posture',
    title: 'Posture Correction',
    lead: 'Stand tall with poise and power.',
    details: 'Assessment-led programs combining ergonomic advice, motor-control exercises and posture education so you move with strength and grace.',
    img: '/services-ai/posture-correction.jpg',
  },
  {
    id: 'yoga',
    title: 'Yoga & Mindful Movement',
    lead: 'Move with awareness — build strength, balance and calm.',
    details: 'Therapeutic yoga sequences, breathwork and mindful movement to improve flexibility, reduce pain, and support mental wellbeing.',
    img: '/services-ai/yoga-mindful-movement.jpg',
  },
  {
    id: 'prenatal',
    title: 'Prenatal & Postnatal Care',
    lead: 'Gentle, trusted care through pregnancy and beyond.',
    details: 'Pregnancy-safe strengthening, pelvic stability and guided return-to-activity after birth — empowering mothers with confidence and comfort.',
    img: '/services-ai/prenatal-postnatal-care.jpg',
  },
  {
    id: 'pelvic',
    title: 'Pelvic Floor Strengthening',
    lead: 'Quiet strength that supports you every day.',
    details: 'Guided pelvic floor rehabilitation, breath work and functional integration to restore control and comfort with compassion and privacy.',
    img: '/services-ai/pelvic-floor-strengthening.jpg',
  },
  {
    id: 'sports',
    title: 'Sports Injury Rehabilitation',
    lead: 'Return stronger, play with purpose.',
    details: 'Progressive load management, strength conditioning and sport-specific rehab to bring you back to your best with reduced re-injury risk.',
    img: '/services-ai/sports-injury-rehab.jpg',
  },
  {
    id: 'neuro',
    title: 'Neurological Recovery',
    lead: 'Rebuild movement, rediscover independence.',
    details: 'Task-specific neuro-rehab, balance and gait retraining designed to restore function and confidence after neurological injury.',
    img: '/services-ai/neurological-recovery.jpg',
  },
  {
    id: 'home',
    title: 'Home Visit Care',
    lead: 'Comfort of home, excellence of clinic.',
    details: 'Clinic-standard physiotherapy delivered at home — ideal for postoperative, elderly or mobility-limited patients who need personalised care at their doorstep.',
    img: '/services-ai/home-visit-care.jpg',
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-white text-gray-900 font-sans">

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">Personalised Physiotherapy</p>
            <h1 className="text-5xl md:text-6xl font-bold text-pink-500 googleFontss-dancingScript leading-tight">
              Healing Journeys
            </h1>
            <p className="text-base text-slate-700 max-w-md leading-relaxed">
              Women-centred care and whole-person rehabilitation — from prenatal strength to neurological recovery. Evidence-based therapy, delivered with compassion.
            </p>
            <div className="flex flex-wrap gap-8 pt-1">
              <div>
                <p className="text-xl font-semibold text-teal-900">2+ Years</p>
                <p className="text-sm text-slate-600">Clinical practice</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-teal-900">1000+</p>
                <p className="text-sm text-slate-600">Patients supported</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-teal-900">8</p>
                <p className="text-sm text-slate-600">Specialities</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/contact" className="rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl inline-flex items-center justify-center">
                Book a Session
              </Link>
              <a href="tel:+919772919458" className="rounded-full border border-teal-900 px-6 py-3 text-sm font-semibold text-teal-900 transition hover:-translate-y-0.5 hover:shadow-lg inline-flex items-center justify-center">
                Call +91 9772919458
              </a>
            </div>
          </div>
          <FadeCarousel slides={heroSlides} />
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-pink-500 googleFontss-dancingScript">Our Services</h2>
          <p className="mt-2 text-slate-600 max-w-lg mx-auto text-sm">Choose the path that fits your life — we walk with you every step.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {journeys.map((j) => (
            <article key={j.id} className="rounded-2xl bg-white shadow-lg border border-pink-50/60 overflow-hidden hover:-translate-y-1 transition-transform duration-200">
              <div className="h-40 overflow-hidden">
                <img src={j.img} alt={j.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-pink-900 text-sm leading-snug">{j.title}</h3>
                <p className="mt-1 text-xs font-medium text-teal-700">{j.lead}</p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{j.details}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl font-bold text-pink-500 googleFontss-dancingScript">Patient Stories</h3>
            <p className="mt-1 text-slate-600 text-sm">Real stories — quiet courage, real results.</p>
            <div className="mt-6 space-y-4">
              <blockquote className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-2xl text-sm leading-relaxed text-slate-700">
                <p>&ldquo;After months of pain, I found strength and confidence. Dr. Kamini listened and guided me gently back to life.&rdquo;</p>
                <cite className="mt-3 block text-sm font-semibold text-teal-900 not-italic">— Veena Malik</cite>
              </blockquote>
              <blockquote className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-2xl text-sm leading-relaxed text-slate-700">
                <p>&ldquo;Home visits made recovery easy for my mother — professional and compassionate care at our doorstep.&rdquo;</p>
                <cite className="mt-3 block text-sm font-semibold text-teal-900 not-italic">— Renu Sehgal</cite>
              </blockquote>
            </div>
          </div>
          <FadeCarousel
            slides={[
              { img: '/J.jpg', caption: 'Therapy in progress' },
              { img: '/J2.jpg', caption: 'Recovery moments' },
              { img: '/j4.png', caption: 'Home visit care' },
            ]}
            interval={3500}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-white p-8 md:p-10 shadow-2xl flex flex-wrap items-center justify-between gap-6">
          <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-pink-200 opacity-60" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-semibold text-slate-900">Start your recovery journey</h3>
            <p className="mt-2 text-slate-600 text-sm max-w-md">Share your concern, get a tailored plan, and begin moving with confidence again.</p>
          </div>
          <Link href="/contact" className="relative z-10 rounded-full bg-teal-800 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl inline-flex items-center justify-center">
            Book an Appointment
          </Link>
        </div>
      </section>

    </main>
  )
}
