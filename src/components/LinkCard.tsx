"use client";

import type { LinkItem } from "@/data/profile";

export default function LinkCard({ id, title, url }: LinkItem) {
  const handleClick = () => {
    // 페이지 이동 중에도 요청이 끝까지 전송되도록 sendBeacon을 사용합니다.
    const body = new Blob([JSON.stringify({ linkId: id })], { type: "application/json" });
    if (!navigator.sendBeacon?.("/api/click", body)) {
      void fetch("/api/click", { method: "POST", body, keepalive: true });
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="block w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-center font-medium text-zinc-800 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md active:translate-y-0"
    >
      {title}
    </a>
  );
}
