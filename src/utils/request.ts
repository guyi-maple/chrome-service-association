import {AxiosResponse} from "axios";
import {ApiResponse} from "../types";

export interface RequestProps<D> {
    request: Promise<AxiosResponse<ApiResponse<D>>>
}

export async function request<D>(props: RequestProps<D>): Promise<D | undefined> {
    return new Promise(resolve => {
        props.request.then(resp => {
            if (resp.data.code === 0) {
                resolve(resp.data.data)
            } else {
                alert(resp.data.msg || '异常错误')
            }
        }).catch(err => alert(err))
    })
}