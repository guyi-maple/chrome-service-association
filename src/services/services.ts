import axios from "axios";
import Const from "./const";
import {request} from "../utils/request";
import {Service} from "../types";

const Services = {
    get: async (url: string) => request<Service>({
        request: axios.get(`${Const.Server}/service?url=${url}`)
    }),
    association: async (id: string) => request<Service[]>({
        request: axios.get(`${Const.Server}/service/association?id=${id}`)
    })
}

export default Services