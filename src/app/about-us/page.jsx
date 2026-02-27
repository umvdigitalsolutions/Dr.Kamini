export default function AboutUs() {
  return (
    <div className="">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-semibold text-teal-900">About Dr. Kamini Shakya</h1>
        <p className="mt-3 text-slate-600">Evidence-led physiotherapy for lasting recovery.</p>
      </header>

      <section className="grid gap-8 lg:grid-cols-1">
        <div className="rounded-3xl bg-white p-8 shadow-2xl">
          <img
            src="/kamini.png"
            alt="Dr. Kamini Shakya"
            className="mx-auto h-44 w-44 rounded-lg object-cover"
          />
          <h2 className="mt-6 text-4xl font-bold text-pink-500 googleFontss-dancingScript">Meet Dr. Kamini</h2>
          <p className="mt-3 text-lg text-slate-700 leading-relaxed text-justify">
            Dr. Kamini Shakya is a dedicated and compassionate physiotherapist with over 2+ years of professional experience in rehabilitation and pain management. With a strong academic foundation and practical clinical exposure, she is committed to helping patients regain mobility, reduce pain, and improve their quality of life through personalized, evidence-based care.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed text-justify mt-2">
            She holds a Master’s Degree in Physiotherapy, reflecting advanced knowledge and specialization in modern rehabilitation techniques. Dr. Kamini is also certified in FCY (Functional Clinical Yoga), allowing her to integrate therapeutic yoga principles with physiotherapy for better recovery, posture correction, and long-term functional improvement.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed text-justify mt-2">
            Dr. Kamini has gained clinical experience across the NCR region, providing both clinic-based and home-visit services. Her professional background includes work at SMS Hospital, Jaipur, where she managed a wide range of musculoskeletal and neurological cases, strengthening her ability to handle diverse patient needs.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed text-justify mt-2">
            Her areas of expertise include back and neck pain management, post-surgical rehabilitation, sports injury recovery, neurological rehabilitation, knee and shoulder therapy, and geriatric physiotherapy. She provides in-home care when needed to ensure continuity and comfort.
          </p>

          <p className="text-lg text-slate-700 leading-relaxed text-justify mt-2">
            Dr. Kamini follows a patient-centered approach: each treatment plan is tailored to medical history, lifestyle, and recovery goals. Beyond immediate pain relief, she focuses on restoring function, improving strength and mobility, and preventing recurrence — combining scientific techniques with compassionate care to empower patients through their recovery.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-slate-600">
            <li>• Mpt Physiotherapy</li>
            <li>• 2+ years clinical experience</li>
            <li>• Special interests: sports rehab, women’s health</li>
          </ul>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-teal-900">Treatment Philosophy</h3>
            <p className="mt-3 text-slate-700">
              We focus on long-term improvements by combining hands-on care with
              progressive movement plans and simple home exercises — always
              explained so you know why each step matters.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-teal-900">Core Services</h3>
            <div className="mt-4 grid gap-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-teal-50 p-3 text-teal-700">💆‍♀️</div>
                <div>
                  <p className="font-semibold text-teal-900">Hands-on therapy</p>
                  <p className="text-sm text-slate-600">Soft tissue release and joint mobilisations.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-teal-50 p-3 text-teal-700">🏃‍♀️</div>
                <div>
                  <p className="font-semibold text-teal-900">Rehab programs</p>
                  <p className="text-sm text-slate-600">Post-surgical and sport-specific return-to-play plans.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-teal-900">Book a visit</h3>
            <p className="mt-3 text-slate-700">Appointments are available Monday–Saturday. New patients welcome.</p>
            <div className="mt-4 flex gap-3">
              <a href="tel:+919772919458" className="rounded-full bg-teal-800 px-4 py-2 text-xs font-semibold text-white">Call +91 97729 19458</a>
              <a href="#contact" className="rounded-full border border-teal-800 px-4 py-2 text-xs font-semibold text-teal-800">Contact form</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
