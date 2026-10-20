"use client";

import type { LinkItem } from "@/data/profile";

export default function LinkCard({ id, title, url, emoji }: LinkItem) {
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
      className="block w-full rounded-3xl border border-white/70 bg-white/45 px-6 py-[18px] text-center font-medium text-stone-700 shadow-[0_8px_24px_-12px_rgba(160,90,50,0.25)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_12px_28px_-12px_rgba(160,90,50,0.32)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
    >
      <span aria-hidden="true" className="mr-2">
        {emoji}
      </span>
      {title}
    </a>
  );
}
