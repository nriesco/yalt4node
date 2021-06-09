/**
  * @function addNumbers
  *
  * @description example function to add to numbers
  *
  * @example addNumbers(1, 2) //-> 3
  * @example addNumbers(2, 18) //-> 20
  *
  * @param {Number} firstNumber the first number to add
  * @param {Number} secondNumber the second number to add
  *
  * @returns {Number} the result
  *
  * @testcase two valid integers
  *
@flowstart
start=>start: START
end=>end: END
init=>operation: foo = null
someCondition=>condition: Some question
someOperation=>operation: foo = 'var'
start->init->someCondition
someCondition(yes)->someOperation->end
someCondition(no)->end
@flowend
  */
const addNumbers = (firstNumber = 0, secondNumber = 0) => {
  return firstNumber + secondNumber
}

/**
  * @function addNumbers2
  *
  * @description example function to add to numbers
  *
  * @example addNumbers(1, 2) //-> 3
  * @example addNumbers(2, 18) //-> 20
  *
  * @param {Number} firstNumber the first number to add
  * @param {Number} secondNumber the second number to add
  *
  * @returns {Number} the result
  *
  * @testcase two valid integers
  *
@flowstart
start=>start: START
end=>end: END
init=>operation: foo = null
someCondition=>condition: Some question
someOperation=>operation: foo = 'var'
start->init->someCondition
someCondition(yes)->someOperation->end
someCondition(no)->end
@flowend
  */
const addNumbers2 = (firstNumber = 0, secondNumber = 0) => {
  return firstNumber + secondNumber
}

module.exports = {
  addNumbers,
  addNumbers2
}
