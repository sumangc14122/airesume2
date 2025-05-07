"use client";

import React, { useState } from "react";
import { coverLetterTemplates } from "@/templates/coverLetterTemplates"; // Path to templates file
import * as FileSaver from "file-saver";
import * as docx from "docx";

export default function CoverLetterPage() {
  const [details, setDetails] = useState({
    name: "",
    role: "",
    company: "",
    achievements: "",
    positionDescription: "",
    requiredSkills: "",
  });
  const [templateId, setTemplateId] = useState(coverLetterTemplates[0].id);
  const [letter, setLetter] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/generateCoverLetter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        templateId,
        details,
        positionDescription: details.positionDescription,
        requiredSkills: details.requiredSkills,
      }),
    });
    const data = await res.json();
    setLetter(data.letter);
    setLoading(false);
  };

  const downloadWord = () => {
    // Ensure we are using the generated content from the OpenAI response
    const letterContent = letter || "No letter generated yet";

    // Split the letter content by newlines to preserve the paragraphs
    const paragraphs = letterContent.split("\n").map(
      (line) =>
        new docx.Paragraph({
          children: [
            new docx.TextRun({
              text: line,
              font: "Arial",
              size: 22,
            }),
          ],
          alignment: docx.AlignmentType.LEFT, // Left-aligned text
        }),
    );

    // Create the Word document with formatted content
    const doc = new docx.Document({
      sections: [
        {
          properties: {},
          children: [
            // Title or header for the document (Optional)
            new docx.Paragraph({
              children: [
                new docx.TextRun({
                  text: "Cover Letter",
                  font: "Arial",
                  size: 24,
                  bold: true,
                }),
              ],
              alignment: docx.AlignmentType.CENTER,
            }),

            // Space after the title
            new docx.Paragraph({
              text: "",
              spacing: { after: 200 },
            }),

            // Insert the generated cover letter content
            ...paragraphs, // Insert all paragraphs here

            // Optional closing (signature)
            // new docx.Paragraph({
            //   children: [
            //     new docx.TextRun({
            //       text: 'Sincerely,\n\n' + (details.name || '[Your Name]'),
            //       font: 'Arial',
            //       size: 22,
            //       bold: true,
            //     }),
            //   ],
            //   alignment: docx.AlignmentType.LEFT,
            //   spacing: { after: 200 },
            // }),
          ],
        },
      ],
    });

    // Generate the Word document and download it
    docx.Packer.toBlob(doc).then((blob) => {
      FileSaver.saveAs(blob, "Cover_Letter.docx");
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Cover Letter Generator</h1>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Your Name</label>
          <input
            type="text"
            className="mt-1 w-full rounded border p-2"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block font-medium">Role Title</label>
          <input
            type="text"
            className="mt-1 w-full rounded border p-2"
            value={details.role}
            onChange={(e) => setDetails({ ...details, role: e.target.value })}
          />
        </div>
        <div>
          <label className="block font-medium">Company Name</label>
          <input
            type="text"
            className="mt-1 w-full rounded border p-2"
            value={details.company}
            onChange={(e) =>
              setDetails({ ...details, company: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block font-medium">
            Key Achievements (optional)
          </label>
          <textarea
            className="mt-1 w-full rounded border p-2"
            rows={3}
            value={details.achievements}
            onChange={(e) =>
              setDetails({ ...details, achievements: e.target.value })
            }
          />
        </div>

        {/* New Input Fields for Position Description and Required Skills */}
        <div>
          <label className="block font-medium">Position Description</label>
          <textarea
            className="mt-1 w-full rounded border p-2"
            rows={3}
            value={details.positionDescription}
            onChange={(e) =>
              setDetails({ ...details, positionDescription: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block font-medium">Skills Required</label>
          <textarea
            className="mt-1 w-full rounded border p-2"
            rows={3}
            value={details.requiredSkills}
            onChange={(e) =>
              setDetails({ ...details, requiredSkills: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block font-medium">Template</label>
          <select
            className="mt-1 w-full rounded border p-2"
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
          >
            {coverLetterTemplates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="rounded bg-blue-600 px-4 py-2 text-white"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Cover Letter"}
        </button>

        {letter && (
          <div className="mt-6">
            <h2 className="mb-2 text-xl font-semibold">Your Cover Letter</h2>
            <div className="prose whitespace-pre-wrap rounded border bg-gray-900 p-4 text-white">
              {letter}
            </div>
            {/* Button to download the letter */}
            <button
              className="mt-4 rounded bg-green-600 px-4 py-2 text-white"
              onClick={downloadWord}
            >
              Download as Word
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
