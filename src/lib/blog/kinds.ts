/**
 * What kind of article a post is (migration 0263 `articles.kind`).
 *
 *   news       an announcement: a date, a result, a change of pattern
 *   data       an analysis built on the bank's own numbers
 *   evergreen  an exam's pattern, syllabus and marks page (/exams/<exam>/syllabus)
 *
 * The growth experiment `blog-posts` compares them (scripts/blog/readout.sql).
 */
export const ARTICLE_KINDS = ["news", "data", "evergreen"] as const;
export type ArticleKind = (typeof ARTICLE_KINDS)[number];
