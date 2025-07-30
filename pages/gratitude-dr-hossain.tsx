import React from "react";
import Head from "next/head";

export default function GratitudeDrHossain() {
  return (
    <>
      <Head>
        <title>Heartfelt Gratitude – Prof Dr Syed Akhter Hossain</title>
        <meta name="description" content="A tribute to our mentor Prof Dr Syed Akhter Hossain, his achievements, and his impact on generations of students." />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-sky-50 flex items-center justify-center py-20 px-4">
        <section className="max-w-2xl mx-auto glass bg-white/80 rounded-3xl shadow-2xl p-10 text-center border border-yellow-100">
          <h1 className="text-4xl font-extrabold text-yellow-700 mb-4 drop-shadow-sm">With Heartfelt Gratitude</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Prof Dr Syed Akhter Hossain</h2>
          <p className="text-lg text-gray-700 mb-6">
            Professor & Head, Department of Computer Science and Engineering<br/>
            Daffodil International University, Bangladesh
          </p>
          <p className="mb-6 text-gray-700">
            <strong>Born:</strong> 21 January 1969, Jessore, Bangladesh
          </p>
          <p className="mb-6 text-gray-700">
            Prof Dr Syed Akhter Hossain is a renowned computer scientist, educator, and technology consultant. As a pioneer in programming education in Bangladesh, he has inspired countless students to dream bigger and reach higher. His leadership in national and international programming contests, and his tireless work to enrich Bengali language technology, have left a lasting mark on the academic and tech landscape of Bangladesh.
          </p>
          <p className="mb-6 text-gray-700">
            <strong>Honors & Awards:</strong><br/>
            • National ICT Award 2016 for Outstanding Contribution to ICT Education<br/>
            • CMO-Asia Best Professor in IT Award, Singapore 2012<br/>
            • Digital Innovation Award 2011 for Bangla-2-Braille Machine Translator<br/>
            • Gold Medal, BSc (Honors), Rajshahi University
          </p>
          <blockquote className="italic text-yellow-800 border-l-4 border-yellow-400 pl-4 mb-8">
            "Your wisdom, vision, and encouragement have shaped not only our careers but also our character. Thank you for being a mentor who leads with heart and inspires with action."
          </blockquote>
          <p className="text-base text-gray-600">
            With deepest respect and gratitude,<br/>
            The Agami Team
          </p>
        </section>
      </main>
    </>
  );
}
