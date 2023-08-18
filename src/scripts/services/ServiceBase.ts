import { apiMethods } from '../constants/constants'

class ServiceBase {
    constructor() {}

    private request = async <T>(
        path: string,
        method: apiMethods, // You need to define or import the `apiMethods` type
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
        return this.request(path, apiMethods.GET)
    }

    protected post = <T>(path: string, data: T): Promise<T> => {
        return this.request(path, apiMethods.POST, data)
    }

    protected put = <T>(path: string, data: T): Promise<T> => {
        return this.request(path, apiMethods.PUT, data)
    }

    protected patch = <T>(path: string, data: T): Promise<T> => {
        return this.request(path, apiMethods.PATCH, data)
    }

    protected delete = <T>(path: string): Promise<T> => {
        return this.request(path, apiMethods.DELETE)
    }
}

export default ServiceBase
