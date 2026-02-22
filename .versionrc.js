const header = [
  "",
  "[//]: # (GENERATED FILE. DO NOT EDIT DIRECTLY. ALL CHANGES WILL BE OVERWRITTEN)",
  "",
  "# Changelog",
  "",
  "All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.",
  "",
  "## Unreleased (pending for next release)",
  "",
  "All unreleased changes scheduled for the next release are in [CHANGELOG-next.md](./CHANGELOG-next.md)",
  "",
].join("\n");

module.exports = {
  header: header,
  releaseCommitMessageFormat: "chore(release): {{currentTag}} 🎉 ",
  types: [
    { type: "feat", section: "🚀 Features" },
    { type: "fix", section: "🐛 Bug Fixes" },
    { type: "docs", section: "📖 Documentation Updates" },
    { type: "test", section: "🧪 Testing Improvements" },
    { type: "chore", section: "🛠️ General Chores" },
    { type: "ci", section: "🚆 Pipeline Improvements" },
    { type: "refactor", section: "🌟 Refactorings" },
    { type: "perf", section: "📈 Performance Improvements" },
  ],
  commitAll: true,
  scripts: {
    postchangelog: "node scripts/changelog/clean.js",
  },
};
