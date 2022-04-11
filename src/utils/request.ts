import {ApiResponse} from "../types";

export interface RequestProps<D> {
    request: Promise<ApiResponse<D>>
}

export async function request<D>(props: RequestProps<D>): Promise<D | undefined> {
    return new Promise(resolve => {
        props.request.then(resp => {
            if (resp.code === 0) {
                resolve(resp.data)
            } else {
                alert(resp.msg || '异常错误')
            }
        }).catch(err => alert(err))
    })
}