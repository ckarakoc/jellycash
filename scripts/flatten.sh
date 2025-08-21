#!/bin/bash

set -e

dist_root=$(realpath ./dist)
projects=$(find "$dist_root" -maxdepth 1 -type d ! -path "$dist_root")

for project in $projects; do
    browser_path="$project/browser"
    final_folder_name=$(basename "$project")

    if [[ -d "$browser_path" ]]; then
        echo "Flattening $browser_path to $project"

        # Move contents of browser folder to parent (equivalent to robocopy /MOVE /E)
        mv "$browser_path"/* "$project"/ 2>/dev/null || true
        rmdir "$browser_path" 2>/dev/null || true

        index_file="$project/index.html"
        if [[ -f "$index_file" ]]; then
            cp "$index_file" "$project/404.html"
            echo "Copied index.html to 404.html in $project"
        else
            echo "Warning: index.html not found in $project" >&2
        fi
    fi

    if [[ "$final_folder_name" == "main" ]]; then
        # Move everything from main folder to dist root
        mv "$project"/* "$dist_root"/ 2>/dev/null || true
        echo "Copied everything from main folder to $dist_root"

        if [[ -d "$project" ]]; then
            rm -rf "$project"
            echo "Deleted 'main' folder: $project"
        fi
    fi
done
