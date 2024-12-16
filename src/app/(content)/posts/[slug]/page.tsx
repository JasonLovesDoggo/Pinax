import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import Script from "next/script";
import { FaX } from "react-icons/fa6";
import Site from "@/config/site";
import { getAllPosts } from "@/lib/posts";
import Anchor from "@/components/misc/Anchor";
import { CustomMDX } from "@/components/misc/mdx";

// todo: dynamically generate an image for the post

type Params = Promise<{ slug: string }>;

export const generateStaticParams = async () =>
  getAllPosts().map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { slug } = await params;

  const post = getAllPosts().find((post) => post.slug === slug);
  if (!post) return;

  const { title, description, date } = post.metadata;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: date,
      url: `${Site.url}/posts/${post.slug}`,
      authors: "Maulana",
      images: Site.og.image,
    },
    twitter: {
      title,
      description,
      images: Site.og.image,
    },
    alternates: {
      canonical: `${Site.url}/posts/${post.slug}`,
    },
  };
};

const PostPage = async ({ params }: { params: Params }) => {
  const { slug } = await params;

  const post = getAllPosts().find((post) => post.slug === slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    datePublished: post.metadata.date,
    author: [
      {
        "@type": "Person",
        name: Site.author,
        url: Site.url,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-prose px-4 py-10">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="flex items-center justify-center pb-10">
        <Anchor className="inline-flex hover:mb-6 hover:scale-125" href="/">
          <FaX />
          <div className="sr-only">Close</div>
        </Anchor>
      </header>
      <section className="text-center">
        <h1 className="font-calistoga text-3xl leading-relaxed">
          {post.metadata.title}
        </h1>
        <small className="text-gray-600 dark:text-gray-400 mt-2">
          <time dateTime={post.metadata.date}>
            {formatDate(post.metadata.date)}
          </time>
        </small>
      </section>
      <article className="prose dark:prose-invert px-4 py-8">
        <CustomMDX source={post.content} />
      </article>
    </div>
  );
};

export default PostPage;
