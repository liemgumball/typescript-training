import Controller from "./controllers/Controller"
import View from "./views/View"

export class App {
    constructor(){}

    public start = () => {
        const controller = new Controller(new View)

        controller.init()
    }
}