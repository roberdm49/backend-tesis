const { MIN_LENGTH, WITHOUT_SPACES, REQUIRE_FIELD, VALID_PASSWORD, VALID_EMAIL, VALID_REPEAT_PASSWORD } = require('./errorsMessages')
const minLength = require('../validations/minLength')
const withoutSpaces = require('../validations/withoutSpaces')
const requireField = require('../validations/requireField')
const {
  USERNAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  NAME_MIN_LENGTH,
  LASTNAME_MIN_LENGTH,
  VALID_ROLE
} = require('../constants/constants')
const { validPassword, validEmail, validRepeatPassword, validRole } = require('../validations/validationFields')

const usernameRules = [
  { rule: requireField, error: REQUIRE_FIELD('username') },
  { rule: withoutSpaces, error: WITHOUT_SPACES('username') },
  { rule: minLength(USERNAME_MIN_LENGTH), error: MIN_LENGTH('username', USERNAME_MIN_LENGTH) }
]

const passwordRules = [
  { rule: requireField, error: REQUIRE_FIELD('password') },
  { rule: minLength(PASSWORD_MIN_LENGTH), error: MIN_LENGTH('password', PASSWORD_MIN_LENGTH) },
  { rule: validPassword, error: VALID_PASSWORD }
]

const nameRules = [
  { rule: requireField, error: REQUIRE_FIELD('name') },
  { rule: minLength(NAME_MIN_LENGTH), error: MIN_LENGTH('name', NAME_MIN_LENGTH) }
]

const lastnameRules = [
  { rule: requireField, error: REQUIRE_FIELD('lastname') },
  { rule: minLength(LASTNAME_MIN_LENGTH), error: MIN_LENGTH('lastname', LASTNAME_MIN_LENGTH) }
]

const emailRules = [
  { rule: requireField, error: REQUIRE_FIELD('email') },
  { rule: validEmail, error: VALID_EMAIL }
]

const roleRules = [
  { rule: requireField, error: REQUIRE_FIELD('role') },
  { rule: validRole, error: VALID_ROLE }
]

const repeatPasswordRules = [
  { rule: requireField, error: REQUIRE_FIELD('repeatPassword') },
  { rule: validRepeatPassword, error: VALID_REPEAT_PASSWORD }
]

const avatarRules = []

module.exports = {
  usernameRules,
  passwordRules,
  nameRules,
  lastnameRules,
  emailRules,
  roleRules,
  avatarRules,
  repeatPasswordRules
}
