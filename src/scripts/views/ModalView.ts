class ModalView {

    private modal: HTMLElement
    private modalDialog: HTMLElement
    private modalClose: HTMLElement
    private addSongBtn: HTMLElement

    constructor() {
        this.modal = document.querySelector('.modal')! as HTMLElement
        this.modalDialog = document.querySelector('.modal__dialog')! as HTMLElement
        this.modalClose = document.querySelector('.modal__close')! as HTMLElement
        this.addSongBtn = document.querySelector('#add-song-btn')! as HTMLElement
    }

    /**
     * open the modal
     */
    open = (): void => {
        this.modal.classList.add('open')
    }

    /**
     * close the modal
     */
    close = (): void => {
        this.modal.classList.remove('open')
    }

    /**
     * adding the add song event listener
     */
    addAddSongListener = (): void => {
        this.addSongBtn.addEventListener('click', () => {
            this.open()
            this.modalClose.addEventListener('click', () => this.close())
        })
    }
}

export default ModalView