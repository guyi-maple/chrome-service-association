import {request} from "../utils/request";
import axios from "axios";
import Const from "./const";
import {Env, Service} from "../types";

const Envs = {
    list: () => request<Env[]>({
        request: axios.get(`${Const.Server}/env`)
    }),
    association: (envId: string, serviceId: string) => request<Service[]>({
        request: axios.get(`${Const.Server}/env/association?envId=${envId}&serviceId=${serviceId}`)
    })
}

export default Envs