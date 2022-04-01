
export interface ApiResponse<D> {
    code: number
    msg?: string
    data?: D
}

export interface Service {
    id: string
    type: string
    name: string
    env: string
    envName: string
    url: string
}

export interface Env {
    id: string
    name: string
}