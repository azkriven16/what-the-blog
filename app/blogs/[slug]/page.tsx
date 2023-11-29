import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { siteConfig } from "@/config/site";

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("blogs"));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return paths;
}

function getPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join("blogs", slug + ".mdx"),
    "utf-8"
  );

  const { data: fontMatter, content } = matter(markdownFile);

  return {
    fontMatter,
    slug,
    content,
  };
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const props = getPost(params);

  if (!props) {
    return;
  }

  const blogTitle = `${siteConfig.siteUrl}/blogs/${props.fontMatter.title
    .replace(/\s+/g, "-")
    .toLowerCase()}`;

  return {
    title: props.fontMatter.title,
    description: props.fontMatter.description,
    openGraph: {
      title: props.fontMatter.title,
      description: props.fontMatter.description,
      url: blogTitle,
      siteName: siteConfig.title,
      locale: "en_US",
      type: "article",
      images: [siteConfig.socialBanner],
      authors: [siteConfig.author],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: props.fontMatter.description,
      images: [siteConfig.socialBanner],
    },
  };
}

export default function Page({ params }: any) {
  const props = getPost(params);

  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg prose-blue dark:prose-invert mx-auto">
      <MDXRemote source={props.content}></MDXRemote>
    </article>
  );
}
