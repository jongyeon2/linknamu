import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

// wireframe.png 레이아웃: 원형 프로필 사진 → 이름 → 한 줄 소개 → 세로 링크 카드 목록
export default function Home() {
  return (
    <main className="flex flex-1 justify-center bg-gradient-to-b from-emerald-50 to-zinc-50 px-4 py-16">
      <div className="flex w-full max-w-md flex-col items-center gap-10">
        <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />
        <ul className="flex w-full flex-col gap-4">
          {profile.links.map((link) => (
            <li key={link.id}>
              <LinkCard {...link} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
