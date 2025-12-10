"use client";
import * as React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export default function ApplicationForm() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
        (e.currentTarget as HTMLFormElement).reset();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-2xl w-full mx-auto">
        <div className="text-center">
          <div className="text-5xl mb-4">✓</div>
          <h3 className="text-2xl font-bold text-green-600 mb-2">Application Submitted!</h3>
          <p className="text-gray-600">We've received your application. Our AI is reviewing your profile now.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-10 rounded-2xl shadow-lg max-w-2xl w-full mx-auto">
      <h2 className="text-3xl font-bold text-indigo-600 mb-2 text-center">
        Apply for Your Dinner Experience
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Tell us about yourself so we can find your perfect dinner group
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Personal Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" name="name" placeholder="John Doe" className="mt-1" required />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" type="email" placeholder="john@example.com" className="mt-1" required />
          </div>
        </div>

        {/* Age & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <Label htmlFor="age">Age *</Label>
            <Input id="age" name="age" type="number" min="18" max="120" placeholder="30" className="mt-1" required />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="location">City/Location *</Label>
            <Input id="location" name="location" placeholder="San Francisco, CA" className="mt-1" required />
          </div>
        </div>

        {/* About You */}
        <div className="flex flex-col">
          <Label htmlFor="bio">About Yourself *</Label>
          <Textarea 
            id="bio" 
            name="bio" 
            placeholder="Tell us what makes you unique, your personality traits, what you're passionate about..."
            rows={4} 
            className="mt-1" 
            required 
          />
        </div>

        {/* Interests */}
        <div className="flex flex-col">
          <Label htmlFor="interests">Interests & Hobbies</Label>
          <Textarea 
            id="interests" 
            name="interests" 
            placeholder="e.g., cooking, hiking, art, music, travel, gaming..."
            rows={3} 
            className="mt-1" 
          />
        </div>

        {/* Dietary Preferences */}
        <div className="flex flex-col">
          <Label htmlFor="dietary">Dietary Preferences & Restrictions</Label>
          <Textarea 
            id="dietary" 
            name="dietary" 
            placeholder="e.g., vegetarian, vegan, gluten-free, allergies, preferences..."
            rows={2} 
            className="mt-1" 
          />
        </div>

        {/* Profession */}
        <div className="flex flex-col">
          <Label htmlFor="profession">Profession/Occupation</Label>
          <Input 
            id="profession" 
            name="profession" 
            placeholder="e.g., Software Engineer, Designer, Teacher..."
            className="mt-1" 
          />
        </div>

        {/* Availability */}
        <div className="flex flex-col">
          <Label htmlFor="availability">Availability (dates/times)</Label>
          <Textarea
            id="availability"
            name="availability"
            placeholder="e.g., 2025-12-20 19:00; 2025-12-21 18:30 or 'Weeknights after 6pm'"
            rows={2}
            className="mt-1"
          />
          <p className="text-xs text-slate-500 mt-1">Provide a few preferred date/time options separated by commas or semicolons.</p>
        </div>

        <Button 
          type="submit" 
          variant="default" 
          className="mt-6" 
          size="default" 
          disabled={loading}
          style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  );
}