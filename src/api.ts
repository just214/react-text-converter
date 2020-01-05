import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase
} from "change-case";

export default [
  {
    label: "camelCase",
    method: camelCase
  },
  {
    label: "Capital Case",
    method: capitalCase
  },
  {
    label: "CONSTANT_CASE",
    method: constantCase
  },
  {
    label: "dot.case",
    method: dotCase
  },
  {
    label: "Header-Case",
    method: headerCase
  },
  {
    label: "no case",
    method: noCase
  },
  {
    label: "param-case",
    method: paramCase
  },
  {
    label: "PascalCase",
    method: pascalCase
  },
  {
    label: "path/case",
    method: pathCase
  },
  {
    label: "Sentence case",
    method: sentenceCase
  },
  {
    label: "snake_case",
    method: snakeCase
  }
];
