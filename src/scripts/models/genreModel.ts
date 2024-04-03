import { generateId } from '../helpers/songHelper'

export interface IGenre {
  readonly id?: string
  name: string
}

class GenreModel implements IGenre {
  public id: string
  public name: string

  constructor(genre: IGenre) {
    this.id = genre.id || generateId()
    this.name = genre.name
  }
}

export default GenreModel
