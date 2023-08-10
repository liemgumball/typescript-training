import View from "../views/View";

class Controller {
    private view!: View

    constructor(view: View) {
        this.view = view
    }

    init = () => {
        try {
            this.initModal()
        } catch (error) {
            
        }
    }

    initModal = () => {
        this.view.modal.addAddSongListener()
    }
}

export default Controller