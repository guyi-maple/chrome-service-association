import ReactDOM from "react-dom";
import React from "react";
import Tools from "../components/Tools";
import services from "../services/services";

const container = document.createElement('div')
container.id = 'association'
document.body.append(container)

const url = `${window.location.protocol}//${window.location.host}`
services.get(url).then(services => {
    ReactDOM.render(
        <React.StrictMode>
            <Tools service={services} />
        </React.StrictMode>,
        document.getElementById('association')
    );
})