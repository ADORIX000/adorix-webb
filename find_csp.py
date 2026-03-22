import os
for root, dirs, files in os.walk("."):
    if "node_modules" in root or ".git" in root or ".next" in root:
        continue
    for file in files:
        if file.endswith((".js", ".jsx", ".ts", ".tsx", ".json", ".mjs")):
            try:
                with open(os.path.join(root, file), "r", encoding="utf-8") as f:
                    content = f.read()
                    if "Content-Security-Policy" in content or "script-src" in content:
                        print(f"Match found in: {os.path.join(root, file)}")
            except:
                pass
