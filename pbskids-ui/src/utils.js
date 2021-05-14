export default function getSlug(title) {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    // Remove invalid chars
    .replace(/[^a-z0-9 -]/g, '')
    // Replace whitespace by -
    .replace(/\s+/g, '-')
    // Coollapse dashes
    .replace(/-+/g, '-');
}
