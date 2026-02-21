import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

walk('src', (filePath) => {
    if (filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf-8');
        let original = content;

        // React Router Link -> Next.js Link
        content = content.replace(/import\s+\{\s*Link\s*\}\s+from\s+['"]react-router-dom['"];?/g, 'import Link from "next/link";');
        content = content.replace(/import\s+\{\s*Link,\s*useLocation\s*\}\s+from\s+['"]react-router-dom['"];?/g, 'import Link from "next/link";\nimport { usePathname } from "next/navigation";');
        content = content.replace(/import\s+\{\s*Link,\s*useNavigate\s*\}\s+from\s+['"]react-router-dom['"];?/g, 'import Link from "next/link";\nimport { useRouter } from "next/navigation";');

        // Hooks
        content = content.replace(/useLocation\(\)/g, 'usePathname()');
        content = content.replace(/useNavigate\(\)/g, 'useRouter()');
        content = content.replace(/location\.pathname/g, 'pathname');

        // Link "to" to "href"
        content = content.replace(/<Link\s+([^>]*)to=([^>]+)>/g, '<Link $1href=$2>');
        content = content.replace(/<Link\s+to=/g, '<Link href=');

        // Add "use client" if it uses hooks
        if ((content.includes('useState') || content.includes('useEffect') || content.includes('usePathname') || content.includes('useRouter') || content.includes('framer-motion')) && !content.includes('"use client"')) {
            content = '"use client";\n' + content;
        }

        if (content !== original) {
            fs.writeFileSync(filePath, content);
            console.log('Updated', filePath);
        }
    }
});
