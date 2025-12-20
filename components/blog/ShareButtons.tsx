"use client";

import { Twitter, Linkedin, LinkIcon } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex gap-3">
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-brown-100 hover:bg-brown-200 text-brown-700 rounded-xl transition-colors"
      >
        <Twitter className="w-4 h-4" />
        <span className="text-sm font-medium">Twitter</span>
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-brown-100 hover:bg-brown-200 text-brown-700 rounded-xl transition-colors"
      >
        <Linkedin className="w-4 h-4" />
        <span className="text-sm font-medium">LinkedIn</span>
      </a>
      <button
        onClick={handleCopyLink}
        className="px-4 py-3 bg-brown-100 hover:bg-brown-200 text-brown-700 rounded-xl transition-colors"
      >
        <LinkIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
