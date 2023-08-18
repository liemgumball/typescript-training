import { apiMethods } from "../constants/constants"

class ServiceBase {
    constructor() {}

    private request = async (
        path: string,
        method: apiMethods,
        data?: object | string
        ): Promise<any> => {
        const response = await fetch(path, {
            method: method,
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        return await response.json()
    }
    
    protected get = (path: string): object | [] => {
        return this.request(path, apiMethods.GET)
    }

    protected post = (path: string, data: any): object => {
        return this.request(path, apiMethods.POST, data)
    }

    protected put = (path: string, data: any): object => {
        return this.request(path, apiMethods.PUT, data)
    }

    protected patch = (path: string, data: any): object => {
        return this.request(path, apiMethods.PATCH, data)
    }

    protected delete = (path: string): object => {
        return this.request(path, apiMethods.DELETE)
    }
}

export default ServiceBase