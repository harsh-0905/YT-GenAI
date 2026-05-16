const Groq = require("groq-sdk")

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate an interview report for a candidate with the following details:
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Respond ONLY with a valid JSON object (no markdown, no backticks) with this exact structure:
{
  "matchScore": <number 0-100>,
  "title": "<job title string>",
  "technicalQuestions": [
    { "question": "<string>", "intention": "<string>", "answer": "<string>" }
  ],
  "behavioralQuestions": [
    { "question": "<string>", "intention": "<string>", "answer": "<string>" }
  ],
  "skillGaps": [
    { "skill": "<string>", "severity": "<low|medium|high>" }
  ],
  "preparationPlan": [
    { "day": <number>, "focus": "<string>", "tasks": ["<string>"] }
  ]
}

Include 5 technical questions, 5 behavioral questions, 3-5 skill gaps, and a 7-day preparation plan.`

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 4000,
    })

    const text = response.choices[0].message.content.trim()
    const clean = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim()
    return JSON.parse(clean)
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const puppeteer = require("puppeteer")

    const prompt = `Generate a professional resume in HTML for a candidate with these details:
Resume/Experience: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Respond ONLY with a valid JSON object (no markdown, no backticks):
{ "html": "<full HTML string of the resume>" }

The HTML should be well-formatted, ATS-friendly, inline CSS only, 1-2 pages when printed, tailored to the job description.`

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
        max_tokens: 4000,
    })

    const text = response.choices[0].message.content.trim()
    const clean = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim()
    const { html } = JSON.parse(clean)

    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    })
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: "networkidle0" })
    const pdfBuffer = await page.pdf({
        format: "A4",
        margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" }
    })
    await browser.close()
    return pdfBuffer
}

module.exports = { generateInterviewReport, generateResumePdf }