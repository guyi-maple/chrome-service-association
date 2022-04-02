
export interface SendMessageProps {
    id: string
    params?: any
}

export default function sendMessage(props: SendMessageProps) {
    return new Promise(resolve => {
        // @ts-ignore
        chrome.runtime.sendMessage({
            id: props.id,
            params: props.params
        }, function (resp: any) {
            resolve(resp)
        })
    })
}