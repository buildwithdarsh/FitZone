#!/usr/bin/env node

/**
 * Validates all image URLs in mock-data.ts return HTTP 200
 */

import { readFileSync } from "fs";
import { resolve } from "path";

const mockDataPath = resolve("src/lib/mock-data.ts");
const content = readFileSync(mockDataPath, "utf-8");

// Extract all Unsplash URLs
const urlRegex = /https:\/\/images\.unsplash\.com\/photo-[^\s"'`,]+/g;
const urls = [...new Set(content.match(urlRegex) || [])];

console.log(`Found ${urls.length} unique image URLs to validate.\n`);

let passed = 0;
let failed = 0;
const failures = [];

for (const url of urls) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (res.status === 200) {
      passed++;
      console.log(`  ✓ ${res.status} — ${url.slice(0, 80)}...`);
    } else {
      failed++;
      failures.push({ url, status: res.status });
      console.log(`  ✗ ${res.status} — ${url.slice(0, 80)}...`);
    }
  } catch (err) {
    failed++;
    failures.push({ url, status: `ERROR: ${err.message}` });
    console.log(`  ✗ ERROR — ${url.slice(0, 80)}...`);
  }
}

console.log(`\n${"=".repeat(60)}`);
console.log(`Results: ${passed} passed, ${failed} failed out of ${urls.length} URLs`);

if (failures.length > 0) {
  console.log(`\nFailed URLs:`);
  for (const f of failures) {
    console.log(`  ${f.status} — ${f.url}`);
  }
  process.exit(1);
} else {
  console.log(`\n✓ All images return HTTP 200!`);
  process.exit(0);
}
