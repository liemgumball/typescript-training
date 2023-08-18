import { MESSAGE } from '../constants/constants'
import { MESSAGE_TYPE } from '../constants/enums'
import { wait } from '../helpers/util'
import { Template } from '../templates/Template'

class SnackView {
    private _snackbar: HTMLElement

    constructor() {
        this._snackbar = document.querySelector('.snack-bar')! as HTMLElement
    }

    show = async (
        success: MESSAGE_TYPE,
        message?: string,
        reload?: boolean,
    ): Promise<void> => {
        if (success)
            this._snackbar.innerHTML = Template.snack.getSuccessForm(message)
        else this._snackbar.innerHTML = Template.snack.getFailedForm(message)
        await wait(1500)

        if (reload) {
            if (confirm(MESSAGE.PROCESS_FAILED)) location.reload()
        }
        await wait(1500)
        this._snackbar.innerHTML = ''
    }
}
export default SnackView
