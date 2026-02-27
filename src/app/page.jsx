
import IntroOverlay from "@/components/IntroOverlayClient";
import Link from 'next/link'

export default function Home() {
  return (
<div>
        <IntroOverlay autoHide={true} hideAfter={2000} />
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-800">
              
            </p>
              <div className="flex items-center gap-6">
                <div className="rounded-2xl bg-white p-1">
                  <img
                    src="/kamini.png"  
                    alt="Dr. Kamini Shakya"
                    className="h-36 w-36 md:h-48 md:w-48 object-contain rounded-lg"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold leading-tight sm:text-2xl sm:text-3xl text-pink-500 googleFontss-dancingScript">
                    Dr. Kamini Shakya
                  </h1>
                  <p className="mt-1 text-lg text-slate-900 googleFontss-Changa One placed-text-centre">Physiotherapist</p>
                </div>
              </div>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-700">
              A calm, science-backed approach to pain relief, postural balance,
              and lasting mobility. Personalized physiotherapy for every stage
              of life.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl inline-flex items-center justify-center">
                Book an Appointment
              </Link>
              <a href="tel:+919772919458" className="rounded-full border border-teal-900 px-6 py-3 text-sm font-semibold text-teal-900 transition hover:-translate-y-0.5 hover:shadow-lg inline-flex items-center justify-center">
                Call +91 9772919458
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-8">
              <div>
                <p className="text-xl font-semibold text-teal-900">2+ Years</p>
                <p className="text-sm text-slate-600">Clinical practice</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-teal-900">1000+</p>
                <p className="text-sm text-slate-600">Patients supported</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-teal-900">98%</p>
                <p className="text-sm text-slate-600">Recovery satisfaction</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl">
            <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-pink-200 opacity-70" />
            <h2 className="relative z-10 text-2xl font-semibold">
              Focused care, gentle progress
            </h2>
            <p className="relative z-10 mt-4 text-sm leading-relaxed text-slate-600">
              Each session blends manual therapy, guided movement, and home
              exercises designed around your goals.
            </p>
            <div className="relative z-10 mt-6 space-y-4 text-sm">
              <div>
                <span className="block text-slate-500">Mon - Sat</span>
                <strong className="text-slate-900">9:00 AM - 7:30 PM</strong>
              </div>
              <div>
                <span className="block text-slate-500">Sunday</span>
                <strong className="text-slate-900">By appointment</strong>
              </div>
            </div>
            <div className="relative z-10 mt-6 inline-flex rounded-2xl bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900">
              Clinic: Rathi Hospital, Shastri Nagar, Jodhpur, Rajasthan
            </div>
          </div>
        </section>

        <section id="about" className="mt-3 grid gap-10 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl">
            <h2 className="mt-3 relative overflow-hidden text-3xl font-semibold sm:text-4xl text-pink-500">
              About Dr. Kamini
            </h2>
            <p className="mt-4 relative overflow-hidden  text-base leading-relaxed text-slate-700">
              Dr. Kamini is a licensed physiotherapist who specializes in
              orthopedic rehabilitation, chronic pain management, and
              post-surgical recovery. Her practice centers on education, empathy,
              and evidence-based interventions that restore confidence in
              movement.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Hands-on therapy",
                copy: "Soft tissue release and joint mobilization for faster relief.",
              },
              {
                title: "Posture correction",
                copy: "Targeted routines to reduce fatigue and daily discomfort.",
              },
              {
                title: "Sports rehab",
                copy: "Return-to-play programs with performance tracking.",
              },
              {
                title: "Womens health",
                copy: "Pre/postnatal care and pelvic floor physiotherapy.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-5 shadow-xl"
              >
                <h3 className="text-base font-semibold text-teal-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="mt-3 grid gap-9 place-items-center">
          <div className="max-w-xl">
            <h2 className="mt-3 text-6xl font-bold lg:text-6xl text-pink-500 googleFontss-dancingScript">
              Services
            </h2>
            <p className="mt-3 text-slate-700">
              
            </p>
          </div>

          <div className="mt-3 grid gap-6 md:grid-cols-2 lg:gap-8 w-full max-w-4xl mx-auto justify-center">
            {[
              {
                image: "/backPain.png",
                title: "Back and neck pain",
                copy: "Decompression therapy, traction, and posture retraining.",
              },
              {
                image: "/postsurgeryrecovery.png",
                title: "Post-surgery rehab",
                copy: "Structured recovery plans after fractures, ACL, or joint surgery.",
              },
              {
                image: "/neurorehab.png",
                title: "Neurological rehab",
                copy: "Balance, gait, and coordination therapy for neurological needs.",
              },
              {
                image: "/homevisit.png",
                title: "Home visits",
                copy: "In-home care for elders or patients needing extra assistance.",
              },
            ].map((item) => (
              <article
                key={item.title}
    
              >
                <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-tr from-pink-200 to-teal-100 opacity-80 transform rotate-6" />

                <div className="relative flex flex-col items-center text-center gap-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`${item.title} illustration`}
                      className="h-50 w-auto rounded-md object-contain mb-3"
                    />
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 text-xl font-semibold">
                      {item.icon}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-teal-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.copy}</p>
                  </div>
                </div>

                <div className="absolute right-4 bottom-4 hidden scale-90 transform-gpu opacity-0 transition-opacity group-hover:opacity-100 group-hover:scale-100 md:block">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="28" cy="28" r="28" fill="url(#g)" opacity="0.12" />
                    <defs>
                      <linearGradient id="g" x1="0" y1="0" x2="56" y2="56">
                        <stop offset="0" stopColor="#FF66C4" />
                        <stop offset="1" stopColor="#74C7CD" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="stories" className="mt-3 grid gap-9 place-items-center">
          <h2 className="mt-2 text-6xl font-bold sm:text-6xl text-pink-500 item-place-centre googleFontss-dancingScript">
            Patient Stories
          </h2>
          <div className="mt-1 grid gap-6 md:grid-cols-3 item-place-item-centre">
            {[
              {
                quote:
                  "I walked in with severe shoulder pain and walked out with hope. The exercises were simple and effective.",
                name: "Teja Ram",
              },
              {
                quote:
                  "After knee surgery, Dr. Kamini mapped every step. I was back to climbing stairs in weeks.",
                name: "Punit Dave",
              },
              {
                quote:
                  "The clinic feels calm and welcoming. Every visit made me stronger.",
                name: "Sneha Kapil Shakya",
              },
            ].map((item) => (
              <blockquote
                key={item.name}
                className="relative overflow-hidden rounded-3xl bg-white p-8 text-sm leading-relaxed text-slate-700 shadow-2xl"
              >
                <p>"{item.quote}"</p>
                <cite className="mt-4 block text-sm font-semibold text-teal-900">
                  - {item.name}
                </cite>
              </blockquote>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="mt-3 relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl flex flex-wrap items-center justify-between gap-6 px-8 py-10"
        >
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Start your recovery journey
            </h2>
            <p className="mt-3 text-slate-700">
              Share your concern, get a tailored plan, and begin moving with
              confidence again.
            </p>
          </div>
          <Link href="/contact" className="rounded-full bg-teal-800 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl inline-flex items-center justify-center">
            Schedule a Consultation
          </Link>
        </section>
    </div>
  );
}
