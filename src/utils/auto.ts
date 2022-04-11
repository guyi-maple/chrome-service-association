import axios from "axios";
import qs from "qs";
import Const from "../services/const";
import {ApiResponse} from "../types";


class AutoRequest {

    message = new MessageRequest()
    http = new HttpRequest()

    get<D>(url: string, params: any): Promise<ApiResponse<D>> {
        if (process.env.NODE_ENV) {
            return this.http.get(url, params)
        } else {
            return this.message.get(url, params)
        }
    }

    post<D>(url: string, body: any): Promise<ApiResponse<D>> {
        if (process.env.NODE_ENV) {
            return this.http.post(url, body)
        } else {
            return this.message.post(url, body)
        }
    }

}


class MessageRequest {

    handler<D> (url: string, params: any): Promise<ApiResponse<D>> {
        return new Promise(resolve => {
            chrome.runtime.sendMessage({
                request: url,
                data: params
            }, response => resolve({code: 0, data: response}))
        })
    }

    get<D> (url: string, params: any): Promise<ApiResponse<D>> {
        return this.handler(url, params)
    }

    post<D> (url: string, body: any): Promise<ApiResponse<D>> {
        return this.handler(url, body)
    }

}

class HttpRequest {

    get<D>(url: string, params: any): Promise<ApiResponse<D>> {
        return new Promise(resolve => axios.get(`${Const.Server}${url}?${qs.stringify(params || {})}`).then(resp => {
            resolve(resp.data as ApiResponse<D>)
        }))
    }

    post<D>(url: string, body: any): Promise<ApiResponse<D>> {
        return new Promise(resolve => axios.post(`${Const.Server}${url}`, body).then(resp => {
            resolve(resp.data as ApiResponse<D>)
        }))
    }

}

export default new AutoRequest()