"use client";

import type { LinkItem } from "@/data/profile";

type LinkCardProps = LinkItem & {
  count: number;
  onClick?: () => void;
};

export default function LinkCard({ id, title, url, emoji, count, onClick }: LinkCardProps) {
  const handleClick = () => {
    onClick?.();

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
      className="relative block w-full rounded-3xl border border-white/70 bg-white/45 px-6 py-[18px] text-center font-medium text-stone-700 shadow-[0_8px_24px_-12px_rgba(160,90,50,0.25)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_12px_28px_-12px_rgba(160,90,50,0.32)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300"
    >
      <span aria-hidden="true" className="mr-2">
        {emoji}
      </span>
      {title}
      {/* 제목이 가운데에 머물도록 클릭 수는 오른쪽에 겹쳐 배치합니다. */}
      <span className="absolute top-1/2 right-6 -translate-y-1/2 text-xs font-normal text-stone-400 tabular-nums">
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
