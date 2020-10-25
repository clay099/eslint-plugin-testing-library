import { createRuleTester } from './lib/test-utils';
import rule, { RULE_NAME } from './fake-rule';

const ruleTester = createRuleTester({
  ecmaFeatures: {
    jsx: true,
  },
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: `
      // case: nothing related to Testing Library at all
      import { shallow } from 'enzyme';
      
      const wrapper = shallow(<MyComponent />);
      `,
    },
    {
      code: `
      // case: render imported from other than custom module
      import { render } from '@somewhere/else'
      
      const utils = render();
      `,
      settings: {
        'testing-library/module': 'test-utils',
      },
    },
    {
      code: `
      // case: prevent import which should trigger an error since it's imported
      // from other than custom module
      import { foo } from 'report-me'
      `,
      settings: {
        'testing-library/module': 'test-utils',
      },
    },
  ],
  invalid: [
    {
      code: `
      // case: import module forced to be reported
      import { foo } from 'report-me'
    `,
      errors: [{ line: 3, column: 7, messageId: 'fakeError' }],
    },
    {
      code: `
      // case: render imported from any module by default (aggressive reporting)
      import { render } from '@somewhere/else'
      import { somethingElse } from 'another-module'
      
      const utils = render();
      `,
      errors: [
        {
          line: 6,
          column: 21,
          messageId: 'fakeError',
        },
      ],
    },
    {
      code: `
      // case: render imported from Testing Library module
      import { render } from '@testing-library/react'
      import { somethingElse } from 'another-module'
      
      const utils = render();
      `,
      errors: [
        {
          line: 6,
          column: 21,
          messageId: 'fakeError',
        },
      ],
    },
    {
      code: `
      // case: render imported from config custom module
      import { render } from 'test-utils'
      import { somethingElse } from 'another-module'
      
      const utils = render();
      `,
      settings: {
        'testing-library/module': 'test-utils',
      },
      errors: [
        {
          line: 6,
          column: 21,
          messageId: 'fakeError',
        },
      ],
    },
    {
      code: `
      // case: render imported from Testing Library module if
      // custom module setup
      import { render } from '@testing-library/react'
      import { somethingElse } from 'another-module'
      
      const utils = render();
      `,
      settings: {
        'testing-library/module': 'test-utils',
      },
      errors: [
        {
          line: 7,
          column: 21,
          messageId: 'fakeError',
        },
      ],
    },
  ],
});