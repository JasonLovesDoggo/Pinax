let Site = {
  domain: "jasoncameron.dev",
  github: "https://github.com/JasonLovesDoggo/Pinax",
  author: "Jason Cameron",
  statusSite: "https://status.jasoncameron.dev",
  spotifyAccountUrl:
    "https://open.spotify.com/user/5wtv5fh7fqqcysu4f3q13wuv1?si=4b143eb7315e44fc",
  url: undefined as unknown as string,
  og: {
    title: "Pinax",
    description: "Personal website of Jason Cameron",
    image: "https://jasoncameron.dev/images/og.png",
    type: "website",
  },
};

Site.url = `https://${Site.domain}`;

export default Site;
