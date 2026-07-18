"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Mail, Search } from "lucide-react";

import { BLOG_CATEGORIES, BLOG_POSTS } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn, formatDate } from "@/lib/utils";
import { GlowCard } from "@/components/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function BlogGrid() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const [subscribed, setSubscribed] = React.useState(false);

  const featured = BLOG_POSTS.find((p) => p.featured);

  const filtered = BLOG_POSTS.filter((post) => {
    const matchesCategory = category === "All" || post.category === category;
    const matchesQuery =
      query.trim() === "" ||
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="flex flex-col gap-16">
      {featured ? (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <Link href={`/blog/${featured.slug}`}>
            <GlowCard className="grid gap-0 overflow-hidden md:grid-cols-2">
              <div className="relative aspect-video md:aspect-auto">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-8">
                <Badge variant="default" className="w-fit">
                  Featured Article
                </Badge>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{formatDate(featured.publishedAt)}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {featured.readingTime} min read
                  </span>
                </div>
              </div>
            </GlowCard>
          </Link>
        </motion.div>
      ) : null}

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="pl-11"
            aria-label="Search articles"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300",
                category === cat
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
              aria-pressed={category === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <motion.div
          key={`${category}-${query}`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((post) => (
            <motion.article key={post.slug} variants={fadeUp} className="h-full">
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <GlowCard className="flex h-full flex-col">
                  <div className="relative aspect-video overflow-hidden rounded-t-3xl">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <Badge variant="outline" className="w-fit">
                      {post.category}
                    </Badge>
                    <h3 className="text-lg font-semibold text-foreground">
                      {post.title}
                    </h3>
                    <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-foreground/[0.04] px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {post.readingTime} min read
                      </span>
                    </div>
                  </div>
                </GlowCard>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      ) : (
        <p className="py-16 text-center text-muted-foreground">
          No articles found matching your search.
        </p>
      )}

      <div className="gradient-border rounded-3xl p-10 text-center">
        <Mail className="mx-auto mb-4 size-8 text-primary" />
        <h3 className="mb-2 text-2xl font-bold text-foreground">
          Subscribe to the newsletter
        </h3>
        <p className="mx-auto mb-6 max-w-md text-muted-foreground">
          Get notified when I publish new articles on web development, system
          design, and building products.
        </p>
        {subscribed ? (
          <p className="flex items-center justify-center gap-2 text-accent">
            <CheckCircle2 className="size-5" />
            You&apos;re subscribed. Thanks for joining!
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubscribed(true);
            }}
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              required
              placeholder="you@example.com"
              aria-label="Email address"
            />
            <Button type="submit">
              Subscribe
              <ArrowRight className="size-4" />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
