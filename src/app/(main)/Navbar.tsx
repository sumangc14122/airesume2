// // // // // "use client";

// // // // // import logo from "@/assets/logo.png";
// // // // // import ThemeToggle from "@/components/ThemeToggle";
// // // // // import { UserButton } from "@clerk/nextjs";
// // // // // import { dark } from "@clerk/themes";
// // // // // import { CreditCard } from "lucide-react";
// // // // // import { useTheme } from "next-themes";
// // // // // import Image from "next/image";
// // // // // import Link from "next/link";
// // // // // import { Button } from "@/components/ui/button"; // 👈 Add this line

// // // // // export default function Navbar() {
// // // // //   const { theme } = useTheme();

// // // // //   return (
// // // // //     <header className="shadow-sm">
// // // // //       <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
// // // // //         <Link href="/resumes" className="flex items-center gap-2">
// // // // //           <Image
// // // // //             src={logo}
// // // // //             alt="Logo"
// // // // //             width={35}
// // // // //             height={35}
// // // // //             className="rounded-full"
// // // // //           />
// // // // //           <span className="text-xl font-bold tracking-tight">
// // // // //             AI Resume Builder
// // // // //           </span>
// // // // //         </Link>
// // // // //         <div className="flex items-center gap-3">
// // // // //         <Link href="/cover-letter" className="text-gray-700 hover:text-gray-900">
// // // // //             Cover Letter
// // // // //           </Link>

// // // // //           <Link href="/audit">
// // // // //   <Button variant="ghost">Audit Resume</Button>
// // // // // </Link>

// // // // //           <Link href="/job-tracker" className="block px-4 py-2 hover:bg-gray-200 rounded">
// // // // //   🧾 Job Tracker
// // // // // </Link>
// // // // //           <ThemeToggle />
// // // // //           <UserButton
// // // // //             appearance={{
// // // // //               baseTheme: theme === "dark" ? dark : undefined,
// // // // //               elements: {
// // // // //                 avatarBox: {
// // // // //                   width: 35,
// // // // //                   height: 35,
// // // // //                 },
// // // // //               },
// // // // //             }}
// // // // //           >
// // // // //             <UserButton.MenuItems>
// // // // //               <UserButton.Link
// // // // //                 label="Billing"
// // // // //                 labelIcon={<CreditCard className="size-4" />}
// // // // //                 href="/billing"
// // // // //               />
// // // // //             </UserButton.MenuItems>
// // // // //           </UserButton>
// // // // //         </div>
// // // // //       </div>
// // // // //     </header>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import logo from "@/assets/logo.png";
// // // // import ThemeToggle from "@/components/ThemeToggle";
// // // // import { UserButton } from "@clerk/nextjs";
// // // // import { dark } from "@clerk/themes";
// // // // import { CreditCard, Settings, LogOut, User, Info } from "lucide-react";
// // // // import { useTheme } from "next-themes";
// // // // import Image from "next/image";
// // // // import Link from "next/link";
// // // // import { Button } from "@/components/ui/button";
// // // // import { useAuth } from "@clerk/nextjs"; // For subscription status (optional)
// // // // import { useState } from "react";

// // // // export default function Navbar() {
// // // //   const { theme } = useTheme();
// // // //   // const { user } = useAuth(); // Optional: For subscription status
// // // //   const [isMenuOpen, setIsMenuOpen] = useState(false);

// // // //   // Simulated subscription status (replace with real logic if integrated)
// // // //   // const isProUser = user?.publicMetadata?.subscription === "pro" || false;
// // // //   const auditsRemaining = 5; // Replace with actual API call if available

// // // //   return (
// // // //     <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800">
// // // //       <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
// // // //         {/* Logo and Brand */}
// // // //         <Link href="/resumes" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
// // // //           <Image
// // // //             src={logo}
// // // //             alt="AI Resume Builder Logo"
// // // //             width={40}
// // // //             height={40}
// // // //             className="rounded-full"
// // // //           />
// // // //           <div>
// // // //             <span className="text-xl font-extrabold text-indigo-900 dark:text-teal-300 tracking-tight">
// // // //               AI Resume Builder
// // // //             </span>
// // // //             <p className="text-xs text-gray-600 dark:text-gray-400">Your Career, Optimized</p>
// // // //           </div>
// // // //         </Link>

// // // //         {/* Navigation and Actions */}
// // // //         <div className="flex items-center gap-4">
// // // //           {/* Desktop Navigation */}
// // // //           <nav className="hidden md:flex items-center gap-4">
// // // //             <Link
// // // //               href="/cover-letter"
// // // //               className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium px-3 py-2 rounded-md transition-colors"
// // // //             >
// // // //               Cover Letter
// // // //             </Link>
// // // //             <Link
// // // //               href="/audit"
// // // //               className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium px-3 py-2 rounded-md transition-colors flex items-center"
// // // //               title="Get an AI-powered audit with personalized suggestions"
// // // //             >
// // // //               📊 Audit Resume
// // // //             </Link>
// // // //             <Link
// // // //               href="/job-tracker"
// // // //               className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium px-3 py-2 rounded-md transition-colors flex items-center"
// // // //             >
// // // //               📋 Job Tracker
// // // //             </Link>
// // // //           </nav>

// // // //           {/* Mobile Menu Toggle */}
// // // //           <button
// // // //             className="md:hidden text-gray-700 dark:text-gray-300 hover:text-teal-600 p-2 rounded-md"
// // // //             onClick={() => setIsMenuOpen(!isMenuOpen)}
// // // //           >
// // // //             <svg
// // // //               className="w-6 h-6"
// // // //               fill="none"
// // // //               stroke="currentColor"
// // // //               viewBox="0 0 24 24"
// // // //             >
// // // //               <path
// // // //                 strokeLinecap="round"
// // // //                 strokeLinejoin="round"
// // // //                 strokeWidth={2}
// // // //                 d="M4 6h16M4 12h16m-7 6h7"
// // // //               />
// // // //             </svg>
// // // //           </button>

// // // //           {/* Mobile Menu */}
// // // //           {isMenuOpen && (
// // // //             <div className="absolute top-16 right-4 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg md:hidden">
// // // //               <Link
// // // //                 href="/cover-letter"
// // // //                 className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
// // // //                 onClick={() => setIsMenuOpen(false)}
// // // //               >
// // // //                 Cover Letter
// // // //               </Link>
// // // //               <Link
// // // //                 href="/audit"
// // // //                 className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
// // // //                 onClick={() => setIsMenuOpen(false)}
// // // //               >
// // // //                 📊 Audit Resume
// // // //               </Link>
// // // //               <Link
// // // //                 href="/job-tracker"
// // // //                 className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
// // // //                 onClick={() => setIsMenuOpen(false)}
// // // //               >
// // // //                 📋 Job Tracker
// // // //               </Link>
// // // //             </div>
// // // //           )}

// // // //           {/* Theme Toggle and User Section */}
// // // //           <div className="flex items-center gap-2">
// // // //             <ThemeToggle />
// // // //             <div className="relative">
// // // //               <UserButton
// // // //                 appearance={{
// // // //                   baseTheme: theme === "dark" ? dark : undefined,
// // // //                   elements: {
// // // //                     avatarBox: {
// // // //                       width: 35,
// // // //                       height: 35,
// // // //                     },
// // // //                   },
// // // //                 }}
// // // //               >
// // // //                 <UserButton.MenuItems>
// // // //                   <UserButton.Link
// // // //                     label="Profile"
// // // //                     labelIcon={<User className="size-4" />}
// // // //                     href="/profile"
// // // //                   />
// // // //                   <UserButton.Link
// // // //                     label="Billing"
// // // //                     labelIcon={<CreditCard className="size-4" />}
// // // //                     href="/billing"
// // // //                   />
// // // //                   {/* <UserButton.Link
// // // //                     label="Settings"
// // // //                     labelIcon={<Settings className="size-4" />}
// // // //                     href="/settings"
// // // //                   /> */}
// // // //                   {/* <UserButton.Link
// // // //                     label="Logout"
// // // //                     labelIcon={<LogOut className="size-4" />}
// // // //                     href="/sign-out"
// // // //                   /> */}
// // // //                 </UserButton.MenuItems>
// // // //               </UserButton>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </header>
// // // //   );
// // // // }

// // // "use client";

// // // import logo from "@/assets/logo.png";
// // // import ThemeToggle from "@/components/ThemeToggle";
// // // import { UserButton } from "@clerk/nextjs";
// // // import { dark } from "@clerk/themes";
// // // import { CreditCard } from "lucide-react";
// // // import { useTheme } from "next-themes";
// // // import Image from "next/image";
// // // import Link from "next/link";
// // // import { Button } from "@/components/ui/button";
// // // import MobileMenu from "./MobileMenu"; // New client component for mobile menu

// // // export default function Navbar() {
// // //   const { theme } = useTheme();

// // //   return (
// // //     <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800">
// // //       <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
// // //         <Link href="/resumes" className="flex items-center gap-2">
// // //           <Image
// // //             src={logo}
// // //             alt="Logo"
// // //             width={35}
// // //             height={35}
// // //             className="rounded-full"
// // //           />
// // //           <span className="text-xl font-bold tracking-tight">
// // //             AI Resume Builder
// // //           </span>
// // //         </Link>
// // //         <div className="flex items-center gap-3">
// // //           <nav className="hidden md:flex items-center gap-3">
// // //             <Link href="/resumes" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">
// // //               Resume Builder
// // //             </Link>
// // //             <Link href="/cover-letter" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">
// // //               Cover Letter
// // //             </Link>
// // //             <Link href="/audit" className="block px-4 py-2 hover:bg-gray-200 rounded">Audit Resume
// // //             </Link>
// // //             <Link href="/job-tracker" className="block px-4 py-2 hover:bg-gray-200 rounded">
// // //               Job Tracker
// // //             </Link>
// // //           </nav>
// // //           <MobileMenu />
// // //           <ThemeToggle />
// // //           <UserButton
// // //             appearance={{
// // //               baseTheme: theme === "dark" ? dark : undefined,
// // //               elements: {
// // //                 avatarBox: {
// // //                   width: 35,
// // //                   height: 35,
// // //                 },
// // //               },
// // //             }}
// // //           >
// // //             <UserButton.MenuItems>
// // //               <UserButton.Link
// // //                 label="Billing"
// // //                 labelIcon={<CreditCard className="size-4" />}
// // //                 href="/billing"
// // //               />
// // //             </UserButton.MenuItems>
// // //           </UserButton>
// // //         </div>
// // //       </div>
// // //     </header>
// // //   );
// // // }

// // "use client";

// // import logo from "@/assets/logo.png";
// // import ThemeToggle from "@/components/ThemeToggle";
// // import { UserButton } from "@clerk/nextjs";
// // import { dark } from "@clerk/themes";
// // import { CreditCard } from "lucide-react";
// // import { useTheme } from "next-themes";
// // import Image from "next/image";
// // import Link from "next/link";
// // import MobileMenu from "./MobileMenu";
// // import { useUser } from "@clerk/nextjs";

// // export default function Navbar() {
// //   const { theme } = useTheme();
// //   const user = useUser();

// //   return (
// //     <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800">
// //       <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
// //         <Link href="/resumes" className="flex items-center gap-2">
// //           <Image
// //             src={logo}
// //             alt="Logo"
// //             width={35}
// //             height={35}
// //             className="rounded-full"
// //           />
// //           <span className="text-xl font-bold tracking-tight">
// //             AI Resume Builder
// //           </span>
// //         </Link>
// //         <div className="flex items-center gap-3">
// //           <nav className="hidden md:flex items-center gap-4">

// //             <Link
// //   href="/profile/create"
// //   className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2 rounded-md transition-colors"
// // >
// //   Profile Settings
// // </Link>
// // {user?.id && (
// //             <Link
// //               href={`/profile/${user.id}`}
// //               className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2 rounded-md transition-colors"
// //             >
// //               View Profile
// //             </Link>
// // )}

// //           </nav>
// //           <MobileMenu />
// //           <ThemeToggle />
// //           <UserButton
// //             appearance={{
// //               baseTheme: theme === "dark" ? dark : undefined,
// //               elements: {
// //                 avatarBox: {
// //                   width: 35,
// //                   height: 35,
// //                 },
// //               },
// //             }}
// //           >
// //             <UserButton.MenuItems>
// //               <UserButton.Link
// //                 label="Billing"
// //                 labelIcon={<CreditCard className="size-4" />}
// //                 href="/billing"
// //               />
// //             </UserButton.MenuItems>
// //           </UserButton>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }

// // src/components/Navbar.tsx
// "use client";

// import logo from "@/assets/logo.png";
// import ThemeToggle from "@/components/ThemeToggle";
// import { UserButton } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";
// import { CreditCard } from "lucide-react";
// import { useTheme } from "next-themes";
// import Image from "next/image";
// import Link from "next/link";
// import MobileMenu from "./MobileMenu";
// import { useUser } from "@clerk/nextjs";

// export default function Navbar() {
//   const { theme } = useTheme();
//   const { isSignedIn, user } = useUser();

//   return (
//     <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-800">
//       <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
//         <Link href="/resumes" className="flex items-center gap-2">
//           <Image
//             src={logo}
//             alt="Logo"
//             width={35}
//             height={35}
//             className="rounded-full"
//           />
//           <span className="text-xl font-bold tracking-tight">
//             AI Resume Builder
//           </span>
//         </Link>
//         <div className="flex items-center gap-3">
//           <nav className="hidden md:flex items-center gap-4">

//           <Link
//               href="/resumes"
//               className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2 rounded-md transition-colors"
//             >
//               📄 Resume Builder
//             </Link>
//             <Link
//               href="/cover-letter"
//               className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2 rounded-md transition-colors"
//             >
//               ✉️ Cover Letter
//             </Link>
//             <Link
//               href="/audit"
//               className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2 rounded-md transition-colors"
//               title="Get an AI-powered audit with personalized suggestions"
//             >
//               📊 Audit Resume
//             </Link>
//             <Link
//               href="/job-tracker"
//               className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2 rounded-md transition-colors"
//             >
//               📋 Job Tracker
//             </Link>

//             <Link
//               href="/profile/create"
//               className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2 rounded-md transition-colors"
//             >
//               Profile Settings
//             </Link>

//             {isSignedIn && user?.id && (
//               <Link
//                 href={`/profile/${user.id}`}
//                 className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2 rounded-md transition-colors"
//               >
//                 View Profile
//               </Link>
//             )}

// {isSignedIn && user?.id && (
//               <Link
//                 href="/profile/posts/create"
//                 className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm px-3 py-2 rounded-md transition-colors"
//               >
//                 New Post
//               </Link>

//             )}
// {isSignedIn && user?.id && (
// <Link href="/profile/reviews/create" className="…">
//   Ask for Resume Review
// </Link>
// )}

// {isSignedIn && user?.id && (
// <Link href="/resume-lab" className="…">
//   Resume Lab
// </Link>
// )}

//           </nav>

//           <MobileMenu />
//           <ThemeToggle />
//           <UserButton
//             appearance={{
//               baseTheme: theme === "dark" ? dark : undefined,
//               elements: {
//                 avatarBox: { width: 35, height: 35 },
//               },
//             }}
//           >
//             <UserButton.MenuItems>
//               <UserButton.Link
//                 label="Billing"
//                 labelIcon={<CreditCard className="size-4" />}
//                 href="/billing"
//               />
//             </UserButton.MenuItems>
//           </UserButton>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import logo from "@/assets/logo.png";
import ThemeToggle from "@/components/ThemeToggle";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { CreditCard, User, FileText, Edit, MessageSquare } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function Navbar() {
  const { theme } = useTheme();
  const { isSignedIn, user } = useUser();
  const [isProfileHubOpen, setIsProfileHubOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="AI Resume Builder Logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">
            AI Career Suite
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-4 md:flex">
            <Link
              href="/resumes"
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
            >
              📄 Resume Builder
            </Link>
            <Link
              href="/cover-letter"
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
            >
              ✉️ Cover Letter
            </Link>
            <Link
              href="/audit"
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
              title="Get an AI-powered audit with personalized suggestions"
            >
              📊 Audit Resume
            </Link>
            <Link
              href="/job-tracker"
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
            >
              📋 Job Tracker
            </Link>
            {isSignedIn && user?.id && (
              <Link
                href="/resume-lab"
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
              >
                🧪 Resume Lab
              </Link>
            )}
            {isSignedIn && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileHubOpen(!isProfileHubOpen)}
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
                  aria-expanded={isProfileHubOpen}
                  aria-haspopup="true"
                >
                  <User className="h-4 w-4" /> Profile Hub
                </button>
                {isProfileHubOpen && (
                  <div className="absolute left-0 top-full mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    <Link
                      href="/profile/create"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileHubOpen(false)}
                    >
                      <Edit className="h-4 w-4" /> Profile Settings
                    </Link>
                    <Link
                      href={`/profile/${user?.id}`}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileHubOpen(false)}
                    >
                      <User className="h-4 w-4" /> View Profile
                    </Link>
                    <Link
                      href="/profile/posts/create"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileHubOpen(false)}
                    >
                      <MessageSquare className="h-4 w-4" /> New Post
                    </Link>
                    <Link
                      href="/profile/reviews/create"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileHubOpen(false)}
                    >
                      <FileText className="h-4 w-4" /> Resume Review
                    </Link>
                    <Link
                      href="/chat"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileHubOpen(false)}
                    >
                      <FileText className="h-4 w-4" /> AI ChatBot
                    </Link>
                  </div>
                )}
              </div>
            )}
          </nav>
          <MobileMenu />
          <ThemeToggle />
          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: { width: 35, height: 35 },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard className="size-4" />}
                href="/billing"
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
}
