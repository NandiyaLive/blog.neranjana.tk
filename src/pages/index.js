import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Neranjana's Blog 📝</title>
        <meta name="title" content={`Neranjana's Blog 📝`} />
        <meta
          name="description"
          content="Neranjana Prasad's (Nandiya's) personal blog. Writes about tech, thoughts, personal opinions and some random stuff."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://blog.neranjana.tk/`} />
        <meta property="og:title" content={`Neranjana's Blog 📝`} />
        <meta
          property="og:description"
          content="Neranjana Prasad's (Nandiya's) personal blog. Writes about tech, thoughts, personal opinions and some random stuff."
        />
        <meta property="og:image" content={`/intro-bg.webp`} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://blog.neranjana.tk/`} />
        <meta property="twitter:title" content={`Neranjana's Blog 📝`} />
        <meta
          property="twitter:description"
          content="Neranjana Prasad's (Nandiya's) personal blog. Writes about tech, thoughts, personal opinions and some random stuff."
        />
        <meta property="twitter:image" content={`/intro-bg.webp`} />
      </Head>
      
      <main className="container">
        <section className="intro">
          <div className="intro-bg">
            <Image
              src={"/intro-bg.webp"}
              objectFit="cover"
              layout="fill"
              priority
            />
            <div className="intro-overlay"></div>
          </div>

          <div className="intro-text">
            <p className="title">Neranjana's Blog 📝</p>
            <p className="subtitle">
              Hi, Welcome to Neranjana's Blog! I occasionally write
              about tech, movies, weird thought of mine and some other random
              stuff here. Most of the content are written in my native language,
              සිංහල (Sinhala). If you wanna know more about me, I have a{" "}
              <a
                href="https://neranjana.tk"
                target="_blank"
                rel="noopener noreferrer"
              >
                website thingy{" "}
              </a>
              too.
            </p>
          </div>
        </section>

        <section className="post-container">
          <div className="post-container-top">
            <p className="title">Recent Posts</p>
          </div>
          <ul className="posts">
            {posts.slice(0, 5).map((post, index) => (
              <li key={index}>
                <p className="date">{post.frontmatter.date}</p> <span>—</span>
                <p className="post-title">
                  <Link href={post.slug}>{post.frontmatter.title}</Link>
                </p>
              </li>
            ))}
          </ul>
          <p>
            <Link href={"/posts"}>See All</Link>
          </p>
        </section>
      </main>
    </>
  );
}

export const sortByDate = (a, b) => {
  return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
};

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join("src/posts"));

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace(".md", "");

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join("src/posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
