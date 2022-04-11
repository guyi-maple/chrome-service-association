import {request} from "../utils/request";
import {Service} from "../types";
import auto from "../utils/auto";

const Services = {
    get: async (url: string) => request<Service>({
        request: auto.get('/service', {url})
    }),
    association: async (id: string) => request<Service[]>({
        request: auto.get('/service/association', {id})
    })
}

export default Services