import View from "../views/View";

class Controller {
    private view!: View

    constructor(view: View) {
        this.view = view
    }

    init = (): void => {
        try {
            this.initModal()
        } catch (error) {
            
        }
    }

    initModal = (): void => {
        this.view.modal.addAddSongListener()
    }
}

export default Controller