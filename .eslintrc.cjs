// eslint-disable-next-line @typescript-eslint/no-require-imports
const prettier = require("./.prettierrc.cjs");

/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  // 플러그인 문서
  // https://typescript-eslint.io/
  // https://www.npmjs.com/package/eslint-plugin-unused-imports
  // https://www.npmjs.com/package/eslint-config-prettier
  // https://www.npmjs.com/package/eslint-plugin-tailwindcss
  extends: [
    "plugin:react/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
    "eslint-config-prettier",
    "prettier",
  ],
  plugins: [
    "prettier",
    "import",
    "react",
    "tailwindcss",
    "@typescript-eslint",
    "unused-imports",
  ],
  parser: "@typescript-eslint/parser",
  settings: {
    react: {
      version: "18.3.1",
    },
    tailwindcss: {
      // Tailwind를 사용하는 className override 함수를 지정합니다.
      callees: ["cn"],
      config: "tailwind.config.js",
    },
    // typescript, node 모듈 설정
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "prettier/prettier": ["error", prettier],

    // import React from 'react'; 를 사용하지 않아도 되도록 설정
    "react/react-in-jsx-scope": 0,
    // children이 없는 경우 self-closing 태그로 설정
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    // DOM에 정의되지 않은 속성 사용 체크
    "react/no-unknown-property": [
      "error",
      {
        ignore: ["css"],
      },
    ],
    // JSX가 여러줄로 이루어진 경우, 괄호로 감싸도록 설정
    "react/jsx-wrap-multilines": [
      "error",
      {
        declaration: "parens-new-line",
        assignment: "parens-new-line",
        return: "parens-new-line",
        arrow: "parens-new-line",
        condition: "parens-new-line",
        logical: "parens-new-line",
        prop: "ignore", // prettier와 충돌이 있어서 ignore로 설정 @see https://stackoverflow.com/questions/65999095/delete-eslint-prettier-prettier
      },
    ],
    // 정의되지 않은 prop 사용 체크 ( 기본적으로 typescript에서 체크하므로 off )
    "react/prop-types": "off", // https://github.com/shadcn-ui/ui/issues/120

    // console.warn, console.error만 허용
    "no-console": [
      "error",
      {
        allow: ["warn", "error"],
      },
    ],

    // Tailwind 사용시 커스텀 클래스명 사용 체크
    "tailwindcss/no-custom-classname": "off",

    // 사용하지 않는 import 제거
    "unused-imports/no-unused-imports": "error",

    // import 순서 정렬
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
        ], // 그룹핑 순서
        "newlines-between": "always", // 그룹 사이에 빈 줄 추가 여부
      },
    ],

    // 사용하지 않는 변수 체크
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "_.*",
        argsIgnorePattern: "_.*",
        args: "none",
      },
    ],

    // Typescript any 타입 허용
    "@typescript-eslint/no-explicit-any": "off",
    // Typescript @ts-comment 허용
    "@typescript-eslint/ban-ts-comment": "off",
    // require 허용
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/no-var-requires": "off",

    // nextjs Image 컴포넌트 강제 사용 off
    "@next/next/no-img-element": "off",
  },
};
