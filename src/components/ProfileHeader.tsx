import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center gap-3 text-center">
      <Image
        src={imageUrl}
        alt={`${name} 프로필 사진`}
        width={160}
        height={160}
        unoptimized
        priority
        className="h-32 w-32 rounded-full object-cover ring-4 ring-white/90 shadow-[0_18px_40px_-12px_rgba(160,90,50,0.45)] sm:h-36 sm:w-36"
      />
      <h1 className="mt-5 text-2xl font-bold tracking-tight text-stone-800">{name}</h1>
      <p className="text-[15px] leading-relaxed text-stone-500">{bio}</p>
    </header>
  );
}
