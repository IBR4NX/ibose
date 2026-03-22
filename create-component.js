#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const name = process.argv[2];
const args = process.argv.slice(2);
console.log(":- ",args)
if (!name) {
  console.log("❌ اكتب اسم الكمبوننت");
  process.exit(1);
}

const dir = path.join(process.cwd(), name);

// إنشاء الفولدر
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Component
const component = `type ${name}Props = {};

export default function ${name}(props: ${name}Props) {
  return (
    <div className="">
      ${name}
    </div>
  );
}
`;

// index
const index = `export { default } from './${name}';`;

// styles (اختياري Tailwind placeholder)
const style = `/* ${name} styles */`;

// files
fs.writeFileSync(path.join(dir, `${name}.tsx`), component);
fs.writeFileSync(path.join(dir, `index.ts`), index);
fs.writeFileSync(path.join(dir, `${name}.css`), style);

console.log(`✅ Component ${name} created`);
