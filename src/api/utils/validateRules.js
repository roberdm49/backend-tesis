const thereIsAnErrorInTheRules = (value, rules, extraValue = null) => {
  for (const elem of rules) {
    const { rule, error } = elem
    const theRuleIsFulfilled = rule(value, extraValue)
    if (!theRuleIsFulfilled) {
      return error
    }
  }

  return null
}

module.exports = { thereIsAnErrorInTheRules }
