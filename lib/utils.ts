const combineQueries = (variants: string[], methods: string[]) => {
  const combinedQueries: string[] = [];
  variants.forEach(variant => {
    const variantPrefix = variant.replace('By', '');
    methods.forEach(method => {
      combinedQueries.push(`${variantPrefix}${method}`);
    });
  });

  return combinedQueries;
};

const getDocsUrl = (ruleName: string): string =>
  `https://github.com/testing-library/eslint-plugin-testing-library/tree/main/docs/rules/${ruleName}.md`;

const LIBRARY_MODULES = [
  '@testing-library/dom',
  '@testing-library/angular',
  '@testing-library/react',
  '@testing-library/preact',
  '@testing-library/vue',
  '@testing-library/svelte',
];

const SYNC_QUERIES_VARIANTS = ['getBy', 'getAllBy', 'queryBy', 'queryAllBy'];
const ASYNC_QUERIES_VARIANTS = ['findBy', 'findAllBy'];
const ALL_QUERIES_VARIANTS = [
  ...SYNC_QUERIES_VARIANTS,
  ...ASYNC_QUERIES_VARIANTS,
];

const ALL_QUERIES_METHODS = [
  'ByLabelText',
  'ByPlaceholderText',
  'ByText',
  'ByAltText',
  'ByTitle',
  'ByDisplayValue',
  'ByRole',
  'ByTestId',
];

const SYNC_QUERIES_COMBINATIONS = combineQueries(
  SYNC_QUERIES_VARIANTS,
  ALL_QUERIES_METHODS
);

const ASYNC_QUERIES_COMBINATIONS = combineQueries(
  ASYNC_QUERIES_VARIANTS,
  ALL_QUERIES_METHODS
);

const ALL_QUERIES_COMBINATIONS = [
  ...SYNC_QUERIES_COMBINATIONS,
  ...ASYNC_QUERIES_COMBINATIONS,
];

const ASYNC_UTILS = [
  'waitFor',
  'waitForElementToBeRemoved',
  'wait',
  'waitForElement',
  'waitForDomChange',
];

const SYNC_EVENTS = [
  'fireEvent',
  'userEvent',
];

const TESTING_FRAMEWORK_SETUP_HOOKS = ['beforeEach', 'beforeAll'];

const PRESENCE_MATCHERS = ['toBeInTheDocument', 'toBeTruthy', 'toBeDefined'];
const ABSENCE_MATCHERS = ['toBeNull', 'toBeFalsy'];

export {
  getDocsUrl,
  SYNC_QUERIES_VARIANTS,
  ASYNC_QUERIES_VARIANTS,
  ALL_QUERIES_VARIANTS,
  ALL_QUERIES_METHODS,
  SYNC_QUERIES_COMBINATIONS,
  ASYNC_QUERIES_COMBINATIONS,
  ALL_QUERIES_COMBINATIONS,
  ASYNC_UTILS,
  SYNC_EVENTS,
  TESTING_FRAMEWORK_SETUP_HOOKS,
  LIBRARY_MODULES,
  PRESENCE_MATCHERS,
  ABSENCE_MATCHERS
};
