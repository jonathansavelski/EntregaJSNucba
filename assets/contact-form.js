const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const subscribeForm = document.getElementById("subscribe-form");
const subscribeInput = document.getElementById("newsletter");

const isEmailValid = (input) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(input.value.trim());
};

const isEmpty = (input) => {
    return !input.value.trim().length;
};

const isBetween = (input, min, max) => {
    return input.value.length >= min && input.value.length < max;
};

const checkNameInput = (input) => {
    let valid = false;
    const minCharacters = 3;
    const maxCharacters = 25;

    if (isEmpty(input)) {
        showError(input, `This field is required`);
        return
    };

    if (!isBetween(input, minCharacters, maxCharacters)) {
        showError(
            input,
            `This field needs to be between ${minCharacters} y ${maxCharacters} characters`
        );
        return;
    };

    showSuccess(input);
    valid = true;
    return valid;

};

const checkEmail = (input) => {
    let valid = false;

    if (isEmpty(input)) {
        showError(input, 'This field is required');
        return;
    }
    if (!isEmailValid(input)) {
        showError(input, 'The email is invalid');
        return;
    }

    showSuccess(input);
    valid = true;
    return valid;
}

const checkMessageInput = (input) => {
    let valid = false;
    const minCharacters = 0;
    const maxCharacters = 200;

    if (isEmpty(input)) {
        showError(input, `This field is required`);
        return
    };

    if (!isBetween(input, minCharacters, maxCharacters)) {
        showError(
            input,
            `This field has a limit of ${maxCharacters} characters`
        );
        return;
    };

    showSuccess(input);
    valid = true;
    return valid;
};

const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove("success");
    formField.classList.add("error");
    const error = formField.querySelector("small");
    error.style.display = "block";
    error.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove("error");
    formField.classList.add("success");
    const error = formField.querySelector("small");
    error.textContent = "";
};


const validateForm = (e) => {
    e.preventDefault();

    let isNameValid = checkNameInput(nameInput);
    let isEmailValid = checkEmail(emailInput);
    let isMessageValid = checkNameInput(messageInput);

    let isValidForm =
        isNameValid &&
        isEmailValid &&
        isMessageValid;

    if (isValidForm) {
        setTimeout(() => {
            Swal.fire(
                'Form sent!',
                'We will contact you shortly',
                'success'
            )
            contactForm.reset();
        }, 500);

    }
}

const validateSubscribeForm = (e) => {
    e.preventDefault();

    let isSubscribeEmailValid = checkEmail(subscribeInput);

    if (isSubscribeEmailValid) {
        Swal.fire(
            'Thank you!',
            'You subscribed to our newsletter successfully',
            'success'
        )
        subscribeForm.reset();
    }
}

const initForm = () => {
    contactForm.addEventListener("submit", validateForm);
    // validar cada campo por evento
    nameInput.addEventListener("input", () => checkNameInput(nameInput));
    emailInput.addEventListener("input", () => checkEmail(emailInput));
    messageInput.addEventListener("input", () => checkMessageInput(messageInput));
    //Subscribe
    subscribeForm.addEventListener("submit", validateSubscribeForm);
    subscribeInput.addEventListener("input", () => checkEmail(subscribeInput));
};

initForm();