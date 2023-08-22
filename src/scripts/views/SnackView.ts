import { MessageType } from '../constants/enums'
import { wait } from '../helpers/wait'
import { Template } from '../templates/template'

class SnackView {
  private _snackbar: HTMLElement

  constructor() {
    this._snackbar = document.querySelector('.snack-bar')! as HTMLElement
  }

  show = async (success: MessageType, message?: string): Promise<void> => {
    if (success)
      this._snackbar.innerHTML = Template.snack.getSuccessForm(message)
    else this._snackbar.innerHTML = Template.snack.getFailedForm(message)
    await wait(3000)
    this._snackbar.innerHTML = ''
  }
}
export default SnackView
