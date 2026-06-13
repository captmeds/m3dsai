export interface PortfolioProject {
  id: string;
  name: string;
  initials: string;
  url: string;
  displayUrl: string;
  description: string;
  bio: string;
  gradient: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "xjkt",
    name: "XJKT",
    initials: "XJ",
    url: "https://www.xjkt.fun",
    displayUrl: "xjkt.fun",
    description: "A bold digital experience with a creative, modern identity.",
    bio: "XJKT was designed as a fun, expressive web project focused on energy, culture, and digital engagement.",
    gradient: "from-fuchsia-500 to-orange-400",
  },
  {
    id: "zaaas",
    name: "ZAAAS",
    initials: "ZA",
    url: "https://zaaas.m3dsai.com",
    displayUrl: "zaaas.m3dsai.com",
    description: "A communication-support platform for people who may struggle to speak.",
    bio: "ZAAAS supports users affected by dementia, Alzheimer's, stroke, autism, aphasia, or other communication challenges by creating a more accessible and supportive digital experience.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "bali-sunny-kids",
    name: "Bali Sunny Kids",
    initials: "BS",
    url: "https://www.balisunnykids.com",
    displayUrl: "balisunnykids.com",
    description: "A warm and friendly website focused on children, learning, and community.",
    bio: "Bali Sunny Kids was created to present a bright, trustworthy, and welcoming online presence for families and children in Bali.",
    gradient: "from-yellow-400 to-orange-400",
  },
  {
    id: "23tribes",
    name: "23Tribes",
    initials: "23",
    url: "https://www.23tribes.com",
    displayUrl: "23tribes.com",
    description: "A fashion and creative brand where culture, creativity, and individuality come together.",
    bio: "23Tribes showcases custom fashion, self-expression, and cultural design through a stylish digital brand experience.",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "keira-shabira",
    name: "Keira Shabira",
    initials: "KS",
    url: "https://www.keirashabira.website",
    displayUrl: "keirashabira.website",
    description: "A personal portfolio website with a clean and elegant presentation.",
    bio: "Keira Shabira's website was designed as a modern personal brand platform to showcase identity, creativity, and online presence.",
    gradient: "from-rose-400 to-pink-500",
  },
];
