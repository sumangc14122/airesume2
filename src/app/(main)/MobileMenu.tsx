"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { User, FileText, Edit, MessageSquare } from "lucide-react";

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileHubOpen, setIsProfileHubOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  return (
    <>
      <button
        className="rounded-md p-2 text-gray-700 hover:text-teal-600 dark:text-gray-300 md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
        aria-label="Toggle mobile menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      {isMenuOpen && (
        <div className="absolute right-4 top-16 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 md:hidden">
          <Link
            href="/resumes"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => setIsMenuOpen(false)}
          >
            📄 Resume Builder
          </Link>
          <Link
            href="/cover-letter"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => setIsMenuOpen(false)}
          >
            ✉️ Cover Letter
          </Link>
          <Link
            href="/audit"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => setIsMenuOpen(false)}
          >
            📊 Audit Resume
          </Link>
          <Link
            href="/job-tracker"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            onClick={() => setIsMenuOpen(false)}
          >
            📋 Job Tracker
          </Link>
          {isSignedIn && user?.id && (
            <Link
              href="/resume-lab"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              🧪 Resume Lab
            </Link>
          )}
          {isSignedIn && (
            <>
              <button
                onClick={() => setIsProfileHubOpen(!isProfileHubOpen)}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                aria-expanded={isProfileHubOpen}
                aria-haspopup="true"
              >
                <User className="h-4 w-4" /> Profile Hub
              </button>
              {isProfileHubOpen && (
                <div className="border-l border-gray-200 pl-4 dark:border-gray-700">
                  <Link
                    href="/profile/create"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsProfileHubOpen(false);
                    }}
                  >
                    <Edit className="h-4 w-4" /> Profile Settings
                  </Link>
                  <Link
                    href={`/profile/${user?.id}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsProfileHubOpen(false);
                    }}
                  >
                    <User className="h-4 w-4" /> View Profile
                  </Link>
                  <Link
                    href="/profile/posts/create"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsProfileHubOpen(false);
                    }}
                  >
                    <MessageSquare className="h-4 w-4" /> New Post
                  </Link>
                  <Link
                    href="/profile/reviews/create"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsProfileHubOpen(false);
                    }}
                  >
                    <FileText className="h-4 w-4" /> Resume Review
                  </Link>
                  <Link
                    href="/chat"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsProfileHubOpen(false);
                    }}
                  >
                    <FileText className="h-4 w-4" /> AI ChatBot
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
