import Controller from './controllers/controller';
import Model from './models/model';
import View from './views/view';

export class App {
  constructor() {}

  public start = () => {
    const controller = new Controller(new View(), new Model());

    controller.init();
  };
}
