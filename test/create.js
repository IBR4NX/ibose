#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// args
const args = process.argv.slice(2);
const name = args[0];

if (!name) {
  console.log("❌ Usage: cc <ComponentName> [--path=dir] [--no-css] [--no-test] [--no-story]");
  process.exit(1);
}

// options
const options = {
  path: ".",
  test: true,
  css: false,
  testHandle: false,
  story: false,
};

args.slice(1).forEach((arg) => {
  if (arg.startsWith("--p=")) {
    options.path = arg.split("=")[1];
  }
  if (arg === "--no-test") options.test = false;
  if (arg === "--testHandle") options.testHandle = true;
  if (arg === "--css") options.css = true;
  if (arg === "--story") options.story = true;
});

// paths
const baseDir = path.join(process.cwd(), options.path);
const dir = path.join(baseDir, name);

// create folder
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// files content

const component = `export default function ${name}() {
  return (
    <div className="${name}">
      ${name}
    </div>
  );
}
`;

const index = `export { default } from "./${name}";`;

const test = `import { render } from "@testing-library/react";
import ${name} from "./${name}";

describe("${name}", () => {
  it("renders", () => {
    render(<${name} />);
  });
});
`;

const css = `.${name} {
  
}
`;

const testHandle = `describe("${name}", () => {
  it("should work", () => {
    expect(true).toBe(true);
  });
});
`;

const story = `import type { Meta, StoryObj } from "@storybook/react";
import ${name} from "./${name}";

const meta: Meta<typeof ${name}> = {
  title: "Components/${name}",
  component: ${name},
};

export default meta;

type Story = StoryObj<typeof ${name}>;

export const Default: Story = {
  args: {},
};
`;

// create files
fs.writeFileSync(path.join(dir, `index.ts`), index);
fs.writeFileSync(path.join(dir, `${name}.ts`), component);

if (options.css) {
  fs.writeFileSync(path.join(dir, `${name}.css`), css);
}

if (options.testHandle) {
  fs.writeFileSync(
    path.join(dir, `${name}.test.handlebars`),
    testHandle
  );
}
if (options.test) {
  fs.writeFileSync(
    path.join(dir, `${name}.test.tsx`),
    test
  );
}

if (options.story) {
  fs.writeFileSync(
    path.join(dir, `${name}.stories.ts`),
    story
  );
}

console.log(`✅ ${name} created in ${options.path}`);
