export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-semibold text-slate-900">Get in Touch with Dr. Kamini</h1>
          <p className="mt-3 text-slate-600">Book appointments or ask health-related queries — our friendly team will help you take the next step towards recovery.</p>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact details */}
            <div className="bg-white border border-slate-100 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-medium">Contact Details</h2>
              <div className="mt-4 space-y-4 text-slate-700">
                <div className="flex items-start gap-3">
                  
                  <div>
                    <div className="font-medium">Hospital Address</div>
                    <div className="text-sm text-slate-600">Rathi Hospital, Shastri Nagar, Jodhpur</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div>
                    <div className="font-medium"> Clinic Address</div>
                    <div className="text-sm text-slate-600">83 Sneh Sadan, Jwala Vihar, Behind Jeevan Jyoti Hospital, Chopasni Housing Board, Jodhpur, Rajasthan - 342008</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="mt-2 space-y-2">
                      <a href="tel:+919772919458" aria-label="Call primary number" className="text-sm text-slate-700 hover:text-emerald-600 font-medium">+91 97729 19458</a>
                    </div>
                  </div>
                </div>

              

                <div className="flex items-start gap-3">
                  
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-slate-600">drkaminishakyapt@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  
                  <div>
                    <div className="font-medium">Consultation Hours</div>
                    <div className="text-sm text-slate-600">Mon – Sat: 9:00 AM – 7:30 PM</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                {/* WhatsApp link removed per request */}
              </div>
            </div>

            {/* Booking by phone only */}
            <div className="bg-white border border-slate-100 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-medium">Book an Appointment</h2>
              <p className="mt-3 text-slate-700">To book an appointment please call our clinic.</p>

              <div className="mt-6">
              

                <div className="flex flex-col md:flex-row items-center gap-3">
                  <a
                    href="tel:+919772919458"
                    className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-md shadow-md text-sm font-semibold transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    aria-label="Call clinic"
                  >
                    <span className="text-sm font-semibold">Call Now</span>
                  </a>

                  <a
                    href="https://wa.me/919772919458"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Message on WhatsApp"
                    className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-md shadow-md text-sm font-semibold transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  >
                    <span className="text-sm font-semibold">WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-slate-700 text-sm">
                <div><strong>Clinic Hours:</strong> Mon – Sat: 9:00 AM – 7:30 PM</div>
                <div><strong>Home Visits:</strong> Available on request — please call to arrange.</div>
                <div><strong>Payment:</strong> Cash, UPI accepted.</div>
                <div><strong>Location:</strong> Rathi Hospital, Shastri Nagar, Jodhpur</div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-10">
            <h3 className="text-lg font-medium text-slate-900">Find Us</h3>
            <div className="mt-4 rounded-lg overflow-hidden border border-slate-100 shadow-sm">
              <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.640495755308!2d73.00051707487313!3d26.273328787276185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c2562f2f819%3A0xde74e365cc980011!2sRathi%20Hospital!5e0!3m2!1sen!2sin!4v1770983142889!5m2!1sen!2sin"
              className='w-full h-100'
              allowFullScreen
              loading="lazy"/>
            </div>
          </div>

          <div className="mt-10 text-center text-slate-700">
            <p className="font-medium">Your Recovery Starts Here – We’re Here to Help You Heal.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
