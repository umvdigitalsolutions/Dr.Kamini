import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const teal = rgb(0.047, 0.463, 0.431);
const deepTeal = rgb(0.035, 0.235, 0.235);
const pink = rgb(0.925, 0.282, 0.478);
const palePink = rgb(1, 0.945, 0.965);
const slate = rgb(0.2, 0.255, 0.333);
const muted = rgb(0.39, 0.45, 0.53);
const white = rgb(1, 1, 1);

function pdfSafe(value = "") {
  return String(value)
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^\x20-\x7E\n]/g, "?");
}

function wrapText(text, font, size, maxWidth) {
  const lines = [];
  for (const paragraph of pdfSafe(text).split("\n")) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    if (!words.length) {
      lines.push("");
      continue;
    }
    let line = "";
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        line = candidate;
      } else {
        if (line) lines.push(line);
        line = word;
      }
    }
    if (line) lines.push(line);
  }
  return lines;
}

export async function createPainReportPdf({ patient, assessment, anatomyImages }) {
  const document = await PDFDocument.create();
  const regular = await document.embedFont(StandardFonts.Helvetica);
  const bold = await document.embedFont(StandardFonts.HelveticaBold);
  const pageSize = [595.28, 841.89];
  const margin = 42;
  let page;
  let y;

  const addPage = () => {
    page = document.addPage(pageSize);
    const { width, height } = page.getSize();
    page.drawRectangle({ x: 0, y: height - 96, width, height: 96, color: deepTeal });
    page.drawRectangle({ x: 0, y: height - 101, width, height: 5, color: pink });
    page.drawText("DR. KAMINI SHAKYA", { x: margin, y: height - 47, size: 18, font: bold, color: white });
    page.drawText("Physiotherapy Clinic | Patient Pain Assessment", { x: margin, y: height - 70, size: 10, font: regular, color: rgb(0.78, 0.95, 0.93) });
    y = height - 130;
  };

  const ensureSpace = (height) => {
    if (y - height < 52) addPage();
  };

  const drawLabelValue = (label, value, x, width) => {
    page.drawText(pdfSafe(label).toUpperCase(), { x, y, size: 8, font: bold, color: teal });
    const lines = wrapText(value || "Not provided", regular, 10.5, width);
    lines.slice(0, 2).forEach((line, index) => {
      page.drawText(line, { x, y: y - 16 - (index * 13), size: 10.5, font: regular, color: slate });
    });
  };

  addPage();
  page.drawText("PATIENT DETAILS", { x: margin, y, size: 11, font: bold, color: pink });
  y -= 18;
  page.drawRectangle({ x: margin, y: y - 58, width: 511, height: 67, color: rgb(0.96, 0.98, 0.98) });
  y -= 10;
  drawLabelValue("Patient", patient.name, margin + 14, 145);
  drawLabelValue("Email", patient.email, margin + 182, 160);
  drawLabelValue("Phone", patient.phone, margin + 365, 130);
  y -= 80;

  page.drawText("ASSESSMENT SUMMARY", { x: margin, y, size: 11, font: bold, color: pink });
  y -= 20;
  page.drawRectangle({ x: margin, y: y - 44, width: 511, height: 56, color: palePink });
  y -= 2;
  drawLabelValue("Pain intensity", `${assessment.severity}/10`, margin + 14, 95);
  drawLabelValue("Duration", assessment.duration, margin + 130, 130);
  drawLabelValue("Anatomy view", `${assessment.focusRegion} | ${assessment.anatomyLayer} | ${assessment.view}`, margin + 280, 215);
  y -= 70;

  page.drawText("MARKED ANATOMY", { x: margin, y, size: 11, font: bold, color: pink });
  y -= 18;
  if (anatomyImages.length) {
    for (const anatomyImage of anatomyImages) {
      const image = anatomyImage.mimeType === "image/png"
        ? await document.embedPng(anatomyImage.bytes)
        : await document.embedJpg(anatomyImage.bytes);
      const fitted = image.scaleToFit(511, 265);
      ensureSpace(fitted.height + 34);
      page.drawText(pdfSafe(anatomyImage.label).toUpperCase(), { x: margin, y, size: 9, font: bold, color: teal });
      y -= 15;
      page.drawRectangle({ x: margin - 2, y: y - fitted.height - 2, width: fitted.width + 4, height: fitted.height + 4, color: teal });
      page.drawImage(image, { x: margin, y: y - fitted.height, width: fitted.width, height: fitted.height });
      y -= fitted.height + 24;
    }
  } else {
    page.drawText("An anatomy snapshot was not available for this submission.", { x: margin, y, size: 10, font: regular, color: muted });
    y -= 25;
  }

  ensureSpace(80);
  page.drawText("SELECTED PAIN AREAS", { x: margin, y, size: 11, font: bold, color: pink });
  y -= 21;
  assessment.regions.forEach((region, index) => {
    const titleLines = wrapText(`${index + 1}. ${region.region}`, bold, 10.5, 485);
    const detailLines = wrapText(`${region.muscle} | ${region.view} view`, regular, 9, 475);
    const blockHeight = (titleLines.length * 13) + (detailLines.length * 11) + 12;
    ensureSpace(blockHeight);
    titleLines.forEach((line, lineIndex) => {
      page.drawText(line, { x: margin + 8, y: y - (lineIndex * 13), size: 10.5, font: bold, color: slate });
    });
    y -= titleLines.length * 13;
    detailLines.forEach((line, lineIndex) => {
      page.drawText(line, { x: margin + 8, y: y - (lineIndex * 11), size: 9, font: regular, color: muted });
    });
    y -= (detailLines.length * 11) + 10;
  });

  if (assessment.notes) {
    ensureSpace(65);
    page.drawText("PATIENT NOTES", { x: margin, y, size: 11, font: bold, color: pink });
    y -= 20;
    const noteLines = wrapText(assessment.notes, regular, 10, 511);
    noteLines.forEach((line) => {
      ensureSpace(14);
      page.drawText(line, { x: margin, y, size: 10, font: regular, color: slate });
      y -= 14;
    });
  }

  for (const reportPage of document.getPages()) {
    reportPage.drawText("Patient-reported information only - not a medical diagnosis", {
      x: margin,
      y: 28,
      size: 8,
      font: regular,
      color: muted,
    });
  }

  document.setTitle(`Pain Assessment - ${pdfSafe(patient.name)}`);
  document.setAuthor("Dr. Kamini Shakya Physiotherapy Clinic");
  document.setCreationDate(new Date());
  return Buffer.from(await document.save());
}
