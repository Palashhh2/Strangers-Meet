import ApplicationForm from "@/components/forms/ApplicationForm";

export default function ApplyPage() {
  return (
    <div style={{ backgroundImage: "url('/bg-apply.svg')" }} className="min-h-screen bg-slate-50 bg-no-repeat bg-fixed bg-cover flex items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          Apply for Your Dinner Experience
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Fill in your details, share a bit about yourself, and we'll see if you're a good fit!
        </p>
        <ApplicationForm />
      </div>
    </div>
  );
}
