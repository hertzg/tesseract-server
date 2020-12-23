const fs = require('fs');
const path = require('path');

const changelogPath = path.resolve(__dirname, '../../CHANGELOG-next.md');
fs.writeFileSync(changelogPath, '');
