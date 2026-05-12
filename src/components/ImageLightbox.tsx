"use client";

import { useEffect, useCallback } from "react";
import { X, Download } from "lucide-react";

interface ImageLightboxProps {
  imageUrl: string;
  caption?: string;
  onClose: () => void;
}

export default function ImageLightbox({ imageUrl, caption, onClose }: ImageLightboxProps) {
  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const filename = caption
        ? `coreling-${caption.replace(/\s+/g, "-").slice(0, 40)}-${Date.now()}.png`
        : `coreling-design-${Date.now()}.png`;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  }, [imageUrl, caption]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      <button
        onClick={handleDownload}
        className="absolute right-4 top-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        title="Download"
        aria-label="Download"
      >
        <Download size={20} />
      </button>

      <div className="flex max-h-[90vh] max-w-[90vw] flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={caption || "Generated design"}
          className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl"
        />
        {caption && (
          <p className="mt-3 text-center text-sm text-white/80">{caption}</p>
        )}
      </div>
    </div>
  );
}
