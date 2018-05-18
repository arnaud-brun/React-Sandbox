/**
 * Authentication middleware
 */
const crypto = require('crypto');
const auth = require('express')();
const validator = require('validator'); // https://www.npmjs.com/package/validator

const SALT = 'SUPER_SECRET_SALT';

function encrypt(key, data) {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let crypted = cipher.update(data, 'utf-8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(key, data) {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(data, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

function hashPassword(pwd) {
  // Encrypt password with salt and crypto methods
  return encrypt(pwd, SALT);
}

const users = [{
    email: 'alice@sfr.fr',
    username: 'alice',
    password: hashPassword('alicealice'),
  }, {
    email: 'bob@sfr.fr',
    username: 'bob',
    password: hashPassword('bobbobbob'),
  }, {
    email: 'charly@sfr.fr',
    username: 'charly',
    password: hashPassword('charlycharly'),
  }, {
    email: 'daryl@sfr.fr',
    username: 'daryl',
    password: hashPassword('daryldaryl'),
  }
];

function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your name.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  return {
    success: isFormValid,
    errors
  };
}

function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your name.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  return {
    success: isFormValid,
    errors
  };
}

function createUser(payload) {
  // Payload is correct and contains email - username - password
  const errors = {};
  let isCreationValid = true;

  // Check for already used email
  if (users.filter(user => user.email == payload.email).length != 0) {
    isCreationValid = false;
    errors.email = 'Email already in use';
  }

  // Check for available username
  if (users.filter(user => user.username == payload.username).length != 0) {
    isCreationValid = false;
    errors.username = 'Username already in use';
  }

  // Save object in db if possible
  if (isCreationValid) {
    users.push({
      email: payload.email,
      username: payload.username,
      password: hashPassword(payload.password),
    });
  }

  return {
    success: isCreationValid,
    errors
  };
}


function getUser(payload) {
  // Payload is correct and contains username - password
  const errors = {};
  let isGetValid = true;
  const user = users.filter(user => user.username == payload.username);

  if (user.length != 1) {
    isGetValid = false;
    errors.username = 'There was an error on username or password';
    errors.password = 'There was an error on username or password';
  }
  else {
    const retrievedUser = user[0];
    if (retrievedUser.password !== hashPassword(payload.password)) {
      isGetValid = false;
      errors.username = 'There was an error on username or password';
      errors.password = 'There was an error on username or password';
    }
  }

  return {
    success: isGetValid,
    errors
  };
}



auth.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      errors: validationResult.errors
    });
  }

  const validationGetResult = getUser(req.body);
  if (!validationGetResult.success) {
    return res.status(400).json({
      success: false,
      errors: validationGetResult.errors
    });
  }
  return res.status(200).end();
});

auth.post('/signup', (req, res, next) => {
  const validationFormResult = validateSignupForm(req.body);
  if (!validationFormResult.success) {
    return res.status(400).json({
      success: false,
      errors: validationFormResult.errors
    });
  }

  const validationDBResult = createUser(req.body);
  if (!validationDBResult.success) {
    return res.status(400).json({
      success: false,
      errors: validationFormResult.errors
    });
  }
  return res.status(200).end();
});

module.exports = auth;
