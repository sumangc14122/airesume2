"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Send,
  Brain,
  ClipboardList,
  Globe,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import logo from "@/assets/logo.png";
import resumePreview from "@/assets/resume-preview.jpg";
import amazonLogo from "@/logos/amazon.svg";
import appleLogo from "@/logos/apple.svg";
import bookingLogo from "@/logos/booking.svg";
import googleLogo from "@/logos/google.svg";
import metaLogo from "@/logos/meta.svg";
import amazonLogoDark from "@/logos/amazon-dark.svg";
import appleLogoDark from "@/logos/apple-dark.svg";
import bookingLogoDark from "@/logos/booking-dark.svg";
import googleLogoDark from "@/logos/google-dark.svg";
import metaLogoDark from "@/logos/meta-dark.svg";

interface Blog {
  id: string;
  title: string;
  summary: string;
}
interface Review {
  id: string;
  description?: string;
}
interface Story {
  id: string;
  title: string;
  excerpt: string;
}

export default function HomeContent({
  blogs,
  reviews,
  successStories,
}: {
  blogs: Blog[];
  reviews: Review[];
  successStories: Story[];
}) {
  const { isSignedIn } = useUser();

  const [showCookieBanner, setShowCookieBanner] = useState(false);
  //   const [chatModalOpen, setChatModalOpen] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("cookiesAccepted")) {
      setShowCookieBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "yes");
    setShowCookieBanner(false);
  };

  // const featureCards = [
  //   {
  //     icon: <FileText size={24} className="text-indigo-600" />,
  //     title: "AI Resume Builder",
  //     desc: "Free for 2 resumes, then $9.99/mo or $19.99/yr.",
  //     hoverInfo:
  //       "Step-by-step wizard + modern templates: build, style & export PDFs.",
  //     href: "/resumes",
  //     previewImage:
  //       "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_editor_resumeId%3Dcma9r2ppd000ssjeur7z6gj7m%26step%3Deducation.png",
  //   },
  //   {
  //     icon: <Send size={24} className="text-green-600" />,
  //     title: "Cover Letter Generator",
  //     desc: "Unlimited AI letters, always free.",
  //     hoverInfo:
  //       "Answer a few prompts → receive a tailored cover letter instantly.",
  //     href: "/cover-letter",
  //     previewImage:
  //       "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_cover-letter.png",
  //   },
  //   {
  //     icon: <ClipboardList size={24} className="text-yellow-600" />,
  //     title: "Resume Audit",
  //     desc: "Upload & get an AI score. Free.",
  //     hoverInfo:
  //       "ATS-score, readability & keyword health: instant PDF feedback.",
  //     href: "/audit",
  //     previewImage:
  //       "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_audit.png",
  //   },
  //   {
  //     icon: <Globe size={24} className="text-blue-600" />,
  //     title: "Job Tracker",
  //     desc: "Track every application. Free.",
  //     hoverInfo:
  //       "Manage deadlines, links, interview notes & statuses all in one place.",
  //     href: "/job-tracker",
  //     previewImage:
  //       "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_job-tracker.png",
  //   },
  //   {
  //     icon: <Brain size={24} className="text-pink-600" />,
  //     title: "Resume Lab",
  //     desc: "Advanced PDF editor & AI suggestions. Free.",
  //     hoverInfo:
  //       "Select, rewrite & annotate your resume live with GPT-4 power.",
  //     href: "/resume-lab",
  //     previewImage:
  //       "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_resume-lab+(1).png",
  //   },
  //   {
  //     icon: <FileText size={24} className="text-red-600" />,
  //     title: "Profile Hub",
  //     desc: "Share your profile & blogs. Free.",
  //     hoverInfo:
  //       "Build a public profile, post success stories & request reviews.",
  //     href: "/profile/reviews/create",
  //     previewImage:
  //       "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_profile_user_2wAqP10NByHsUH6Aas6VsjzraH2.png",
  //   },
  //   {
  //     icon: <MessageCircle size={24} className="text-purple-600" />,
  //     title: "AI Chat Bot",
  //     desc: "Instant AI career coach. Free.",
  //     hoverInfo: "Chat 1:1 for resume tips, interview prep, coding Qs & more.",
  //     href: "/chat",
  //     previewImage:
  //       "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_chat.png",
  //   },
  // ];

  const featureCards: {
    icon: JSX.Element;
    title: string;
    desc: string;
    hoverInfo: string;
    href?: string;
    previewImage: string;
    action?: () => void;
  }[] = [
    {
      icon: <FileText size={24} className="text-indigo-600" />,
      title: "AI Resume Builder",
      desc: "Free for 2 resumes, then $9.99/mo or $19.99/yr.",
      hoverInfo:
        "Step-by-step wizard + modern templates: build, style & export PDFs.",
      href: "/resumes",
      previewImage:
        "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_editor_resumeId%3Dcma9r2ppd000ssjeur7z6gj7m%26step%3Deducation.png",
    },
    {
      icon: <Send size={24} className="text-green-600" />,
      title: "Cover Letter Generator",
      desc: "Unlimited AI letters, always free.",
      hoverInfo:
        "Answer a few prompts → receive a tailored cover letter instantly.",
      href: "/cover-letter",
      previewImage:
        "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_cover-letter.png",
    },
    {
      icon: <ClipboardList size={24} className="text-yellow-600" />,
      title: "Resume Audit",
      desc: "Upload & get an AI score. Free.",
      hoverInfo:
        "ATS-score, readability & keyword health: instant PDF feedback.",
      href: "/audit",
      previewImage:
        "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_audit.png",
    },
    {
      icon: <Globe size={24} className="text-blue-600" />,
      title: "Job Tracker",
      desc: "Track every application. Free.",
      hoverInfo:
        "Manage deadlines, links, interview notes & statuses all in one place.",
      href: "/job-tracker",
      previewImage:
        "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_job-tracker.png",
    },
    {
      icon: <Brain size={24} className="text-pink-600" />,
      title: "Resume Lab",
      desc: "Advanced PDF editor & AI suggestions. Free.",
      hoverInfo:
        "Select, rewrite & annotate your resume live with GPT-4 power.",
      href: "/resume-lab",
      previewImage:
        "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_resume-lab+(1).png",
    },
    {
      icon: <FileText size={24} className="text-red-600" />,
      title: "Profile Hub",
      desc: "Share your profile & blogs. Free.",
      hoverInfo:
        "Build a public profile, post success stories & request reviews.",
      href: "/profile/reviews/create",
      previewImage:
        "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_profile_user_2wAqP10NByHsUH6Aas6VsjzraH2.png",
    },
    {
      icon: <MessageCircle size={24} className="text-purple-600" />,
      title: "AI Chat Bot",
      desc: "Instant AI career coach. Free.",
      hoverInfo: "Chat 1:1 for resume tips, interview prep, coding Qs & more.",
      href: "/chat",
      previewImage:
        "https://airesumeimages.s3.us-east-1.amazonaws.com/localhost_3001_chat.png",
    },
  ];

  const handleNextFeature = () => {
    setCurrentFeatureIndex((p) => (p + 1) % featureCards.length);
  };
  const handlePrevFeature = () => {
    setCurrentFeatureIndex(
      (p) => (p - 1 + featureCards.length) % featureCards.length,
    );
  };

  const typingVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="relative flex min-h-screen flex-col">
      {/* subtle BG */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="animate-gradient-bg absolute inset-0 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-black" />
      </div>

      {/* NAV */}
      <nav className="fixed top-0 z-50 w-full border-b bg-white/90 backdrop-blur dark:bg-black/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="Logo" width={32} height={32} />
            <span className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
              AI Career Suite
            </span>
          </Link>
          <div className="space-x-4">
            {!isSignedIn ? (
              <>
                <Link href="/sign-in">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-indigo-600 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/audit">
                <Button variant="ghost" size="sm">
                  My Profile
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pb-16 pt-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:w-1/2 md:text-left"
          >
            <motion.h1
              variants={typingVariants}
              initial="hidden"
              animate="visible"
              className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl"
            >
              {"Supercharge Your Career Journey".split("").map((c, i) => (
                <motion.span key={i} variants={letterVariants}>
                  {c}
                </motion.span>
              ))}
            </motion.h1>
            <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
              Craft standout resumes, generate cover letters, track
              applications, and get AI-powered insights—all in one place.
            </p>
            {!isSignedIn ? (
              <Link href="/job-tracker">
                <Button
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  Start for Free
                </Button>
              </Link>
            ) : (
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  My Profile
                </Button>
              </Link>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2"
          >
            <Image
              src={resumePreview}
              alt="Preview"
              className="rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
        </div>
      </section>

      {/* FEATURE SPOTLIGHT */}
      <section className="bg-gradient-to-b from-white to-indigo-50 py-12 dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Spotlight Feature
          </h2>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeatureIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-8 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 md:flex-row"
              >
                <div className="md:w-1/2">
                  <div className="flex items-center gap-3">
                    {featureCards[currentFeatureIndex].icon}
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {featureCards[currentFeatureIndex].title}
                    </h3>
                  </div>
                  <p className="mt-3 text-gray-600 dark:text-gray-300">
                    {featureCards[currentFeatureIndex].desc}
                  </p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {featureCards[currentFeatureIndex].hoverInfo}
                  </p>
                  {featureCards[currentFeatureIndex].href ? (
                    <Link href={featureCards[currentFeatureIndex].href}>
                      <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
                        Try Now
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      onClick={featureCards[currentFeatureIndex].action}
                      className="mt-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                      Try Now
                    </Button>
                  )}
                </div>
                <div className="h-64 overflow-y-auto rounded-lg border border-gray-200 shadow-sm dark:border-gray-700 md:h-80 md:w-1/2">
                  <img
                    src={featureCards[currentFeatureIndex].previewImage}
                    alt={`${featureCards[currentFeatureIndex].title} Preview`}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
            <button
              onClick={handlePrevFeature}
              className="absolute -left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-indigo-600 p-2 text-white hover:bg-indigo-700"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextFeature}
              className="absolute -right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-indigo-600 p-2 text-white hover:bg-indigo-700"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* ALL FEATURES */}
      <section className="bg-white py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Explore All Features
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((f, i) => {
              const CardInner = (
                <motion.div
                  whileHover={{ rotateX: 3, rotateY: 5, scale: 1.02 }}
                  key={i}
                  className="group flex cursor-pointer flex-col items-start rounded-xl bg-gradient-to-br from-gray-50 to-indigo-50 p-6 shadow-lg transition-all duration-300 dark:from-gray-800 dark:to-gray-700"
                  onClick={f.action}
                >
                  {f.icon}
                  <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {f.desc}
                  </p>
                  <p className="mt-2 text-sm text-gray-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-gray-400">
                    {f.hoverInfo}
                  </p>
                </motion.div>
              );
              return f.href ? (
                <Link key={i} href={f.href}>
                  {CardInner}
                </Link>
              ) : (
                CardInner
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 dark:from-indigo-700 dark:to-purple-700">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to Land Your Dream Job?
          </h2>
          <p className="mb-6 text-lg text-indigo-100">
            Join thousands of users leveraging AI to streamline their career
            journey.
          </p>
          {!isSignedIn ? (
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-indigo-100 dark:bg-gray-200 dark:text-indigo-800 dark:hover:bg-gray-300"
              >
                Sign Up Now
              </Button>
            </Link>
          ) : (
            <Link href="/resume-lab">
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-indigo-100 dark:bg-gray-200 dark:text-indigo-800 dark:hover:bg-gray-300"
              >
                My Account{" "}
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* LOGOS */}
      <section className="bg-indigo-50 py-12 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="mb-6 text-gray-500 dark:text-gray-400">Trusted by:</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[amazonLogo, metaLogo, appleLogo, googleLogo, bookingLogo].map(
              (src, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  className="relative h-12 w-32 opacity-70 transition-opacity duration-300 hover:opacity-100"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-contain dark:hidden"
                  />
                  <Image
                    src={
                      [
                        amazonLogoDark,
                        metaLogoDark,
                        appleLogoDark,
                        googleLogoDark,
                        bookingLogoDark,
                      ][idx]
                    }
                    alt=""
                    fill
                    className="hidden object-contain dark:block"
                  />
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* BLOGS & REVIEWS */}
      <section className="bg-white py-16 dark:bg-gray-900">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Latest Public Blogs
            </h2>
            <ul className="space-y-4">
              {blogs.map((b) => (
                <motion.li
                  key={b.id}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-lg bg-indigo-50 p-4 transition-transform duration-300 dark:bg-gray-800"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {b.summary}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Resume Review Requests
            </h2>
            <ul className="space-y-4">
              {reviews.map((r) => (
                <motion.li
                  key={r.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between rounded-lg bg-yellow-50 p-4 transition-transform duration-300 dark:bg-gray-800"
                >
                  <span className="truncate text-gray-900 dark:text-white">
                    {r.description || "No description"}
                  </span>
                  <Send size={20} className="text-yellow-600" />
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="bg-indigo-50 py-16 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Success Stories
          </h2>
          <ul className="space-y-4">
            {successStories.map((s) => (
              <motion.li
                key={s.id}
                whileHover={{ scale: 1.02 }}
                className="rounded-lg bg-white p-4 transition-transform duration-300 dark:bg-gray-700"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  {s.excerpt}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* AI CHAT MODAL
      <AnimatePresence>
        {chatModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl w-11/12 md:w-2/3 lg:w-1/2 p-6 relative shadow-xl"
            >
              <button
                onClick={() => setChatModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              >
                ✕
              </button>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Try the AI Chat Bot
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Preview our in-app AI chat experience without signing in.
              </p>
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">[Live Chat Demo]</span>
              </div>
              <div className="mt-4 text-center">
                <Link href="/signup">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
                    Sign Up to Chat Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* FOOTER */}
      <footer className="mt-auto bg-gray-800 py-8 text-gray-300">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3">
          <div>
            <h4 className="mb-2 font-semibold text-gray-100">
              AI Career Suite
            </h4>
            <p>All your career tools in one place.</p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-gray-100">Legal</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/legal/terms-of-use" className="hover:underline">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/data-policy" className="hover:underline">
                  Data Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/ai-usage-policy" className="hover:underline">
                  AI Usuage Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/user-generated-content"
                  className="hover:underline"
                >
                  User-Generated Content Terms
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setShowCookieBanner(true)}
                  className="hover:underline"
                >
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-gray-100">Contact</h4>
            <p>support@aicareersuite.com</p>
          </div>
        </div>
      </footer>

      {/* COOKIE BANNER */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-4 left-1/2 z-50 flex w-[90%] max-w-md -translate-x-1/2 items-center justify-between rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800"
          >
            <p className="text-sm text-gray-700 dark:text-gray-300">
              We use cookies to improve your experience. By continuing you
              accept our{" "}
              <Link href="/legal/privacy-policy" className="underline">
                Privacy Policy
              </Link>
              . and{" "}
              <Link href="/legal/privacy-policy" className="underline">
                {" "}
                Cookie Policy
              </Link>
              .
            </p>
            <Button
              size="sm"
              onClick={acceptCookies}
              className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Got it
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
