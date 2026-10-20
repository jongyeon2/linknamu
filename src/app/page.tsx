import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

// wireframe.png 레이아웃: 원형 프로필 사진 → 이름 → 한 줄 소개 → 세로 링크 카드 목록
export default function Home() {
  return (
    <main className="relative flex flex-1 justify-center overflow-hidden bg-gradient-to-b from-[#fff8f0] via-[#fff0e4] to-[#ffdfcc] px-6 py-20 sm:px-8 sm:py-24">
      {/* 글래스 카드 뒤로 은은하게 비치는 장식용 빛 번짐 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#ffd6b8] opacity-60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#ffc9a8] opacity-50 blur-3xl"
      />

      <div className="relative flex w-full max-w-md flex-col items-center gap-12">
        <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />
        <LinkList links={profile.links} />
      </div>
    </main>
  );
}
