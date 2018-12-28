import { checkUser } from '../../../clientManager/loginManager';

const validate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'חובה להזין כתובת מייל'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'כתובת מייל לא חוקית'
    }

    if (!values.password) {
      errors.password = 'חובה להזין סיסמא'
    }

    if (!values.address) {
        errors.address = 'חובה להזין כתובת'
    }

    return errors
}
const asyncValidate = values => {
    return checkUser(values.email)
        .then(res => res.json())
        .then(res => {
            if (res) {
                throw { email: 'כתובת מייל קיימת כבר במערכת' }
            }
        })
}

export {
    validate,
    asyncValidate
}