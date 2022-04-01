import Tools from "../components/Tools";
import {useEffect, useState} from "react";
import Services from '../services/services'
import {Service} from "../types";

const Main = () => {

    const [service, setService] = useState<Service>();

    const check = () => {
        Services.get('https://www.google.com').then(resp => {
            setService(resp)
        })
    }

    useEffect(() => check(), [])

    return service ? <Tools service={service} /> : null
}

export default Main