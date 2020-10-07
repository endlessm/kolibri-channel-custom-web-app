import slugify from 'slugify';

export default function getSlug(title) {
  return slugify(title, { lower: true });
}
