/*
 * @Author: jasper
 * @Date: 2022-07-13 20:17:30
 * @LastEditors: jasper
 * @LastEditTime: 2022-07-13 20:20:37
 * @FilePath: /create-dc/utils/generateReadme.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import getCommand from "./getCommand";

const sfcTypeSupportDoc = [
  "",
  "## Type Support for `.vue` Imports in TS",
  "",
  "TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.",
  "",
  "If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:",
  "",
  "1. Disable the built-in TypeScript Extension",
  "    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette",
  "    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`",
  "2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.",
  "",
].join("\n");

export default function generateReadme({ projectName, packageManager }) {
  let readme = `# ${projectName}

在此写上几句简单的项目描述。

## 项目相关资源

- [接口文档]()
- [原型]()
- [门户地址]()

## 技术组成

vue3 + typescript + vue-tsc + volar + vue-router + pinia

## 依赖说明

  - 为项目中所涉及的重要依赖做些说明

## 推荐的 IDE 配置（已加入 .vscode）

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
${sfcTypeSupportDoc}
## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

`;

  let npmScriptsDescriptions = `\`\`\`sh
${getCommand(packageManager, "install")}
\`\`\`

### Compile and Hot-Reload for Development

\`\`\`sh
${getCommand(packageManager, "dev")}
\`\`\`

### Type-Check, Compile and Minify for Production

\`\`\`sh
${getCommand(packageManager, "build")}
\`\`\`
`;

  npmScriptsDescriptions += `
### Run Unit Tests with [Vitest](https://vitest.dev/)

\`\`\`sh
${getCommand(packageManager, "test:unit")}
\`\`\`
`;

  npmScriptsDescriptions += `
### Run Headed Component Tests with [Cypress Component Testing](https://on.cypress.io/component)

\`\`\`sh
${getCommand(packageManager, "test:unit")} # or \`${getCommand(
    packageManager,
    "test:unit:ci"
  )}\` for headless testing
\`\`\`
`;

  npmScriptsDescriptions += `
### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

\`\`\`sh
${getCommand(packageManager, "build")}
${getCommand(packageManager, "test:e2e")} # or \`${getCommand(
    packageManager,
    "test:e2e:ci"
  )}\` for headless testing
\`\`\`
`;

  npmScriptsDescriptions += `
### Lint with [ESLint](https://eslint.org/)

\`\`\`sh
${getCommand(packageManager, "lint")}
\`\`\`
`;

  readme += npmScriptsDescriptions;

  return readme;
}
