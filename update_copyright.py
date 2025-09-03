#!/usr/bin/env python3
"""
Copyright Update Script for CoastSense Project

This script automatically updates the copyright year in all project files.
Run this script at the beginning of each year to update copyright notices.

Usage: python update_copyright.py
"""

import os
import re
from datetime import datetime

def update_copyright_in_file(filepath, current_year):
    """Update copyright year in a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Pattern to match copyright notices with years
        copyright_pattern = r'Copyright \(c\) (\d{4}) CoastSense Project'

        def update_year(match):
            old_year = match.group(1)
            if old_year != str(current_year):
                print(f"Updating {filepath}: {old_year} -> {current_year}")
                return f'Copyright (c) {current_year} CoastSense Project'
            return match.group(0)

        new_content = re.sub(copyright_pattern, update_year, content)

        # Only write if content changed
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True

    except Exception as e:
        print(f"Error processing {filepath}: {e}")

    return False

def main():
    current_year = datetime.now().year
    print(f"Updating copyright year to {current_year}")

    # Files to check for copyright updates
    files_to_check = [
        'README.md',
        'india_heatmap.py',
        'static/js/main.js',
        'templates/dashboard.html',
        'india_heatmap.html',
        'LICENSE'
    ]

    updated_count = 0

    for filepath in files_to_check:
        if os.path.exists(filepath):
            if update_copyright_in_file(filepath, current_year):
                updated_count += 1
        else:
            print(f"Warning: File not found: {filepath}")

    if updated_count > 0:
        print(f"Success: Updated copyright year in {updated_count} file(s)")
    else:
        print("Info: All copyright notices are already up to date")

if __name__ == "__main__":
    main()