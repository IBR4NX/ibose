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

// Component (Next.js + Client + forwardRef + props)
const component = `"use client";

import { forwardRef } from "react";

type ${name}Props = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

const ${name} = forwardRef<HTMLDivElement, ${name}Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={\`\${className ?? ""}\`}
        {...props}
      >
        {children ?? "${name}"}
      </div>
    );
  }
);

${name}.displayName = "${name}";

export default ${name};
`;

// index
const index = `export { default } from "./${name}";`;

// optional hook
const hook = `export function use${name}() {
  return {};
}
`;

// test file
const test = `import { render } from "@testing-library/react";
import ${name} from "./${name}";

describe("${name}", () => {
  it("renders", () => {
    render(<${name} />);
  });
});
`;

// files
fs.writeFileSync(path.join(dir, `${name}.tsx`), component);
fs.writeFileSync(path.join(dir, `index.ts`), index);
fs.writeFileSync(path.join(dir, `use${name}.ts`), hook);
fs.writeFileSync(path.join(dir, `${name}.test.tsx`), test);

console.log(`✅ ${name} created (Next.js ready)`);
