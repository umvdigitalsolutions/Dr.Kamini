import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 py-8 text-sm text-slate-600 bg-pink-200/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">

          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/">
              <img alt="Clinic logo" src="/prime.png" className="h-12 w-auto object-contain" />
            </Link>
            <div>
              <p className="text-lg font-semibold text-slate-900">Dr. Kamini Shakya</p>
              <p className="text-sm text-slate-600">Physiotherapist</p>
              <p className="text-xs text-slate-500 mt-1">Mon – Sat: 9:00 AM – 7:30 PM</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full md:w-auto">
            <div>
              <p className="font-semibold text-slate-900">Contact</p>
              <div className="mt-2 space-y-1">
                <a href="tel:+919772919458" className="block text-slate-700 hover:text-emerald-600">+91 97729 19458</a>
                <a href="mailto:drkaminishakyapt@gmail.com" className="block text-slate-700 hover:text-sky-600">drkaminishakyapt@gmail.com</a>
              </div>
            </div>

            <div>
              <p className="font-semibold text-slate-900">Location</p>
              <p className="mt-2 text-slate-700">Rathi Hospital, Shastri Nagar, Jodhpur, Rajasthan</p>
              <a href="https://maps.app.goo.gl/VrB3kfcHBvzbukuz7" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-slate-600 hover:text-slate-900">Get directions</a>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3">
            <p className="font-semibold text-slate-900">Follow</p>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/drkaminiphysio/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-white border border-slate-100 hover:bg-pink-50">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 text-pink-600" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <path d="M17.5 6.5h.01" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center md:justify-end gap-2">
          <span className="text-xs text-slate-500">Developed by</span>
          <a href="#" className="inline-block">
            <img src="/umv.png" alt="UMV" className="h-6 w-auto" />
          </a>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-500 text-center">
          © {new Date().getFullYear()} Dr. Kamini Shakya. All rights reserved.
        </div>
      </div>
    </footer>
  );
}