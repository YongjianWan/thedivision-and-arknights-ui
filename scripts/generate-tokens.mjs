import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const tokensPath = path.join(root, 'tokens.json');
const outputPath = path.join(root, 'src', 'app', 'tokens.css');

const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

const lines = [];
lines.push('/* Generated from tokens.json. Do not edit by hand. */');
lines.push(':root {');

const add = (name, value) => {
  lines.push(`  --${name}: ${value};`);
};

const addGroup = (prefix, obj) => {
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      addGroup(`${prefix}-${key}`, value);
      return;
    }
    add(`${prefix}-${key}`, value);
  });
};

if (tokens.color?.bg) addGroup('bg', tokens.color.bg);
if (tokens.color?.text) addGroup('text', tokens.color.text);
if (tokens.color?.border) addGroup('border', tokens.color.border);
if (tokens.color?.invert) addGroup('invert', tokens.color.invert);
if (tokens.color?.accent) add('accent', tokens.color.accent);
if (tokens.color?.accentHover) add('accent-hover', tokens.color.accentHover);
if (tokens.color?.accentAlt) add('accent-alt', tokens.color.accentAlt);
if (tokens.color?.accentAltHover) add('accent-alt-hover', tokens.color.accentAltHover);
if (tokens.color?.danger) add('danger', tokens.color.danger);
if (tokens.color?.dangerMuted) add('danger-muted', tokens.color.dangerMuted);
if (tokens.color?.success) add('success', tokens.color.success);
if (tokens.color?.successMuted) add('success-muted', tokens.color.successMuted);
if (tokens.color?.warning) add('warning', tokens.color.warning);
if (tokens.color?.warningMuted) add('warning-muted', tokens.color.warningMuted);

if (tokens.spacing) addGroup('space', tokens.spacing);
if (tokens.border?.width) addGroup('border', tokens.border.width);
if (tokens.border?.radius) addGroup('radius', tokens.border.radius);
if (tokens.typography?.fontFamily) addGroup('font', tokens.typography.fontFamily);
if (tokens.typography?.fontSize) addGroup('font-size', tokens.typography.fontSize);
if (tokens.typography?.lineHeight) addGroup('line-height', tokens.typography.lineHeight);
if (tokens.transition) addGroup('transition', tokens.transition);

lines.push('}');
lines.push('');

fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');
console.log(`Wrote ${path.relative(root, outputPath)}`);
