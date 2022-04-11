import {request} from "../utils/request";
import {Env, Service} from "../types";
import auto from "../utils/auto";

const Envs = {
    list: () => request<Env[]>({
        request: auto.get('/env', {})
    }),
    association: (envId: string, serviceId: string) => request<Service[]>({
        request: auto.get('/env/association', {envId, serviceId})
    })
}

export default Envs