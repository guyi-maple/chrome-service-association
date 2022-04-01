import {Dialog, Divider, List, Tab, Tabs} from "@mui/material";
import {Service} from "../../types";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import nacos from "../../assets/nacos-logo.png";
import ListItemText from "@mui/material/ListItemText";
import {useState} from "react";

export interface AssociationTabModalProps {
    services: Service[]
    envs: Service[]
    show: boolean
    onClose: () => void
}

const TabPanel = (props: {index: number, current: number, children: any}) => {
    return props.index === props.current ? props.children : null
}

const AssociationTabModal = (props: AssociationTabModalProps) => {

    const [current, setCurrent] = useState(0)

    return <Dialog open={props.show} onClose={props.onClose} fullWidth={true} maxWidth="sm">
        <Tabs value={current} onChange={(e, now) => setCurrent(now)}>
            {
                props.services.length > 0 ? <Tab label="关联服务" /> : 0
            }
            {
                props.envs.length > 0 ? <Tab label="关联环境" /> : 0
            }
        </Tabs>
        <Divider style={{marginTop: 16}} />
        <TabPanel index={0} current={current}>
            <List>
                {
                    props.services.map(service => <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <div style={{paddingRight: 24}}>
                                    <img src={nacos} width={100}/>
                                </div>
                            </ListItemIcon>
                            <ListItemText primary={service.name} secondary={service.envName} />
                        </ListItemButton>
                    </ListItem>)
                }
            </List>
        </TabPanel>
        <TabPanel index={1} current={current}>
            <List>
                {
                    props.envs.map(service => <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <div style={{paddingRight: 24}}>
                                    <img src={nacos} width={100}/>
                                </div>
                            </ListItemIcon>
                            <ListItemText primary={service.name} secondary={service.envName} />
                        </ListItemButton>
                    </ListItem>)
                }
            </List>
        </TabPanel>
    </Dialog>
}

export default AssociationTabModal