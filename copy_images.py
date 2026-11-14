import shutil
import os

source_dir = r"C:\Users\Acer\.gemini\antigravity\brain\8463250d-c177-4c1c-8269-eb8365cd3bc0"
dest_dir = r"assets"

files_to_copy = {
    "media__1778072091582.jpg": "chicken_nuggets.jpg"
}

for src, dest in files_to_copy.items():
    src_path = os.path.join(source_dir, src)
    dest_path = os.path.join(dest_dir, dest)
    if os.path.exists(src_path):
        shutil.copy(src_path, dest_path)
        print(f"Copied {dest} successfully!")
    else:
        print(f"Error: Could not find {src_path}")
