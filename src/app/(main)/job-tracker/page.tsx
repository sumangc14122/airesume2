// "use client";

// import React from "react";
// import { useEffect, useState } from "react";
// // import { useUser } from "@clerk/nextjs";
// import axios from "axios";
// import StatsSummary from "@/components/StatsSummary";

// export default function JobTracker() {
//   // const { user } = useUser();
//   const [jobs, setJobs] = useState([]);
//   const [editingJob, setEditingJob] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [searchCompany, setSearchCompany] = useState("");
//   const [filterResult, setFilterResult] = useState("");
//   const [sortBy, setSortBy] = useState("appliedDate");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [jobSuggestions, setJobSuggestions] = useState({});
//   const [loadingSuggestions, setLoadingSuggestions] = useState({});
//   const [visibleSuggestions, setVisibleSuggestions] = useState({});
//   const [aiSuggestions, setAiSuggestions] = useState("");
//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiError, setAiError] = useState(null);
//   const [showAiPanel, setShowAiPanel] = useState(false);

//   const [form, setForm] = useState({
//     companyName: "",
//     jobTitle: "",
//     applyLink: "",
//     resumeUrl: "",
//     coverLetterUrl: "",
//     submitted: false,
//     followUp: false,
//     finalResult: "",
//     mistakeNotes: "",
//     resultDate: "",
//     appliedDate: "",
//     reminderDate: "",
//   });

//   // const handleResumeUpload = async (e) => {
//   //   const file = e.target.files?.[0];
//   //   if (!file) return;
//   //   const formData = new FormData();
//   //   formData.append("file", file);
//   //   const res = await fetch("/api/job-applications/upload", {
//   //     method: "POST",
//   //     body: formData,
//   //   });
//   //   const data = await res.json();
//   //   setForm((prev) => ({ ...prev, resumeUrl: data.url }));
//   // };

//   // const handleCoverUpload = async (e) => {
//   //   const file = e.target.files?.[0];
//   //   if (!file) return;
//   //   const formData = new FormData();
//   //   formData.append("file", file);
//   //   const res = await fetch("/api/job-applications/upload", {
//   //     method: "POST",
//   //     body: formData,
//   //   });
//   //   const data = await res.json();
//   //   setForm((prev) => ({ ...prev, coverLetterUrl: data.url }));
//   // };

//   const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("file", file);
//     const res = await fetch("/api/job-applications/upload", {
//       method: "POST",
//       body: formData,
//     });
//     const data = await res.json();
//     setForm((prev) => ({ ...prev, resumeUrl: data.url }));
//   };

//   const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("file", file);
//     const res = await fetch("/api/job-applications/upload", {
//       method: "POST",
//       body: formData,
//     });
//     const data = await res.json();
//     setForm((prev) => ({ ...prev, coverLetterUrl: data.url }));
//   };

//   const fetchJobs = async () => {
//     const res = await axios.get("/api/job-applications/get-all");
//     setJobs(res.data);
//   };

//   const openEditModal = (job) => {
//     setEditingJob(job);
//     setShowEditModal(true);
//   };

//   const submitEdit = async () => {
//     await axios.put("/api/job-applications/update", editingJob);
//     setShowEditModal(false);
//     fetchJobs();
//   };

//   const getAiSuggestions = async () => {
//     setAiLoading(true);
//     setAiError(null);
//     try {
//       const prompt = `Provide helpful suggestions based on this job application:\nCompany: ${form.companyName}\nTitle: ${form.jobTitle}\nSubmitted: ${form.submitted}\nFollow Up: ${form.followUp}\nFinal Result: ${form.finalResult}\nNotes: ${form.mistakeNotes}\nGive advice like resume tips, follow-up strategies, interview prep.`;
//       const res = await fetch("/api/ai-suggestions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await res.json();
//       setAiSuggestions(data?.text || "No suggestions returned.");
//     } catch {
//       console.error("AI Error:", err);
//       setAiError("Failed to fetch suggestions. Try again.");
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   const fetchSuggestionsForJob = async (job) => {
//     try {
//       setLoadingSuggestions((prev) => ({ ...prev, [job.id]: true }));
//       const prompt = `
//         You are an AI assistant helping a job applicant improve their job application.
//         Company: ${job.companyName}
//         Title: ${job.jobTitle}
//         Submitted: ${job.submitted ? "Yes" : "No"}
//         Final Result: ${job.finalResult || "N/A"}
//         Notes: ${job.mistakeNotes || "None"}
//         Give short, helpful tips. Focus on resume, follow-up, or interview advice.
//       `;
//       const res = await fetch("/api/openai/suggestions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt, max_tokens: 350 }),
//       });
//       const data = await res.json();
//       setJobSuggestions((prev) => ({ ...prev, [job.id]: data.suggestions }));
//       setVisibleSuggestions((prev) => ({ ...prev, [job.id]: true }));
//     } catch {
//       setJobSuggestions((prev) => ({
//         ...prev,
//         [job.id]: "❌ Failed to get tips. Try again.",
//       }));
//     } finally {
//       setLoadingSuggestions((prev) => ({ ...prev, [job.id]: false }));
//     }
//   };

//   const exportToCSV = () => {
//     if (!jobs || jobs.length === 0) return;
//     const headers = [
//       "Company",
//       "Title",
//       "Submitted",
//       "Follow Up",
//       "Final Result",
//       "Applied Date",
//       "Result Date",
//       "Reminder Date",
//       "Apply Link",
//       "Resume URL",
//       "Cover Letter URL",
//       "Notes",
//     ];
//     const rows = jobs.map((job) => [
//       job.companyName,
//       job.jobTitle,
//       job.submitted ? "Yes" : "No",
//       job.followUp ? "Yes" : "No",
//       job.finalResult,
//       job.appliedDate ? new Date(job.appliedDate).toLocaleDateString() : "",
//       job.resultDate ? new Date(job.resultDate).toLocaleDateString() : "",
//       job.reminderDate ? new Date(job.reminderDate).toLocaleDateString() : "",
//       job.applyLink,
//       job.resumeUrl,
//       job.coverLetterUrl,
//       job.mistakeNotes,
//     ]);
//     const csvContent = [headers, ...rows]
//       .map((e) =>
//         e
//           .map((item) => `"${(item || "").toString().replace(/"/g, '""')}"`)
//           .join(","),
//       )
//       .join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", "job_applications.csv");
//     link.click();
//   };

//   const submitJob = async () => {
//     await axios.post("/api/job-applications/create", form);
//     setForm({
//       companyName: "",
//       jobTitle: "",
//       applyLink: "",
//       resumeUrl: "",
//       coverLetterUrl: "",
//       submitted: false,
//       followUp: false,
//       finalResult: "",
//       mistakeNotes: "",
//       resultDate: "",
//       appliedDate: "",
//       reminderDate: "",
//     });
//     fetchJobs();
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const getFilteredJobs = () => {
//     let filtered = [...jobs];
//     if (searchCompany) {
//       filtered = filtered.filter((job) =>
//         job.companyName.toLowerCase().includes(searchCompany.toLowerCase()),
//       );
//     }
//     if (filterResult) {
//       filtered = filtered.filter((job) => job.finalResult === filterResult);
//     }
//     filtered.sort((a, b) => {
//       const aVal = a[sortBy];
//       const bVal = b[sortBy];
//       if (!aVal || !bVal) return 0;
//       if (sortBy === "appliedDate") {
//         return sortOrder === "asc"
//           ? new Date(aVal) - new Date(bVal)
//           : new Date(bVal) - new Date(aVal);
//       }
//       return sortOrder === "asc"
//         ? String(aVal).localeCompare(String(bVal))
//         : String(bVal).localeCompare(String(aVal));
//     });
//     return filtered;
//   };

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import StatsSummary from "@/components/StatsSummary";

interface Job {
  id: string;
  companyName: string;
  jobTitle: string;
  applyLink: string;
  resumeUrl: string;
  coverLetterUrl: string;
  submitted: boolean;
  followUp: boolean;
  finalResult: string;
  mistakeNotes: string;
  resultDate: string;
  appliedDate: string;
  reminderDate: string;
}

export default function JobTracker() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchCompany, setSearchCompany] = useState("");
  const [filterResult, setFilterResult] = useState("");
  const [sortBy, setSortBy] = useState("appliedDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [jobSuggestions, setJobSuggestions] = useState<Record<string, string>>(
    {},
  );
  const [loadingSuggestions, setLoadingSuggestions] = useState<
    Record<string, boolean>
  >({});
  const [visibleSuggestions, setVisibleSuggestions] = useState<
    Record<string, boolean>
  >({});
  const [aiSuggestions, setAiSuggestions] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [showAiPanel, setShowAiPanel] = useState(false);

  const [form, setForm] = useState<Omit<Job, "id">>({
    companyName: "",
    jobTitle: "",
    applyLink: "",
    resumeUrl: "",
    coverLetterUrl: "",
    submitted: false,
    followUp: false,
    finalResult: "",
    mistakeNotes: "",
    resultDate: "",
    appliedDate: "",
    reminderDate: "",
  });

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/job-applications/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setForm((prev) => ({ ...prev, resumeUrl: data.url }));
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/job-applications/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setForm((prev) => ({ ...prev, coverLetterUrl: data.url }));
  };

  const fetchJobs = async () => {
    const res = await axios.get("/api/job-applications/get-all");
    setJobs(res.data);
  };

  const openEditModal = (job: Job) => {
    setEditingJob(job);
    setShowEditModal(true);
  };

  const submitEdit = async () => {
    if (!editingJob) return;
    await axios.put("/api/job-applications/update", editingJob);
    setShowEditModal(false);
    fetchJobs();
  };

  const submitJob = async () => {
    await axios.post("/api/job-applications/create", form);
    setForm({
      companyName: "",
      jobTitle: "",
      applyLink: "",
      resumeUrl: "",
      coverLetterUrl: "",
      submitted: false,
      followUp: false,
      finalResult: "",
      mistakeNotes: "",
      resultDate: "",
      appliedDate: "",
      reminderDate: "",
    });
    fetchJobs();
  };

  const getAiSuggestions = async () => {
    setAiLoading(true);
    setAiError(null);
    try {
      const prompt = `Provide helpful suggestions based on this job application:\nCompany: ${form.companyName}\nTitle: ${form.jobTitle}\nSubmitted: ${form.submitted}\nFollow Up: ${form.followUp}\nFinal Result: ${form.finalResult}\nNotes: ${form.mistakeNotes}`;
      const res = await fetch("/api/ai-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setAiSuggestions(data?.text || "No suggestions returned.");
    } catch (err) {
      console.error("AI Error:", err);
      setAiError("Failed to fetch suggestions. Try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const fetchSuggestionsForJob = async (job: Job) => {
    try {
      setLoadingSuggestions((prev) => ({ ...prev, [job.id]: true }));
      const prompt = `Company: ${job.companyName}\nTitle: ${job.jobTitle}\nSubmitted: ${job.submitted ? "Yes" : "No"}\nFinal Result: ${job.finalResult || "N/A"}\nNotes: ${job.mistakeNotes || "None"}`;
      const res = await fetch("/api/openai/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, max_tokens: 350 }),
      });
      const data = await res.json();
      setJobSuggestions((prev) => ({ ...prev, [job.id]: data.suggestions }));
      setVisibleSuggestions((prev) => ({ ...prev, [job.id]: true }));
    } catch {
      setJobSuggestions((prev) => ({
        ...prev,
        [job.id]: "❌ Failed to get tips. Try again.",
      }));
    } finally {
      setLoadingSuggestions((prev) => ({ ...prev, [job.id]: false }));
    }
  };

  const exportToCSV = () => {
    if (!jobs || jobs.length === 0) return;
    const headers = [
      "Company",
      "Title",
      "Submitted",
      "Follow Up",
      "Final Result",
      "Applied Date",
      "Result Date",
      "Reminder Date",
      "Apply Link",
      "Resume URL",
      "Cover Letter URL",
      "Notes",
    ];
    const rows = jobs.map((job) => [
      job.companyName,
      job.jobTitle,
      job.submitted ? "Yes" : "No",
      job.followUp ? "Yes" : "No",
      job.finalResult,
      job.appliedDate ? new Date(job.appliedDate).toLocaleDateString() : "",
      job.resultDate ? new Date(job.resultDate).toLocaleDateString() : "",
      job.reminderDate ? new Date(job.reminderDate).toLocaleDateString() : "",
      job.applyLink,
      job.resumeUrl,
      job.coverLetterUrl,
      job.mistakeNotes,
    ]);
    const csvContent = [headers, ...rows]
      .map((e) =>
        e
          .map((item) => `"${(item || "").toString().replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "job_applications.csv");
    link.click();
  };

  const getFilteredJobs = () => {
    let filtered = [...jobs];
    if (searchCompany) {
      filtered = filtered.filter((job) =>
        job.companyName.toLowerCase().includes(searchCompany.toLowerCase()),
      );
    }
    if (filterResult) {
      filtered = filtered.filter((job) => job.finalResult === filterResult);
    }
    filtered.sort((a, b) => {
      const aVal = a[sortBy as keyof Job];
      const bVal = b[sortBy as keyof Job];
      if (!aVal || !bVal) return 0;
      // if (sortBy === "appliedDate") {
      //   return sortOrder === "asc"
      //     ? new Date(aVal).getTime() - new Date(bVal).getTime()
      //     : new Date(bVal).getTime() - new Date(aVal).getTime();
      // }

      if (
        sortBy === "appliedDate" &&
        typeof aVal === "string" &&
        typeof bVal === "string"
      ) {
        return sortOrder === "asc"
          ? new Date(aVal).getTime() - new Date(bVal).getTime()
          : new Date(bVal).getTime() - new Date(aVal).getTime();
      }
      return sortOrder === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
    return filtered;
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="mx-auto min-h-screen max-w-7xl bg-gradient-to-br from-gray-50 to-gray-100 p-10 font-sans text-gray-900">
      {/* Header Section */}
      <div className="mb-6 flex items-center gap-4">
        <svg
          className="h-10 w-10 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
        <h1 className="text-4xl font-bold text-gray-800">Job Tracker</h1>
      </div>
      <p className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-600">
        Seamlessly organise and track your job applications, including resumes,
        cover letters, and statuses, all in one intuitive dashboard.
      </p>

      {/* Form Section */}
      <div className="mb-12 rounded-3xl border border-gray-100 bg-white p-10 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Add New Application
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="relative">
            <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h-2m-6 0H3m6-6h6"
                ></path>
              </svg>
              Company Name
            </label>
            <input
              placeholder="Enter company name"
              value={form.companyName}
              onChange={(e) =>
                setForm({ ...form, companyName: e.target.value })
              }
              className="w-full rounded-xl border border-gray-200 p-4 transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              aria-label="Company Name"
            />
          </div>
          <div className="relative">
            <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
              Job Title
            </label>
            <input
              placeholder="Enter job title"
              value={form.jobTitle}
              onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
              className="w-full rounded-xl border border-gray-200 p-4 transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              aria-label="Job Title"
            />
          </div>
          <div className="relative">
            <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                ></path>
              </svg>
              Apply Link (URL)
            </label>
            <input
              placeholder="Enter application URL"
              value={form.applyLink}
              onChange={(e) => setForm({ ...form, applyLink: e.target.value })}
              className="w-full rounded-xl border border-gray-200 p-4 transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              aria-label="Apply Link"
            />
          </div>
          <div className="relative">
            <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              Applied Date
            </label>
            <input
              type="date"
              value={form.appliedDate || ""}
              onChange={(e) =>
                setForm({ ...form, appliedDate: e.target.value })
              }
              className="w-full rounded-xl border border-gray-200 p-4 transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              aria-label="Applied Date"
            />
          </div>
          <div className="relative">
            <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              Result Date
            </label>
            <input
              type="date"
              value={form.resultDate || ""}
              onChange={(e) => setForm({ ...form, resultDate: e.target.value })}
              className="w-full rounded-xl border border-gray-200 p-4 transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              aria-label="Result Date"
            />
          </div>
          <div className="relative">
            <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Reminder Date
            </label>
            <input
              type="date"
              value={form.reminderDate || ""}
              onChange={(e) =>
                setForm({ ...form, reminderDate: e.target.value })
              }
              className="w-full rounded-xl border border-gray-200 p-4 transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              aria-label="Reminder Date"
            />
          </div>
          <div className="relative">
            <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Final Result
            </label>
            <select
              value={form.finalResult}
              onChange={(e) =>
                setForm({ ...form, finalResult: e.target.value })
              }
              className="w-full rounded-xl border border-gray-200 p-4 transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              aria-label="Final Result"
            >
              <option value="">Select Result</option>
              <option value="Pending">Pending</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
          <div className="relative">
            <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
              Mistakes/Notes
            </label>
            <input
              placeholder="Add any notes or mistakes"
              value={form.mistakeNotes}
              onChange={(e) =>
                setForm({ ...form, mistakeNotes: e.target.value })
              }
              className="w-full rounded-xl border border-gray-200 p-4 transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              aria-label="Mistakes or Notes"
            />
          </div>
          <div className="relative">
            <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              Resume (PDF/DOC)
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-indigo-700 transition-all duration-200 hover:bg-indigo-100">
                Choose File
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                  aria-label="Upload Resume"
                />
              </label>
              <span className="text-sm text-gray-600">
                {form.resumeUrl ? "File uploaded" : "No file chosen"}
              </span>
            </div>
            {form.resumeUrl && (
              <a
                href={form.resumeUrl}
                target="_blank"
                className="mt-3 inline-block text-sm text-indigo-600 underline hover:text-indigo-800"
              >
                View Resume
              </a>
            )}
          </div>
          <div className="relative">
            <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              Cover Letter (PDF/DOC)
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-indigo-700 transition-all duration-200 hover:bg-indigo-100">
                Choose File
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleCoverUpload}
                  className="hidden"
                  aria-label="Upload Cover Letter"
                />
              </label>
              <span className="text-sm text-gray-600">
                {form.coverLetterUrl ? "File uploaded" : "No file chosen"}
              </span>
            </div>
            {form.coverLetterUrl && (
              <a
                href={form.coverLetterUrl}
                target="_blank"
                className="mt-3 inline-block text-sm text-indigo-600 underline hover:text-indigo-800"
              >
                View Cover Letter
              </a>
            )}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-8">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={form.submitted}
              onChange={(e) =>
                setForm({ ...form, submitted: e.target.checked })
              }
              className="h-6 w-6 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              aria-label="Submitted Status"
            />
            <span className="text-sm font-medium text-gray-700">Submitted</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={form.followUp}
              onChange={(e) => setForm({ ...form, followUp: e.target.checked })}
              className="h-6 w-6 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              aria-label="Follow Up Status"
            />
            <span className="text-sm font-medium text-gray-700">Follow Up</span>
          </label>
        </div>

        <button
          onClick={submitJob}
          className="mt-10 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:from-indigo-700 hover:to-indigo-800 hover:shadow-xl"
          aria-label="Add Job Application"
        >
          Add Job
        </button>
      </div>

      {/* AI Suggestions Panel */}
      <div className="mb-12">
        <button
          onClick={() => {
            setShowAiPanel((prev) => !prev);
            if (!aiSuggestions && !aiLoading) getAiSuggestions();
          }}
          className="mb-4 flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-3 text-white shadow-md transition-all duration-200 hover:from-purple-700 hover:to-purple-800 hover:shadow-lg"
          aria-label={
            showAiPanel ? "Hide AI Suggestions" : "Show AI Suggestions"
          }
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            ></path>
          </svg>
          {showAiPanel ? "Hide AI Suggestions" : "Show AI Suggestions"}
        </button>

        {showAiPanel && (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-700 shadow-md transition-all duration-200">
            {aiLoading && (
              <p className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 12a8 8 0 018-8"
                  ></path>
                </svg>{" "}
                Generating suggestions...
              </p>
            )}
            {aiError && <p className="text-red-600">{aiError}</p>}
            {!aiLoading && !aiError && (
              <pre className="whitespace-pre-wrap">{aiSuggestions}</pre>
            )}
          </div>
        )}
      </div>

      {/* Job List */}
      <div>
        {/* Reminder Panel */}
        {getFilteredJobs().some(
          (j) =>
            j.reminderDate &&
            new Date(j.reminderDate) <
              new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        ) && (
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-800 shadow-md">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <svg
                className="h-6 w-6 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
              Upcoming Follow-Up Reminders
            </h3>
            <ul className="list-disc space-y-2 pl-6">
              {getFilteredJobs()
                .filter(
                  (j) =>
                    j.reminderDate &&
                    new Date(j.reminderDate) <
                      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                )
                .map((j) => (
                  <li key={j.id}>
                    Follow up with <strong>{j.companyName}</strong> by{" "}
                    {new Date(j.reminderDate).toLocaleDateString()}
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl bg-white p-6 shadow-md">
          <div className="relative min-w-[200px] flex-1">
            <input
              type="text"
              placeholder="Search company..."
              value={searchCompany}
              onChange={(e) => setSearchCompany(e.target.value)}
              className="w-full rounded-xl border border-gray-200 p-4 pl-10 transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              aria-label="Search Company"
            />
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <select
            value={filterResult}
            onChange={(e) => setFilterResult(e.target.value)}
            className="min-w-[150px] rounded-xl border border-gray-200 p-4 transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            aria-label="Filter by Result"
          >
            <option value="">All Results</option>
            <option value="Pending">Pending</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
            <option value="On Hold">On Hold</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="min-w-[150px] rounded-xl border border-gray-200 p-4 transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            aria-label="Sort By"
          >
            <option value="appliedDate">Sort by Date</option>
            <option value="finalResult">Sort by Result</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="min-w-[120px] rounded-xl border border-gray-200 p-4 transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            aria-label="Sort Order"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white shadow-md transition-all duration-200 hover:from-green-700 hover:to-green-800 hover:shadow-lg"
            aria-label="Export to CSV"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
            Export as CSV
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-3xl border border-gray-100 bg-white shadow-md">
          <table className="min-w-full table-auto text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-left font-medium text-gray-600">
              <tr>
                <th className="p-5">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h-2m-6 0H3m6-6h6"
                      ></path>
                    </svg>
                    Company
                  </div>
                </th>
                <th className="p-5">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      ></path>
                    </svg>
                    Title
                  </div>
                </th>
                <th className="p-5">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Submitted
                  </div>
                </th>
                <th className="p-5">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Follow Up
                  </div>
                </th>
                <th className="p-5">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Result
                  </div>
                </th>
                <th className="p-5">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Applied
                  </div>
                </th>
                <th className="p-5">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      ></path>
                    </svg>
                    Apply Link
                  </div>
                </th>
                <th className="p-5">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Reminder
                  </div>
                </th>
                <th className="p-5">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.532 1.532 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      ></path>
                    </svg>
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {getFilteredJobs().map((job) => (
                <React.Fragment key={job.id}>
                  <tr className="border-t border-gray-100 transition-all duration-200 hover:bg-gray-50">
                    <td className="p-5">{job.companyName}</td>
                    <td className="p-5">{job.jobTitle}</td>
                    <td className="p-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          job.submitted
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {job.submitted ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="p-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          job.followUp
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {job.followUp ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="p-5">{job.finalResult}</td>
                    <td className="p-5">
                      {job.appliedDate
                        ? new Date(job.appliedDate).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="p-5">
                      {job.applyLink ? (
                        <a
                          href={job.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-indigo-600 underline hover:text-indigo-800"
                        >
                          Apply
                        </a>
                      ) : (
                        <span className="text-sm italic text-gray-400">
                          No link
                        </span>
                      )}
                    </td>
                    <td className="p-5">
                      {job.reminderDate
                        ? new Date(job.reminderDate).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="flex flex-col gap-2 p-5">
                      <button
                        onClick={() => openEditModal(job)}
                        className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800"
                        title="Edit Application"
                        aria-label="Edit Application"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          ></path>
                        </svg>
                        Edit
                      </button>
                      {visibleSuggestions[job.id] ? (
                        <button
                          onClick={() =>
                            setVisibleSuggestions((prev) => ({
                              ...prev,
                              [job.id]: false,
                            }))
                          }
                          className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-800"
                          title="Close AI Tips"
                          aria-label="Close AI Tips"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                          Close AI Tips
                        </button>
                      ) : (
                        <button
                          onClick={() => fetchSuggestionsForJob(job)}
                          className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800"
                          title="Get AI Tips"
                          aria-label="Get AI Tips"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            ></path>
                          </svg>
                          Get AI Tips
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this application?",
                            )
                          ) {
                            axios
                              .delete("/api/job-applications/delete", {
                                data: { id: job.id },
                              })
                              .then(fetchJobs);
                          }
                        }}
                        className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                        title="Delete Application"
                        aria-label="Delete Application"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M4 7h16"
                          ></path>
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                  {visibleSuggestions[job.id] && (
                    <tr className="bg-gray-50">
                      <td
                        colSpan={9}
                        className="whitespace-pre-wrap p-6 text-sm text-gray-700"
                      >
                        {loadingSuggestions[job.id] ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="h-5 w-5 animate-spin"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 12a8 8 0 018-8"
                              ></path>
                            </svg>
                            Loading...
                          </span>
                        ) : (
                          jobSuggestions[job.id]
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
          <div className="relative w-full max-w-2xl scale-100 transform rounded-3xl bg-white p-8 shadow-2xl transition-all duration-300">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-gray-800">
              <svg
                className="h-6 w-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
              Edit Job Application
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h-2m-6 0H3m6-6h6"
                    ></path>
                  </svg>
                  Company Name
                </label>
                <input
                  className="w-full rounded-xl border border-gray-200 p-4 focus:ring-2 focus:ring-indigo-500"
                  value={editingJob.companyName}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      companyName: e.target.value,
                    })
                  }
                  aria-label="Company Name"
                />
              </div>
              <div>
                <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    ></path>
                  </svg>
                  Job Title
                </label>
                <input
                  className="w-full rounded-xl border border-gray-200 p-4 focus:ring-2 focus:ring-indigo-500"
                  value={editingJob.jobTitle}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, jobTitle: e.target.value })
                  }
                  aria-label="Job Title"
                />
              </div>
              <div>
                <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    ></path>
                  </svg>
                  Apply Link
                </label>
                <input
                  className="w-full rounded-xl border border-gray-200 p-4 focus:ring-2 focus:ring-indigo-500"
                  value={editingJob.applyLink || ""}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, applyLink: e.target.value })
                  }
                  aria-label="Apply Link"
                />
              </div>
              <div>
                <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Applied Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-xl border border-gray-200 p-4 focus:ring-2 focus:ring-indigo-500"
                  value={editingJob.appliedDate?.substring(0, 10) || ""}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      appliedDate: e.target.value,
                    })
                  }
                  aria-label="Applied Date"
                />
              </div>
              <div>
                <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Result Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-xl border border-gray-200 p-4 focus:ring-2 focus:ring-indigo-500"
                  value={editingJob.resultDate?.substring(0, 10) || ""}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, resultDate: e.target.value })
                  }
                  aria-label="Result Date"
                />
              </div>
              <div>
                <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Reminder Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-xl border border-gray-200 p-4 focus:ring-2 focus:ring-indigo-500"
                  value={editingJob.reminderDate?.substring(0, 10) || ""}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      reminderDate: e.target.value,
                    })
                  }
                  aria-label="Reminder Date"
                />
              </div>
              <div>
                <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  Resume URL
                </label>
                <input
                  className="w-full rounded-xl border border-gray-200 p-4 focus:ring-2 focus:ring-indigo-500"
                  value={editingJob.resumeUrl || ""}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, resumeUrl: e.target.value })
                  }
                  aria-label="Resume URL"
                />
              </div>
              <div>
                <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  Cover Letter URL
                </label>
                <input
                  className="w-full rounded-xl border border-gray-200 p-4 focus:ring-2 focus:ring-indigo-500"
                  value={editingJob.coverLetterUrl || ""}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      coverLetterUrl: e.target.value,
                    })
                  }
                  aria-label="Cover Letter URL"
                />
              </div>
              <div>
                <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Final Result
                </label>
                <select
                  className="w-full rounded-xl border border-gray-200 p-4 focus:ring-2 focus:ring-indigo-500"
                  value={editingJob.finalResult || ""}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      finalResult: e.target.value,
                    })
                  }
                  aria-label="Final Result"
                >
                  <option value="">Select Result</option>
                  <option value="Pending">Pending</option>
                  <option value="Interview">Interview</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Offer">Offer</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block flex items-center gap-2 text-sm font-medium text-gray-700">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                  Notes
                </label>
                <input
                  className="w-full rounded-xl border border-gray-200 p-4 focus:ring-2 focus:ring-indigo-500"
                  value={editingJob.mistakeNotes || ""}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      mistakeNotes: e.target.value,
                    })
                  }
                  aria-label="Notes"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={editingJob.submitted}
                  onChange={(e) =>
                    setEditingJob({
                      ...editingJob,
                      submitted: e.target.checked,
                    })
                  }
                  className="h-6 w-6 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  aria-label="Submitted Status"
                />
                <label className="text-sm font-medium text-gray-700">
                  Submitted
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={editingJob.followUp}
                  onChange={(e) =>
                    setEditingJob({ ...editingJob, followUp: e.target.checked })
                  }
                  className="h-6 w-6 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  aria-label="Follow Up Status"
                />
                <label className="text-sm font-medium text-gray-700">
                  Follow Up
                </label>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setShowEditModal(false)}
                className="rounded-xl px-4 py-2 text-gray-600 transition-all duration-200 hover:text-gray-800"
                aria-label="Cancel Edit"
              >
                Cancel
              </button>
              <button
                onClick={submitEdit}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-3 text-white shadow-md transition-all duration-200 hover:from-indigo-700 hover:to-indigo-800 hover:shadow-lg"
                aria-label="Save Changes"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Component */}
      <div className="mt-12">
        <StatsSummary jobs={jobs} />
      </div>
    </div>
  );
}
