import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const blogDir = "blogs";

  const files = fs.readdirSync(path.join(blogDir));

  const blogs = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf-8");

    const { data: frontMatter } = matter(fileContent);
    return {
      meta: frontMatter,
      slug: filename.replace(".mdx", ""),
    };
  });
  return (
    <section>
      <p className="text-muted-foreground mb-10">
        This are some of useful stuff I remember in my web dev journey
        interpreted by AI.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {blogs.map((blog) => (
          <Link href={"/blogs/" + blog.slug} passHref key={blog.slug}>
            <Card className="group">
              <CardHeader>
                <CardTitle className="group-hover:text-primary group-hover:underline text-base">
                  {blog.meta.title}
                </CardTitle>
                <CardDescription>{blog.meta.description}</CardDescription>
              </CardHeader>
              <CardFooter className="text-xs">{blog.meta.date}</CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
