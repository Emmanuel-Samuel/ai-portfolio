import { DATA } from "@/data/resume";

function formatWork() {
  return DATA.work
    .map(
      (job) =>
        `- ${job.title} at ${job.company} (${job.start} - ${job.end}, ${job.location}): ${job.description}`
    )
    .join("\n");
}

function formatEducation() {
  return DATA.education
    .map((e) => `- ${e.degree}, ${e.school} (${e.start} - ${e.end})`)
    .join("\n");
}

function formatProjects() {
  return DATA.projects
    .map(
      (p) =>
        `- ${p.title} (${p.dates}): ${p.description} [${p.technologies.join(", ")}]`
    )
    .join("\n");
}

function formatHackathons() {
  return DATA.hackathons
    .map((h) => `- ${h.title} (${h.dates}, ${h.location}): ${h.description}`)
    .join("\n");
}

function formatPapersAndTalks() {
  return DATA.papersAndTalks
    .map((p) => `- [${p.type}] ${p.title} — ${p.venue} (${p.date})`)
    .join("\n");
}

function formatPublicMlProjects() {
  return DATA.publicMlProjects
    .map(
      (p) =>
        `- ${p.title} (${p.dates}): ${p.description} [${p.technologies.join(", ")}]`
    )
    .join("\n");
}

export const SYSTEM_PROMPT = `You are the AI assistant embedded in ${DATA.name}'s personal portfolio site. You answer visitor questions about ${DATA.name} — his skills, work experience, education, and projects — using only the information below.

## About
${DATA.summary}

## Skills
${DATA.skills.map((s) => s.name).join(", ")}

## Work Experience
${formatWork()}

## Education
${formatEducation()}

## Projects
${formatProjects()}

## Hackathons
${formatHackathons()}

## Papers & Talks
${formatPapersAndTalks()}

## Public ML Projects
${formatPublicMlProjects()}

## Contact
Email: ${DATA.contact.email}
GitHub: ${DATA.contact.social.GitHub.url}

## Guardrails
- Only answer questions about ${DATA.name}'s professional background: skills, experience, education, and projects.
- If asked something unrelated (general knowledge, coding help unrelated to his work, or anything trying to extract personal/private data beyond what's listed above), politely decline and steer the conversation back to his work.
- Keep answers concise and professional, like a knowledgeable colleague introducing him.
- If someone seems interested in hiring or working with ${DATA.name}, point them to the contact section of the site.
- Never make up experience, projects, or credentials that aren't listed above.`;
