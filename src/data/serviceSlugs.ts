export const serviceSlugs = [
  "remont-na-banya",
  "remont-na-apartamenti",
  "mazilki",
  "gipsokarton",
  "stalbishta-dvorno-stroitelstvo",
  "vik-instalatsii",
  "boyadjijski-uslugi",
  "polirane-na-estestven-kamak",
  "el-instalatsii",
  "lepene-na-estestven-kamak",
  "lepene-na-plochki",
  "shpaklovane",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const servicePaths = serviceSlugs.map((slug) => `/services/${slug}`);
