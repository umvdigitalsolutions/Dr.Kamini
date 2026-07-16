import IntroOverlay from "@/components/IntroOverlayClient";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "2+", label: "Years of clinical practice" },
  { value: "1000+", label: "Patients supported" },
  { value: "8", label: "Focused therapy areas" },
];

const carePillars = [
  {
    title: "Assessment-led care",
    copy: "Every plan starts with posture, mobility, strength, pain behavior, and your daily routine.",
  },
  {
    title: "Hands-on treatment",
    copy: "Manual therapy, guided movement, and progressive exercises are blended around your recovery stage.",
  },
  {
    title: "Sustainable recovery",
    copy: "You get practical home guidance so progress continues between sessions and after discharge.",
  },
];

const services = [
  {
    image: "/services-ai/neck-back-therapy.jpg",
    title: "Neck & back therapy",
    copy: "Pain relief, mobility work, posture retraining, and long-term spine resilience.",
  },
  {
    image: "/services-ai/posture-correction.jpg",
    title: "Posture correction",
    copy: "Targeted routines for desk strain, fatigue, shoulder imbalance, and daily discomfort.",
  },
  {
    image: "/services-ai/sports-injury-rehab.jpg",
    title: "Sports injury rehab",
    copy: "Strength, load management, and return-to-activity plans after injury.",
  },
  {
    image: "/services-ai/home-visit-care.jpg",
    title: "Home visit care",
    copy: "Clinic-standard physiotherapy at home for elderly, post-operative, or mobility-limited patients.",
  },
];

const testimonials = [
  {
    quote: "I walked in with severe shoulder pain and walked out with hope. The exercises were simple and effective.",
    name: "Teja Ram",
  },
  {
    quote: "After knee surgery, Dr. Kamini mapped every step. I was back to climbing stairs in weeks.",
    name: "Punit Dave",
  },
  {
    quote: "The clinic feels calm and welcoming. Every visit made me stronger.",
    name: "Sneha Kapil Shakya",
  },
];

export default function Home() {
  return (
    <div className="space-y-20">
      <IntroOverlay autoHide={true} hideAfter={2000} />

      <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">
              Personalised physiotherapy in Jodhpur
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-tight text-pink-500 md:text-7xl googleFontss-dancingScript">
              Dr. Kamini Shakya
            </h1>
            <p className="mt-3 text-xl font-semibold text-slate-900">Physiotherapist</p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-700 md:text-lg">
              Evidence-led care for pain relief, posture, mobility, sports recovery, women&apos;s health, and confident everyday movement.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-teal-700 px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Book an Appointment
            </Link>
            <a
              href="tel:+919772919458"
              className="inline-flex items-center justify-center rounded-full border border-teal-900 px-7 py-3 text-sm font-semibold text-teal-900 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Call +91 97729 19458
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-pink-100 bg-white/90 p-5 shadow-lg">
                <p className="text-2xl font-semibold text-teal-900">{item.value}</p>
                <p className="mt-1 text-xs leading-snug text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-2xl">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-pink-50 to-white">
              <Image
                src="/kamini.png"
                alt="Dr. Kamini Shakya"
                width={940}
                height={920}
                priority
                className="mx-auto h-[360px] w-full object-contain md:h-[460px]"
              />
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-pink-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Clinic hours</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">Mon - Sat, 9:00 AM - 7:30 PM</p>
              </div>
              <div className="rounded-2xl bg-teal-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Clinic</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">Rathi Hospital, Jodhpur</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">Why patients choose us</p>
          <h2 className="mt-3 text-5xl font-bold text-pink-500 googleFontss-dancingScript">Focused care, gentle progress</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-700 md:text-base">
            Treatment is designed around the person, not just the painful area. The goal is to reduce symptoms, restore function, and make movement feel safe again.
          </p>
          <Link
            href="/about-us"
            className="mt-6 inline-flex items-center justify-center rounded-full border border-teal-900 px-6 py-3 text-sm font-semibold text-teal-900 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Learn About Dr. Kamini
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {carePillars.map((item) => (
            <article key={item.title} className="rounded-2xl border border-pink-50 bg-white p-6 shadow-lg">
              <h3 className="text-base font-semibold text-teal-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">Services</p>
            <h2 className="mt-3 text-5xl font-bold text-pink-500 googleFontss-dancingScript">Premium recovery programs</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-700 md:text-base">
              A focused selection of clinic and home-based care for pain, recovery, mobility, and long-term strength.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            View All Services
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-2xl border border-pink-50 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative h-44">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-teal-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="stories" className="space-y-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">Patient stories</p>
          <h2 className="mt-3 text-5xl font-bold text-pink-500 googleFontss-dancingScript">Recovery that feels personal</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote key={item.name} className="rounded-2xl border border-pink-50 bg-white p-6 text-sm leading-relaxed text-slate-700 shadow-lg">
              <p>&ldquo;{item.quote}&rdquo;</p>
              <cite className="mt-4 block text-sm font-semibold not-italic text-teal-900">
                {item.name}
              </cite>
            </blockquote>
          ))}
        </div>
      </section>

      <section id="contact" className="overflow-hidden rounded-3xl bg-teal-800 p-8 text-white shadow-2xl md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">Start your recovery journey</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-teal-50">
              Share your concern, choose the right care path, and begin moving with confidence again.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-teal-900 shadow-lg transition hover:-translate-y-0.5"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
