import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-brand-50 to-slate-100">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-block">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-100 text-brand-700 text-sm font-medium">
              ✨ AI-Curated Dining Experience
            </span>
          </div>

          {/* Main Headline */}
          <div>
            <h1 className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-800 mb-6">
              Strangers at Supper
            </h1>
            <p className="text-xl sm:text-2xl text-slate-700 leading-relaxed max-w-3xl mx-auto">
              Discover meaningful conversations with 5 thoughtfully matched strangers. Our AI analyzes personality, creativity, and compatibility to create the perfect dinner group.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href="/apply">
              <Button 
                size="lg" 
                className="px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition hover:scale-105 transform duration-200"
                style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5', color: '#fff' }}
              >
                🍽️ Apply for Dinner
              </Button>
            </Link>
            <Link href="/matches">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-6 text-base font-semibold border-2 hover:bg-slate-100 transition"
              >
                👀 View Groups
              </Button>
            </Link>
            
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Apply & Share</h3>
              <p className="text-slate-600 leading-relaxed">
                Tell us about yourself. Share your interests, personality, and availability for the perfect dinner date.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-slate-900">AI Matching</h3>
              <p className="text-slate-600 leading-relaxed">
                Our AI analyzes compatibility, creativity, and personality to form the perfect group of 6 people.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 hover:shadow-lg transition">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Dine Together</h3>
              <p className="text-slate-600 leading-relaxed">
                Meet your group at a scheduled time. Share stories, ideas, and make new friends over a great meal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-brand-50 to-brand-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
            Why Strangers at Supper?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Benefit 1 */}
            <div className="flex gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-3xl flex-shrink-0">🧠</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">AI-Powered Matching</h3>
                <p className="text-slate-600">Smart algorithm ensures compatible personalities and complementary interests in every group.</p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-3xl flex-shrink-0">🎯</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Perfect Timing</h3>
                <p className="text-slate-600">We find a time that works for everyone. Just show up and enjoy.</p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-3xl flex-shrink-0">🌟</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Curated Experience</h3>
                <p className="text-slate-600">Every detail is thoughtfully chosen to make your dinner unforgettable.</p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="flex gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-3xl flex-shrink-0">🤝</div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Real Connections</h3>
                <p className="text-slate-600">Break out of your bubble and make meaningful connections with fascinating people.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-extrabold text-brand-600">100+</div>
              <p className="text-lg text-slate-600">Applicants Matched</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-extrabold text-brand-600">15+</div>
              <p className="text-lg text-slate-600">Successful Dinners</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-extrabold text-brand-600">4.9★</div>
              <p className="text-lg text-slate-600">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-brand-600 to-brand-800 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-extrabold">Ready to Meet New People?</h2>
          <p className="text-xl text-brand-100">Join our next dinner experience and make unforgettable connections.</p>
          <Link href="/apply">
            <Button 
              size="lg" 
              className="px-10 py-7 text-lg font-semibold bg-white text-brand-600 hover:bg-brand-50 shadow-lg hover:shadow-xl transition hover:scale-105 transform duration-200"
            >
              Apply Now →
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
