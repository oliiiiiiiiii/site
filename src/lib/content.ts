import type { CollectionEntry } from 'astro:content';

export type SubjectEntry = CollectionEntry<'subjects'>;
export type LessonEntry = CollectionEntry<'lessons'>;
export type PostEntry = CollectionEntry<'posts'>;

export const byPublishedDesc = <T extends { data: { published: Date } }>(a: T, b: T) =>
  b.data.published.valueOf() - a.data.published.valueOf();

export const byUpdatedDesc = <T extends { data: { updated: Date } }>(a: T, b: T) =>
  b.data.updated.valueOf() - a.data.updated.valueOf();

export const byLessonOrder = (a: LessonEntry, b: LessonEntry) =>
  a.data.order - b.data.order || a.data.title.localeCompare(b.data.title);

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);

export const getPostPath = (post: PostEntry) => `/posts/${post.id}/`;
export const getLessonPath = (lesson: LessonEntry) => `/notes/${lesson.data.subject}/${lesson.id}/`;

export function groupLessonsBySection(subject: SubjectEntry, lessons: LessonEntry[]) {
  return subject.data.sections.map((section) => ({
    ...section,
    lessons: lessons.filter((lesson) => lesson.data.section === section.id).sort(byLessonOrder),
  }));
}
