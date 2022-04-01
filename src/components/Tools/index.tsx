import React, {useEffect, useState} from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ReorderIcon from '@mui/icons-material/Reorder';
import {Service} from "../../types";
import Services from "../../services/services";
import Envs from "../../services/envs";
import AssociationModal from "./AssociationModal";
import {createTheme, ThemeProvider} from "@mui/material";
import AssociationTabModal from "./AssociationTabModal";

export interface ToolsProps {
    service?: Service
}

const Tools = (props: ToolsProps) => {

    const [expand, setExpand] = useState(false)
    const [showServiceModal, setShowServiceModal] = useState(false)
    const [showEnvModal, setShowEnvModal] = useState(false)
    const [showTabModal, setShowTabModal] = useState(false)
    const [associationEnvs, setAssociationEnvs] = useState<Service[]>([]);
    const [associationServices, setAssociationServices] = useState<Service[]>([]);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const fetch = async () => {
        if (!props.service) {
            return
        }
        const services = await Services.association(props.service.id) || []
        const envs = await Envs.association(props.service.env, props.service.id) || []
        setAssociationEnvs(envs)
        setAssociationServices(services)
        if (services.length > 0 || envs.length > 0) {
            // @ts-ignore
            window.showAssociationModal = () => {
                setShowTabModal(true)
            }
            chrome.runtime.sendMessage({type: "action-enable", enable: true}, function (){});
        } else {
            // @ts-ignore
            window.showAssociationModal = () => {}
            chrome.runtime.sendMessage({type: "action-enable", enable: false},function (){});
        }
    }

    useEffect(() => {
        fetch().then()
    }, [])

    if (!props.service) {
        return null
    }

    return <ThemeProvider theme={darkTheme}>
        <div style={{position: 'fixed', right: 100, bottom: 100}}>
            <SpeedDial
                ariaLabel="service-association"
                open={expand}
                icon={<SpeedDialIcon icon={<AcUnitIcon />} openIcon={<ReorderIcon />} />}
                onClose={() => setExpand(false)}
                onOpen={() => setExpand(true)}
                direction="up"
            >
                {associationServices.length > 0 ? <SpeedDialAction
                    onClick={() => setShowServiceModal(true)}
                    icon={<MiscellaneousServicesIcon />}
                    tooltipTitle="关联服务"
                /> : null}
                {associationEnvs.length > 0 ? <SpeedDialAction
                    onClick={() => setShowEnvModal(true)}
                    icon={<ApartmentIcon />}
                    tooltipTitle="关联环境"
                /> : null}
            </SpeedDial>
            <AssociationTabModal show={showTabModal} services={associationServices} envs={associationEnvs} onClose={() => setShowTabModal(false)} />
            <AssociationModal show={showServiceModal} title="关联服务" services={associationServices} onClose={() => setShowServiceModal(false)} />
            <AssociationModal show={showEnvModal} title="关联环境" services={associationEnvs} onClose={() => setShowEnvModal(false)} />
        </div>
    </ThemeProvider>
}

export default Tools