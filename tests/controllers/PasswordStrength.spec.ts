import { PasswordStrengthController } from 'controllers/PasswordStrengthController';

// This line won't be needed any more when 'be-nj-foundation-mocks' is imported
jest.mock('be-nj-foundation');

jest.mock('zxcvbn');
const zxcvbn = require('zxcvbn');
zxcvbn.mockReturnValue({score: 2});

describe('Password Strength', () => {
  let controller: PasswordStrengthController;

  beforeEach(() => {
    controller = new PasswordStrengthController();
    // Test the tests: do not allow empty tests and tests that do not assert anything
    expect.hasAssertions();
  });

  it('calls through to zxcvbn', () => {
    //given a call to zxcvbn
    const outcome: string = controller.zxcvbn('justin');

    // expect zxcvbn package to be called with password
    expect(zxcvbn).toBeCalledWith('justin');
  });

  it('calls through to zxcvbn score', () => {
    //given a call to zxcvbn
    const outcome: string = controller.zxcvbnScore('justin');

    // expect zxcvbn package to be called with password
    expect(zxcvbn).toBeCalledWith('justin');
  });

});
