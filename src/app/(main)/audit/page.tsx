// // 'use client';

// // import { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";
// // import { toast } from "sonner";

// // export default function ResumeAuditPage() {
// //   const [file, setFile] = useState<File | null>(null);
// //   const [docType, setDocType] = useState<"resume" | "cover">("resume");
// //   const [jobDesc, setJobDesc] = useState("");
// //   const [result, setResult] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const [jobDescription, setJobDescription] = useState("");

// //   const handleSubmit = async () => {
// //     if (!file) return toast.error("Please upload a file.");
// //     setLoading(true);
// //     setResult("");

// //     const formData = new FormData();
// //     formData.append("file", file);
// //     formData.append("type", docType);
// //     if (jobDesc.trim()) formData.append("jobDescription", jobDesc);

// //     try {
// //       const res = await fetch("/api/audit", {
// //         method: "POST",
// //         body: formData,
// //       });

// //       if (!res.ok) {
// //         const { error } = await res.json();
// //         throw new Error(error || "Audit failed");
// //       }

// //       const data = await res.json();
// //       setResult(data.result);
// //     } catch (err: any) {
// //       toast.error(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
// //       <h1 className="text-3xl font-bold">📊 Resume & Cover Letter Audit</h1>
// //       <p className="text-muted-foreground">Upload your document to receive an AI-generated scorecard and suggestions.</p>

// //       <div className="space-y-3">
// //         <Label>Upload File (PDF or DOCX)</Label>
// //         <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />

// //         <Label>Select Document Type</Label>
// //         <select
// //           value={docType}
// //           onChange={(e) => setDocType(e.target.value as "resume" | "cover")}
// //           className="w-full border border-gray-300 rounded-md px-3 py-2"
// //         >
// //           <option value="resume">Resume</option>
// //           <option value="cover">Cover Letter</option>
// //         </select>

// //         <Label>Optional Job Description</Label>
// //         <Textarea
// //           value={jobDescription}
// //           onChange={(e) => setJobDescription(e.target.value)}
// //           placeholder="Paste the job description here to help tailor the audit"
// //         />

// //         <Button onClick={handleSubmit} disabled={loading} className="mt-4">
// //           {loading ? "Analyzing..." : "Run Audit"}
// //         </Button>
// //       </div>

// //       {result && (
// //         <div className="mt-6 border p-4 rounded-md bg-white shadow-sm whitespace-pre-wrap">
// //           <h3 className="font-bold mb-2">🧠 AI Scorecard:</h3>
// //           <p>{result}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";

// export default function ResumeAuditPage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [docType, setDocType] = useState<"resume" | "cover">("resume");
//   const [jobDescription, setJobDescription] = useState("");
//   const [result, setResult] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) return toast.error("Please upload a file");

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("type", docType);
//     formData.append("jobDescription", jobDescription); // ✅ ADD THIS

//     setIsSubmitting(true);
//     setResult(""); // Clear old result

//     try {
//       const res = await fetch("/api/audit", {
//         method: "POST",
//         body: formData,
//       });

//       let data;
//       try {
//         data = await res.json();
//       } catch {
//         toast.error("Invalid response from server");
//         return;
//       }

//       if (res.status === 403) {
//         toast.error("🚫 Daily limit exceeded. Upgrade to Pro for unlimited audits.");
//         return;
//       }

//       if (!res.ok) {
//         toast.error(data?.error || "Something went wrong");
//         return;
//       }

//       setResult(data.result);
//       toast.success("✅ Audit completed!");
//     } catch (err: any) {
//       console.error("Network error:", err);
//       toast.error("Unexpected network error. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto px-4 py-12">
//       <h1 className="text-3xl font-bold mb-2">📊 Resume & Cover Letter Audit</h1>
//       <p className="text-gray-600 mb-6">
//         Upload your document to receive an AI-generated scorecard and suggestions.
//       </p>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <Label>Upload File (PDF or DOCX)</Label>
//           <input
//             type="file"
//             accept=".pdf,.docx"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="block mt-1"
//           />
//         </div>

//         <div>
//           <Label>Select Document Type</Label>
//           <select
//             value={docType}
//             onChange={(e) => setDocType(e.target.value as "resume" | "cover")}
//             className="block mt-1 p-2 border border-gray-300 rounded"
//           >
//             <option value="resume">Resume</option>
//             <option value="cover">Cover Letter</option>
//           </select>
//         </div>

//         <div>
//           <Label>Optional Job Description</Label>
//           <Textarea
//             placeholder="Paste the job description for better tailoring..."
//             value={jobDescription}
//             onChange={(e) => setJobDescription(e.target.value)}
//             rows={5}
//           />
//         </div>

//         <Button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? "Auditing..." : "Run Audit"}
//         </Button>
//       </form>

//       {result && (
//         <div className="mt-8 bg-white dark:bg-black/10 border border-gray-200 dark:border-gray-800 rounded p-4">
//           <h2 className="text-xl font-semibold mb-2">🧠 AI Scorecard:</h2>
//           <pre className="whitespace-pre-wrap text-sm">{result}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Info } from "lucide-react";

export default function ResumeAuditPage() {
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState<"resume" | "cover">("resume");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Please upload a file", { icon: "❌" });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", docType);
    if (jobDescription.trim())
      formData.append("jobDescription", jobDescription);

    setIsSubmitting(true);
    setResult("");

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        body: formData,
      });

      let data;
      try {
        data = await res.json();
      } catch {
        toast.error("Invalid response from server", { icon: "❌" });
        return;
      }

      if (res.status === 403) {
        toast.error(
          "🚫 Daily limit exceeded. Upgrade to Pro for unlimited audits.",
          { icon: "⚠️" },
        );
        return;
      }

      if (!res.ok) {
        toast.error(data?.error || "Something went wrong", { icon: "❌" });
        return;
      }

      setResult(data.result);
      toast.success("✅ Audit completed successfully!", { icon: "✔️" });
    } catch (err) {
      console.error("Network error:", err);
      toast.error("Unexpected network error. Please try again.", {
        icon: "❌",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-3xl px-4 py-12">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-extrabold text-indigo-900 dark:text-teal-300">
            📊 Resume & Cover Letter Audit
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Elevate your application with an AI-powered audit. Upload your PDF
            or DOCX to receive a detailed scorecard, personalized suggestions,
            and industry benchmarks.
          </p>
          <span
            className="mt-2 inline-flex cursor-pointer items-center text-sm text-teal-600 hover:underline dark:text-teal-400"
            title="Learn how our AI analyzes formatting, keywords, tone, and more to optimize your document for success."
          >
            <Info className="mr-1 h-4 w-4" /> Learn More
          </span>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          <div>
            <Label
              htmlFor="file-upload"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Upload File (PDF or DOCX)
            </Label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-2 w-full rounded-md border border-gray-300 p-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 dark:border-gray-600"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Drag and drop or click to upload.
            </p>
          </div>

          <div>
            <Label
              htmlFor="doc-type"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Select Document Type
            </Label>
            <select
              id="doc-type"
              value={docType}
              onChange={(e) => setDocType(e.target.value as "resume" | "cover")}
              className="mt-2 w-full rounded-md border border-gray-300 p-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 dark:border-gray-600"
            >
              <option value="resume">Resume</option>
              <option value="cover">Cover Letter</option>
            </select>
          </div>

          <div>
            <Label
              htmlFor="job-desc"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Job Description
            </Label>
            <Textarea
              id="job-desc"
              placeholder="Paste the job description for tailored insights..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={5}
              className="mt-2 w-full rounded-md border border-gray-300 p-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 dark:border-gray-600"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Enhance accuracy by adding the job posting text.
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-teal-600 py-2 font-semibold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-gray-400 dark:bg-teal-500 dark:hover:bg-teal-600"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="mr-2 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Auditing...
              </span>
            ) : (
              "Run Audit"
            )}
          </Button>
        </form>

        {/* Result Section */}
        {result && (
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-indigo-900 dark:text-teal-300">
                🧠 AI Scorecard
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(result);
                  toast.success("Copied to clipboard!", { icon: "📋" });
                }}
                className="border-teal-600 text-teal-600 hover:bg-teal-100 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-900"
              >
                Copy
              </Button>
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-gray-50 p-4 text-sm text-gray-800 dark:bg-gray-900 dark:text-gray-200">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
