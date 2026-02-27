import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import PageLoader from "@/components/pageloader";

export const metadata = {
  title: "Dr. Kamini Physiotherapy Clinic",
  description: "Personalized physiotherapy care for pain relief, recovery, and mobility.",
  icons: {
    icon: "/prime.png",
    apple: "/prime.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true} data-lt-installed="true">
      <body
        className="min-h-screen text-slate-900"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(/watermark.jpeg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "40%",
          backgroundAttachment: "fixed",
        }}
      >
        <Header />
            <div className="min-h-screen text-slate-900">
      <PageLoader />
      <main className="mx-auto flex max-w-6xl flex-col gap-20 px-6 py-16 w-full">
        {children}
      </main>
    </div>
        <Footer />
      </body>
    </html>
  );
}
