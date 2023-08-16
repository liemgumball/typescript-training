import { SNACKBAR_TYPE } from '../constants/enums'
import { wait } from '../helpers/util'
import { Template } from '../templates/Template'

class SnackView {
    private _snackbar: HTMLElement

    constructor() {
        this._snackbar = document.querySelector('.snack-bar')! as HTMLElement
    }

    async render(success: SNACKBAR_TYPE, message?: string) {
        if (success)
            this._snackbar.innerHTML = Template.snack.getSuccessForm(message)
        else this._snackbar.innerHTML = Template.snack.getFailedForm(message)
        await wait(3000)
        this._snackbar.innerHTML = ''
    }
}
export default SnackView
