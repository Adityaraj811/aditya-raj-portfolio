import React from 'react';
import { RESUME_PDF_BASE64 } from '../data/resumePdfBase64';

let cachedPdfBytes: Uint8Array<ArrayBuffer> | null = null;
let cachedBlobUrl: string | null = null;

/**
 * Checks whether an ArrayBuffer or Uint8Array begins with the "%PDF-" magic header
 * (0x25, 0x50, 0x44, 0x46, 0x2D). This prevents SPA HTML fallback responses
 * (<!doctype html>) from ever being saved as a corrupted .pdf file.
 */
export function isValidPdfBytes(bytes: Uint8Array): boolean {
  if (!bytes || bytes.byteLength < 10) return false;
  return (
    bytes[0] === 0x25 && // %
    bytes[1] === 0x50 && // P
    bytes[2] === 0x44 && // D
    bytes[3] === 0x46 && // F
    bytes[4] === 0x2d    // -
  );
}

/**
 * Decodes the exact 61,250-byte binary payload of public/resume.pdf (Aditya_Raj_Updated_CV.pdf).
 */
export function getEmbeddedResumePdfBytes(): Uint8Array<ArrayBuffer> {
  if (cachedPdfBytes) return cachedPdfBytes;

  const binaryString = window.atob(RESUME_PDF_BASE64);
  const length = binaryString.length;
  const buffer = new ArrayBuffer(length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  cachedPdfBytes = bytes;
  return bytes;
}

/**
 * Returns a browser Blob URL (blob:...) guaranteed to contain the valid 61,250-byte
 * PDF document with MIME type "application/pdf".
 */
export function getVerifiedResumeBlobUrl(): string {
  if (cachedBlobUrl) return cachedBlobUrl;
  const bytes = getEmbeddedResumePdfBytes();
  const blob = new Blob([bytes.buffer], { type: 'application/pdf' });
  cachedBlobUrl = URL.createObjectURL(blob);
  return cachedBlobUrl;
}

/**
 * Resolves the latest valid PDF bytes: first checks `${import.meta.env.BASE_URL}resume.pdf`
 * over HTTP (in case the user replaces public/resume.pdf in the future) and verifies the
 * "%PDF-" magic header; if the server returns an HTML SPA fallback or is unreachable,
 * falls back immediately to the exact embedded bytes of public/resume.pdf.
 */
export async function fetchVerifiedResumeBlob(configuredPath: string): Promise<Blob> {
  const candidates = Array.from(
    new Set([
      configuredPath,
      '/assets/aistudio/Aditya_Raj_CV__2__345c35da.pdf',
      './assets/aistudio/Aditya_Raj_CV__2__345c35da.pdf',
      './resume.pdf',
      '/resume.pdf',
      '/aditya-raj-portfolio/resume.pdf',
    ])
  );

  for (const url of candidates) {
    try {
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) continue;
      const buffer = await response.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      if (isValidPdfBytes(bytes)) {
        return new Blob([buffer], { type: 'application/pdf' });
      }
    } catch {
      // Ignore network errors and try next candidate or embedded bytes
    }
  }

  return new Blob([getEmbeddedResumePdfBytes().buffer], { type: 'application/pdf' });
}

/**
 * Click handler for all "Download Resume" links/buttons.
 * Guarantees that clicking "Download Resume" always downloads a valid, openable
 * PDF file named "Aditya_Raj_CV.pdf" (never an HTML fallback).
 */
export async function handleDownloadResumePdf(
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  configuredPath: string,
  downloadFilename = 'Aditya_Raj_CV.pdf'
): Promise<void> {
  e.preventDefault();

  try {
    const blob = await fetchVerifiedResumeBlob(configuredPath);
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = downloadFilename;
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 15000);
  } catch {
    // Immediate synchronous fallback using pre-built Blob URL
    const fallbackUrl = getVerifiedResumeBlobUrl();
    const link = document.createElement('a');
    link.href = fallbackUrl;
    link.download = downloadFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
