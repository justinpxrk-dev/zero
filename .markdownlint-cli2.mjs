export default {
  config: {
    default: true,
    // Prettier owns wrapping (proseWrap defaults to preserve), so don't double-flag line length.
    MD013: false,
  },
  globs: ["**/*.md"],
  gitignore: true,
};
