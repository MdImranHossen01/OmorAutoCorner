const fs = require('fs');
const path = require('path');

const replacements = [
  // Emails
  ['concierge@omorautocorner.com', 'concierge@omorautocorner.com'],
  ['support@omorautocorner.com', 'support@omorautocorner.com'],
  ['info@omorautocorner.com', 'info@omorautocorner.com'],
  
  // Specific case-sensitive matches
  ['Omor Auto Corner', 'Omor Auto Corner'],
  ['Omor Auto Corner', 'Omor Auto Corner'],
  ['OmorAutoCorner', 'OmorAutoCorner'],
  ['OMOR AUTO CORNER', 'OMOR AUTO CORNER'],
  ['omorautocorner-app', 'omorautocorner-app'],
  ['omorautocorner.com', 'omorautocorner.com'],
  ['OmorAutoCorner.com', 'OmorAutoCorner.com'],
  ['omor-auto-corner', 'omor-auto-corner'],
  ['omorautocorner', 'omorautocorner'],
  
  // App names or general descriptions
  ['Omor Auto Corner', 'Omor Auto Corner']
];

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.yml', '.yaml', '.md', '.css', '.html', '.env', '.local', '.dockerignore'];
const fileNames = ['Dockerfile', 'docker-compose.yml', '.env.local'];

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    // Skip version control and build folders
    if (stat.isDirectory() && file !== 'node_modules' && file !== '.next' && file !== '.git') {
      walkDir(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(file);
      const isTargetFile = extensions.includes(ext) || fileNames.includes(file);
      
      // Specifically skip bd-locations.ts to avoid renaming geographic "Ruma"
      if (file === 'bd-locations.ts') {
        return;
      }
      
      // Skip binary/lock files
      if (file === 'package-lock.json') {
        return;
      }
      
      if (isTargetFile) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let original = content;
        for (const [from, to] of replacements) {
          content = content.split(from).join(to);
        }
        if (content !== original) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log('Updated:', fullPath.replace(process.cwd() + path.sep, ''));
        }
      }
    }
  });
}

console.log('Starting rebranding to Omor Auto Corner...');
walkDir(process.cwd());
console.log('\nDone! All branding updated.');
