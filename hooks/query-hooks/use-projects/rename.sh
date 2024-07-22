#!/bin/bash

# Iterate over all files ending with "-project.ts"
for file in *-project.ts; do
  # Check if the file exists to avoid errors if no matching files are found
  if [ -e "$file" ]; then
    # Create the new filename by replacing "-project.ts" with "-projects.ts"
    new_file="${file/-project.ts/-project.ts}"
    
    # Rename the file
    mv "$file" "$new_file"
    
    # Output the rename operation
    echo "Renamed $file to $new_file"
  fi
done
