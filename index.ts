#!/usr/bin/env node
/*
 * @Author: jasper
 * @Date: 2022-07-08 15:48:40
 * @LastEditors: jasper
 * @LastEditTime: 2022-07-13 20:18:25
 * @FilePath: /create-dc/index.ts
 * @Description:
 *
 * Copyright (c) 2022 by 公卫区位大数据前端组, All Rights Reserved.
 */
import * as fs from "fs";
import * as path from "path";

import { cwd } from "process";
import minimist from "minimist";
import prompts from "prompts";
import { red, green, bold } from "kolorist";
import renderTemplate from "./utils/renderTemplate";

import { postOrderDirectoryTraverse, preOrderDirectoryTraverse } from "./utils/directoryTraverse";
import generateReadme from "./utils/generateReadme";
import getCommand from "./utils/getCommand";

import banner from "./utils/banner";
function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName);
}

function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z0-9-~]+/g, "-");
}

function canSafelyOverwrite(dir) {
  return !fs.existsSync(dir) || fs.readdirSync(dir).length === 0;
}

// 清空目录和文件

function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  postOrderDirectoryTraverse(
    dir,
    (dir) => fs.rmdirSync(dir),
    (file) => fs.unlinkSync(file)
  );
}

// 入口方法

async function init() {
  console.log(`\n${banner}\n`);
  const cwd = process.cwd();
  // console.log(`current working directory: ${cwd}`);
  // possible options:
  // --default
  // --typescript / --ts
  // --jsx
  // --router / --vue-router
  // --pinia
  // --with-tests / --tests (equals to `--vitest --cypress`)
  // --vitest
  // --cypress
  // --eslint
  // --eslint-with-prettier (only support prettier through eslint for simplicity)
  // --force (for force overwriting)
  const argv = minimist(process.argv.slice(2), {
    alias: { gateWay: ["gw", "needGw"] },
    // all arguments are treated as booleans
    boolean: true,
  });
  // console.log(`arguments: ${JSON.stringify(argv, null, 2)}`);
  // if any of the feature flags is set, we would skip the feature prompts
  const isFeatureFlagsUsed = typeof (argv.default ?? argv.gw) === "boolean";
  // 可在启动命令行中带上 项目名参数
  let targetDir = argv._[0];
  const defaultProjectName = !targetDir ? "vue-project" : targetDir;
  const forceOverwrite = argv.force;
  let result: {
    projectName?: string; // 项目名
    shouldOverwrite?: boolean; // 是否覆盖
    packageName?: string; // 包名
    needGw?: boolean; // 是否需要对接管理平台
  } = {};
  try {
    // Prompts:
    // - Project name:
    //   - whether to overwrite the existing directory or not?
    //   - enter a valid package name for package.json

    result = await prompts(
      [
        {
          name: "projectName",
          type: targetDir ? null : "text",
          message: "项目名(Project name):",
          initial: defaultProjectName,
          onState: (state) => (targetDir = String(state.value).trim() || defaultProjectName),
        },
        {
          name: "shouldOverwrite",
          type: () => (canSafelyOverwrite(targetDir) || forceOverwrite ? null : "confirm"),
          message: () => {
            const dirForPrompt = targetDir === "." ? "当前目录" : `目标目录 "${targetDir}"`;

            return `${dirForPrompt} 非空。是否清空目录文件并继续？`;
          },
        },
        {
          name: "overwriteChecker",
          type: (prev, values) => {
            if (values.shouldOverwrite === false) {
              throw new Error(red("✖") + " 操作已取消");
            }
            return null;
          },
        },
        {
          name: "packageName",
          type: () => (isValidPackageName(targetDir) ? null : "text"),
          message: "Package name:",
          initial: () => toValidPackageName(targetDir),
          validate: (dir) => isValidPackageName(dir) || "Invalid package.json name",
        },

        {
          name: "needGw",
          type: () => (isFeatureFlagsUsed ? null : "toggle"),
          message: "是否需要对接管理平台?",
          initial: true,
          active: "Yes",
          inactive: "No",
        },
        // {
        //   name: "needsVitest",
        //   type: () => (isFeatureFlagsUsed ? null : "toggle"),
        //   message: "Add Vitest for Unit Testing?",
        //   initial: false,
        //   active: "Yes",
        //   inactive: "No",
        // },
        // {
        //   name: "needsCypress",
        //   type: () => (isFeatureFlagsUsed ? null : "toggle"),
        //   message: (prev, answers) =>
        //     answers.needsVitest
        //       ? "Add Cypress for End-to-End testing?"
        //       : "Add Cypress for both Unit and End-to-End testing?",
        //   initial: false,
        //   active: "Yes",
        //   inactive: "No",
        // },
      ],
      {
        onCancel: () => {
          throw new Error(red("✖") + " Operation cancelled");
        },
      }
    );
  } catch (cancelled) {
    console.log(cancelled.message);
    process.exit(1);
  }

  //  当 prompt type 值为 null 时，‘initial’属性不会生效，即 result 对象中没有此属性
  // 所以还得赋默认值
  const {
    projectName,
    packageName = projectName ?? defaultProjectName,
    shouldOverwrite = argv.force,
    needGw = argv.gw,
  } = result;

  const root = path.join(cwd, targetDir);
  // 项目目录的创建逻辑
  if (fs.existsSync(root) && shouldOverwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  console.log(`\n项目初始化在 ${root}...`);
  // 写入 package.json
  const pkg = { name: packageName, version: "0.0.0" };
  fs.writeFileSync(path.resolve(root, "package.json"), JSON.stringify(pkg, null, 2));
  // todo:
  // work around the esbuild issue that `import.meta.url` cannot be correctly transpiled
  // when bundling for node and the format is cjs
  // const templateRoot = new URL('./template', import.meta.url).pathname
  const templateRoot = path.resolve(__dirname, "template");
  const render = function render(templateName) {
    const templateDir = path.resolve(templateRoot, templateName);
    renderTemplate(templateDir, root);
  };

  // Render base template
  render("base");
  // Add configs.
  if (needGw) {
    render("config/needGw");
    // 修改 config 文件 domainSign 属性
    let configTemplate: string = fs.readFileSync(path.resolve(root, "src/config/index.ts"), "utf8");
    configTemplate = configTemplate.replace(/domainSign: ".*"/, `domainSign: "${packageName}"`);
    fs.writeFileSync(path.resolve(root, "src/config/index.ts"), configTemplate);
  }
  // Instructions:
  // Supported package managers: pnpm > yarn > npm
  // Note: until <https://github.com/pnpm/pnpm/issues/3505> is resolved,
  // it is not possible to tell if the command is called by `pnpm init`.
  const userAgent = process.env.npm_config_user_agent ?? "";
  const packageManager = /pnpm/.test(userAgent) ? "pnpm" : /yarn/.test(userAgent) ? "yarn" : "npm";

  // README generation
  fs.writeFileSync(
    path.resolve(root, "README.md"),
    generateReadme({
      projectName: result.projectName ?? defaultProjectName,
      packageManager,
    })
  );

  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(`  ${bold(green(`cd ${path.relative(cwd, root)}`))}`);
  }
  console.log(`  ${bold(green(getCommand(packageManager, "install")))}`);
  console.log(`  ${bold(green(getCommand(packageManager, "lint")))}`);
  console.log(`  ${bold(green(getCommand(packageManager, "dev")))}`);
  console.log();
}

init().catch((e) => {
  console.error(e);
});
