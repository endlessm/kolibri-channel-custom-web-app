import slugify from 'slugify';
import arrayToTree from 'array-to-tree';

export function getSlug(title) {
  return slugify(title, { lower: true });
}

export function getNodesTree(nodes) {
  return arrayToTree(nodes, { parentProperty: 'parent' });
}

export function recursiveExistsNodes(node, fn) {
  if (fn(node)) {
    return true;
  }

  if (node.children) {
    return node.children.some((leaf) => recursiveExistsNodes(leaf, fn));
  }

  return false;
}
