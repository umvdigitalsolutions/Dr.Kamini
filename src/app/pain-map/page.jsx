import Link from "next/link";
import PainAssessment from "@/components/PainAssessment";

export const metadata = {
  title: "Interactive Pain Map | Dr. Kamini Physiotherapy Clinic",
  description: "Mark painful areas on an interactive body map and share the assessment with Dr. Kamini's clinic.",
};

export default function PainMapPage() {
  return (
    <div className="space-y-10">
      <section className="grid items-end gap-8 rounded-3xl bg-gradient-to-br from-teal-800 to-teal-700 p-8 text-white shadow-2xl md:p-10 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-100">Patient pain assessment</p>
          <h1 className="mt-3 text-5xl font-bold leading-tight text-pink-200 md:text-6xl googleFontss-dancingScript">
            Show us where it hurts
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-teal-50 md:text-base">
            Choose a body region for a detailed close-up, switch between its muscle and skeleton structures, mark one or more painful areas, and send the summary directly to the clinic before your appointment.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-900 shadow-lg transition hover:-translate-y-0.5"
        >
          Contact the clinic
        </Link>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["1", "Choose a region", "Open a focused view of the shoulder, leg, spine, hip, head or arm."],
          ["2", "Mark exact anatomy", "Switch between muscles and bones, then select a named structure and body side."],
          ["3", "Send your summary", "Your selections are included automatically in the clinic form."],
        ].map(([number, title, copy]) => (
          <div key={number} className="rounded-2xl border border-pink-100 bg-white p-5 shadow-lg">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-700">{number}</div>
            <h2 className="mt-4 text-base font-semibold text-teal-900">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy}</p>
          </div>
        ))}
      </div>

      <PainAssessment />

      <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950">
        <strong>Important:</strong> This body map records the area you report and suggests nearby muscle groups for communication only. It does not diagnose an injury or replace a physiotherapy or medical assessment. If you believe your symptoms may be an emergency, contact local emergency services.
      </aside>

      <p className="text-center text-xs leading-relaxed text-slate-500">
        Anatomical muscle geometry derived from BodyParts3D and Z-Anatomy via Optima; skeleton by the Open3D project at AnatomyTOOL. Models are used and adapted under Creative Commons Attribution-ShareAlike licenses.
      </p>
    </div>
  );
}
