import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white flex flex-col">
      {/* HERO HEADER */}
      <section className="relative py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-primary/10 blur-3xl opacity-40" />

        <div className="relative container px-4">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-slate-900">
            Let’s Plan Your Journey
          </h1>
          <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Whether you have a question, need a custom itinerary, or want to
            start planning your next adventure — our team is ready to assist.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="container pb-24 px-4 md:px-6 flex-1">
        <div className="grid lg:grid-cols-3 gap-14 items-start">
          {/* CONTACT INFO */}
          <div className="space-y-8">
            {[
              {
                icon: MapPin,
                title: "Office Address",
                content: (
                  <>
                    Jl. Rambu Duka, RT. 026 / RW. 009, Kel. Prailiu, Kec.
                    Kambera, Kab. Sumba Timur, NTT, Indonesia
                  </>
                ),
              },
              {
                icon: Phone,
                title: "Phone & WhatsApp",
                content: (
                  <>
                    +62 812-4699-4982
                    <br />
                    +62 812 8776 3530
                  </>
                ),
              },
              {
                icon: Mail,
                title: "Email Address",
                content: <>storysumbatravel.com</>,
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="border border-slate-100 shadow-sm hover:shadow-md transition rounded-2xl"
              >
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-lg">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 text-sm pl-18 leading-relaxed">
                  {item.content}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-2">
            <Card className="border border-slate-100 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="font-serif text-3xl">
                  Send Us a Message
                </CardTitle>
                <CardDescription className="text-base">
                  Fill out the form and our team will respond within 24 hours.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Full Name"
                        className="rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/40"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@example.com"
                        className="rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/40"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+62 812..."
                      className="rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Trip Inquiry"
                      className="rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us about your travel plans..."
                      className="rounded-xl border-slate-200 focus:ring-2 focus:ring-primary/40 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full md:w-auto px-10 py-6 text-base font-semibold rounded-xl
                               bg-linear-to-r from-primary to-primary/80
                               hover:opacity-90 text-white shadow-lg transition"
                  >
                    Send Message
                  </Button>

                  <p className="text-xs text-slate-400 mt-4">
                    🔒 Your information is kept confidential and will only be
                    used to respond to your inquiry.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* MAP SECTION */}
      <section className="container pb-24 px-4 md:px-6">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8">
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              Find Us on Map
            </h2>
            <p className="text-slate-600 mt-2">
              Visit our office or schedule an appointment with our travel
              consultant.
            </p>
          </div>

          <div className="w-full h-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.2651668370613!2d106.67629657400587!3d-6.143760760224679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f9000eec8e29%3A0xe300bc3959bde11a!2sStorysumba!5e1!3m2!1sen!2sus!4v1772024521144!5m2!1sen!2sus"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
