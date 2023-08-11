import { apiMethods } from "../constants/constants"

class ServiceBase {
    constructor() {}

    private request = async <T>(
        path: string,
        method: apiMethods,
        body?: T
        ): Promise<T> => {
        const response = await fetch(path, {
            method: method,
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        return await response.json()
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