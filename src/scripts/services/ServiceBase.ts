import { ApiMethods } from '../constants/enums'

class ServiceBase<T> {
  public _path: string
  constructor(path: string) {
    this._path = path
  }

  /**
   * request to server
   * @param path path of api endpoint
   * @param method method of request
   * @param body data to send
   * @returns promise of response
   */
  private request = async <T>(
    path: string,
    method: ApiMethods,
    body?: T
  ): Promise<T> => {
    try {
      const response = await fetch(path, {
        method,
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      return await response.json()
    } catch (err) {
      console.error('An error occurred in request:', err)
      throw err
    }
  }

  /**
   * get request
   * @param endpoint endpoint of url request
   * @returns data or list of data response from server
   */
  get = <T>(endpoint?: string): Promise<T> => {
    return this.request(
      `${this._path}/${endpoint ? endpoint : ''}`,
      ApiMethods.Get
    )
  }

  /**
   * post request
   * @param data data to send
   * @returns data response from server
   */
  post = <T>(data: T): Promise<T> => {
    return this.request(this._path, ApiMethods.Post, data)
  }

  /**
   * put request
   * @param endpoint endpoint of url request
   * @param data data to send
   * @returns data response from server
   */
  put = <T>(endpoint: string, data: T): Promise<T> => {
    return this.request(`${this._path}/${endpoint}`, ApiMethods.Put, data)
  }

  /**
   * patch request
   * @param endpoint endpoint of url request
   * @param data data to send
   * @returns data response from server
   */
  patch = <T>(endpoint: string, data: T): Promise<T> => {
    return this.request(`${this._path}/${endpoint}`, ApiMethods.Patch, data)
  }

  /**
   * delete request
   * @param endpoint endpoint of url request
   * @returns status respone of request
   */
  delete = <T>(endpoint: string): Promise<T> => {
    return this.request(`${this._path}/${endpoint}`, ApiMethods.Delete)
  }
}

export default ServiceBase
