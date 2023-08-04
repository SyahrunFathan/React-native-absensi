import { showMessage } from "react-native-flash-message";

export const showError = (text) => {
    showMessage({
        message: text,
        icon: 'danger',
        type: 'danger'
    })
}

export const showSuccess = (text) => {
    showMessage({
        message: text,
        icon: 'success',
        type: 'success'
    })
}
