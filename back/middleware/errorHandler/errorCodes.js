const errorCodes = {
  invalidInput: {
    message: 'Invalid input - must be atleast 5 characters',
    code: 400,
  },
  userExists: { message: 'User Already Exists', code: 409 },
  nameRequired: { message: 'Login name required', code: 400 },
};

module.exports = errorCodes;
