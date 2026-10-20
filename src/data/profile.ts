export type LinkItem = {
  id: string;
  title: string;
  url: string;
  emoji: string;
};

export type Profile = {
  name: string;
  bio: string;
  imageUrl: string;
  links: LinkItem[];
};

// 프로필과 링크 목록은 여기서 수정합니다.
export const profile: Profile = {
  name: "백종연",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  imageUrl: "/profile.jpg",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com/jongyeon2", emoji: "🐙" },
    { id: "blog", title: "블로그", url: "https://velog.io", emoji: "📝" },
    { id: "email", title: "이메일", url: "mailto:qorwhddus12@naver.com", emoji: "✉️" },
  ],
};
