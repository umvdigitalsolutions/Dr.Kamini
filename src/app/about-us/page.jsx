import Image from 'next/image'
import Link from 'next/link'

const highlights = [
  { value: '2+', label: 'Years clinical experience' },
  { value: '1000+', label: 'Patients supported' },
  { value: 'MPT', label: 'Advanced physiotherapy training' },
]

const focusAreas = [
  'Back and neck pain',
  'Post-surgical recovery',
  'Sports injury rehabilitation',
  'Neurological rehabilitation',
  'Women\'s health physiotherapy',
  'Geriatric and home-visit care',
]

const approach = [
  {
    title: 'Listen first',
    copy: 'Every plan begins with your pain history, routine, comfort level, and recovery goals.',
  },
  {
    title: 'Treat with evidence',
    copy: 'Care combines manual therapy, progressive exercise, posture correction, and functional retraining.',
  },
  {
    title: 'Build lasting confidence',
    copy: 'You leave with practical home guidance so improvement continues beyond the clinic visit.',
  },
]

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-white text-slate-800">
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">About the practitioner</p>
            <h1 className="mt-3 text-5xl font-bold leading-tight text-pink-500 md:text-6xl googleFontss-dancingScript">
              Dr. Kamini Shakya
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700 md:text-lg">
              A compassionate physiotherapist focused on pain relief, mobility restoration, and long-term functional recovery through personalised, evidence-led care.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-pink-100 bg-white p-5 shadow-lg">
                  <p className="text-2xl font-semibold text-teal-900">{item.value}</p>
                  <p className="mt-1 text-xs leading-snug text-slate-600">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Book an Appointment
              </Link>
              <a
                href="tel:+919772919458"
                className="inline-flex items-center justify-center rounded-full border border-teal-900 px-6 py-3 text-sm font-semibold text-teal-900 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Call +91 97729 19458
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl bg-white p-5 shadow-2xl">
              <Image
                src="/kamini.png"
                alt="Dr. Kamini Shakya"
                width={940}
                height={920}
                className="mx-auto h-72 w-full max-w-sm rounded-2xl object-contain"
                priority
              />
              <div className="mt-5 rounded-2xl bg-pink-50 p-5">
                <p className="text-sm font-semibold text-teal-900">Physiotherapist</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  MPT Physiotherapy with certification in Functional Clinical Yoga, blending rehabilitation science with mindful movement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">Her story</p>
            <h2 className="mt-3 text-4xl font-bold text-pink-500 googleFontss-dancingScript">Care with clarity</h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-slate-700 md:text-base">
            <p>
              Dr. Kamini Shakya has worked across clinic-based and home-visit physiotherapy settings, supporting patients with musculoskeletal, neurological, post-surgical, sports, and age-related concerns.
            </p>
            <p>
              Her clinical exposure across the NCR region and experience at SMS Hospital, Jaipur strengthened her ability to assess diverse conditions and build practical recovery plans for daily life.
            </p>
            <p>
              Her work is patient-centred: each plan is shaped around medical history, lifestyle, pain behaviour, strength, mobility, and the confidence a patient needs to return to normal activity.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-5 md:grid-cols-3">
          {approach.map((item) => (
            <article key={item.title} className="rounded-2xl border border-pink-50 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-teal-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 rounded-3xl bg-white p-6 shadow-2xl md:grid-cols-[0.9fr_1.1fr] md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-700">Expertise</p>
            <h2 className="mt-3 text-4xl font-bold text-pink-500 googleFontss-dancingScript">What she treats</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Treatment is designed to reduce pain, improve strength and mobility, and prevent recurrence wherever possible.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {focusAreas.map((area) => (
              <div key={area} className="rounded-2xl bg-pink-50 px-4 py-3 text-sm font-medium text-slate-700">
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-6">
        <div className="flex flex-col gap-5 rounded-3xl bg-teal-800 p-8 text-white shadow-2xl md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Ready to start recovery?</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-teal-50">
              Call the clinic to book an appointment or discuss whether clinic care or a home visit is right for you.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-900 shadow-lg transition hover:-translate-y-0.5"
          >
            Contact Details
          </Link>
        </div>
      </section>
    </main>
  )
}
