const fs = require('fs');
const path = require('path');

// Create the used directory
const usedDir = path.join(__dirname, 'blueprints', 'posthog', 'used');
if (!fs.existsSync(usedDir)) {
    fs.mkdirSync(usedDir, { recursive: true });
}

// Folders to copy (preserving structure)
const foldersToCopy = [
    { source: 'blueprints/posthog/posthog/posthog/idl', dest: 'blueprints/posthog/used/posthog/posthog/idl' },
    { source: 'blueprints/posthog/posthog/docker/clickhouse/docker-entrypoint-initdb.d', dest: 'blueprints/posthog/used/posthog/docker/clickhouse/docker-entrypoint-initdb.d' },
    { source: 'blueprints/posthog/posthog/posthog/user_scripts', dest: 'blueprints/posthog/used/posthog/posthog/user_scripts' },
    { source: 'blueprints/posthog/compose', dest: 'blueprints/posthog/used/compose' },
    { source: 'blueprints/posthog/posthog/docker/temporal/dynamicconfig', dest: 'blueprints/posthog/used/posthog/docker/temporal/dynamicconfig' },
    { source: 'blueprints/posthog/share', dest: 'blueprints/posthog/used/share' },
    { source: 'blueprints/posthog/posthog/rust', dest: 'blueprints/posthog/used/posthog/rust' },
    { source: 'blueprints/posthog/posthog/docker/postgres-init-scripts', dest: 'blueprints/posthog/used/posthog/docker/postgres-init-scripts' }
];

// Files to copy (preserving structure)
const filesToCopy = [
    { source: 'blueprints/posthog/posthog/docker/clickhouse/config.xml', dest: 'blueprints/posthog/used/posthog/docker/clickhouse/config.xml' },
    { source: 'blueprints/posthog/posthog/docker/clickhouse/config.d/default.xml', dest: 'blueprints/posthog/used/posthog/docker/clickhouse/config.d/default.xml' },
    { source: 'blueprints/posthog/posthog/docker/clickhouse/users.xml', dest: 'blueprints/posthog/used/posthog/docker/clickhouse/users.xml' },
    { source: 'blueprints/posthog/posthog/docker/clickhouse/user_defined_function.xml', dest: 'blueprints/posthog/used/posthog/docker/clickhouse/user_defined_function.xml' },
    { source: 'blueprints/posthog/posthog/docker/livestream/configs-hobby.yml', dest: 'blueprints/posthog/used/posthog/docker/livestream/configs-hobby.yml' },
    { source: 'blueprints/posthog/posthog/otel-collector-config.dev.yaml', dest: 'blueprints/posthog/used/posthog/otel-collector-config.dev.yaml' },
    { source: 'blueprints/posthog/posthog/rust/docker/echo-server/Caddyfile', dest: 'blueprints/posthog/used/posthog/rust/docker/echo-server/Caddyfile' }
];

function copyRecursive(src, dest) {
    const stat = fs.statSync(src);
    
    if (stat.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        const entries = fs.readdirSync(src);
        for (const entry of entries) {
            copyRecursive(path.join(src, entry), path.join(dest, entry));
        }
    } else {
        const destDir = path.dirname(dest);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        fs.copyFileSync(src, dest);
    }
}

console.log('Copying folders...');
for (const folder of foldersToCopy) {
    const srcPath = path.join(__dirname, folder.source);
    const destPath = path.join(__dirname, folder.dest);
    
    if (fs.existsSync(srcPath)) {
        copyRecursive(srcPath, destPath);
        console.log(`Copied: ${folder.source} -> ${folder.dest}`);
    } else {
        console.log(`Warning: Source not found: ${folder.source}`);
    }
}

console.log('\nCopying files...');
for (const file of filesToCopy) {
    const srcPath = path.join(__dirname, file.source);
    const destPath = path.join(__dirname, file.dest);
    
    if (fs.existsSync(srcPath)) {
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${file.source} -> ${file.dest}`);
    } else {
        console.log(`Warning: Source not found: ${file.source}`);
    }
}

console.log('\nDone! All used folders and files have been copied to blueprints/posthog/used');

