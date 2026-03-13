#!/usr/bin/env node
/**
 * Converts SVG logos to white PNG (64x64) for dark backgrounds.
 * Run: npm install sharp && node scripts/svg-to-png-white.js
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const LOGOS_DIR = path.join(__dirname, '..', 'images', 'stack-logos');
const SIZE = 64;

function makeSvgWhite(svgContent) {
  return svgContent
    .replace(/\bfill="[^"]*"/g, 'fill="#ffffff"')
    .replace(/\bstroke="[^"]*"/g, 'stroke="#ffffff"')
    .replace(/\bfill:[^;]+;/g, 'fill:#ffffff;')
    .replace(/\bstroke:[^;]+;/g, 'stroke:#ffffff;')
    .replace(/\.st0\{[^}]*\}/g, '.st0{fill:#ffffff}')
    .replace(/\bfill="#[0-9a-fA-F]{3,8}"/g, 'fill="#ffffff"')
    .replace(/\bstroke="#[0-9a-fA-F]{3,8}"/g, 'stroke="#ffffff"');
}

const SVG_FILES = [
  'databricks.svg', 'aws.svg', 'kubernetes.svg', 'snowflake.svg', 'apacheairflow.svg',
  'docker.svg', 'dbt.svg', 'sigma-computing.svg', 'fivetran.svg', 'apachespark.svg',
  'python.svg', 'github-copilot.svg', 'claude.svg', 'cursor.svg', 'googlecloud.svg',
  'metaplane.svg', 'amazon-redshift.svg', 'dagster.svg', 'prefect.svg', 'bigquery.svg'
];

async function convertAll() {
  for (const name of SVG_FILES) {
    const src = path.join(LOGOS_DIR, name);
    const base = name.replace(/\.svg$/i, '');
    const dest = path.join(LOGOS_DIR, base + '.png');
    if (!fs.existsSync(src)) {
      console.warn('Skip (missing):', name);
      continue;
    }
    try {
      let svg = fs.readFileSync(src, 'utf8');
      svg = makeSvgWhite(svg);
      await sharp(Buffer.from(svg))
        .resize(SIZE, SIZE)
        .png()
        .toFile(dest);
      console.log('OK:', base + '.png');
    } catch (err) {
      console.error('Error', name, err.message);
    }
  }
}

convertAll();
