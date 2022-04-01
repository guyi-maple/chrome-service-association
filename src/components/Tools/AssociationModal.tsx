import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Service} from "../../types";
import nacos from '../../assets/nacos-logo.png'

export interface SelectModelProps {
    show: boolean
    title: string
    services: Service[]
    onClose: () => void
}

const AssociationModal = (props: SelectModelProps) => {
    return <Dialog open={props.show} onClose={props.onClose} fullWidth={true} maxWidth="sm">
        <DialogTitle><span style={{color: '#FFFFFF'}}>{props.title}</span></DialogTitle>
        <DialogContent dividers={true} style={{padding: 0}}>
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
        </DialogContent>
    </Dialog>
}

export default AssociationModal