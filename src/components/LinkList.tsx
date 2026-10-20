"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type LinkListProps = {
  links: LinkItem[];
};

export default function LinkList({ links }: LinkListProps) {
  // 데이터를 받기 전에는 모든 링크를 0회로 표시합니다.
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/click", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { counts?: Record<string, number> } | null) => {
        if (!data?.counts) return;
        // 응답 전에 클릭한 횟수가 사라지지 않도록 기존 값과 큰 쪽을 유지합니다.
        setCounts((prev) => {
          const next = { ...data.counts };
          for (const [id, count] of Object.entries(prev)) {
            next[id] = Math.max(next[id] ?? 0, count);
          }
          return next;
        });
      })
      .catch(() => {
        // 조회에 실패하면 0회 표시를 그대로 둡니다.
      });
    return () => controller.abort();
  }, []);

  const handleClick = (id: string) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <ul className="flex w-full flex-col gap-4 sm:gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard {...link} count={counts[link.id] ?? 0} onClick={() => handleClick(link.id)} />
        </li>
      ))}
    </ul>
  );
}
