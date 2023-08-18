import { apiMethods } from '../constants/enums'

class ServiceBase {
    constructor() {}

    /**
     * request to server
     * @param path path of api endpoint
     * @param method method of request
     * @param body data to send
     * @returns promise of response
     */
    private request = async <T>(
        path: string,
        method: apiMethods,
        body?: T,
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

    protected get = <T>(path: string): Promise<T> => {
        return this.request(path, apiMethods.Get)
    }

    protected post = <T>(path: string, data: T): Promise<T> => {
        return this.request(path, apiMethods.Post, data)
    }

    protected put = <T>(path: string, data: T): Promise<T> => {
        return this.request(path, apiMethods.Put, data)
    }

    protected patch = <T>(path: string, data: T): Promise<T> => {
        return this.request(path, apiMethods.Patch, data)
    }

    protected delete = <T>(path: string): Promise<T> => {
        return this.request(path, apiMethods.Delete)
    }
}

export default ServiceBase
