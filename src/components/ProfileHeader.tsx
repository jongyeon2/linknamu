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
        className="h-36 w-36 rounded-full object-cover ring-4 ring-white shadow-md sm:h-40 sm:w-40"
      />
      <h1 className="mt-4 text-2xl font-bold text-zinc-900">{name}</h1>
      <p className="text-base text-zinc-600">{bio}</p>
    </header>
  );
}
