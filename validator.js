function Validator(option) {

    function validate (inputElement, rule) {
        var errorMessage = rule.test(inputElement.value)
        var errorElement = inputElement.parentElement.querySelector(option.errorSelector)
        var imgErrorElement = inputElement.parentElement.querySelector(option.imgError)
        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
            imgErrorElement.classList.remove('remove')
            imgErrorElement.classList.add('display')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
            imgErrorElement.classList.add('remove')
            imgErrorElement.classList.remove('display')
        }
    }

    var formElement = document.querySelector(option.form)
    if (formElement) {
        option.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector)
           
            if (inputElement) {
                // Process onblur
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }
                // Proces email
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(option.errorSelector)
                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}

Validator.isRequired = function (selector, inputName) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : `${inputName} cannot be empty`
        }
    }
}

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : "Look like this is not an email"
        }
    }
}