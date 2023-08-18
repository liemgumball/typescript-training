import Controller from "./controllers/Controller"
import Model from "./models/Model"
import View from "./views/View"

export class App {
    constructor(){}

    public start = () => {
        const controller = new Controller(new View, new Model)

        controller.init()
    }
}