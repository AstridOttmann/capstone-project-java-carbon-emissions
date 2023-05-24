import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import {CompareRoutes} from "../models/CompareRoutesModel";
import React, {useState} from "react";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import {Badge, Box, Button} from "@mui/material";


export interface UsageDialogProps {
    compareRoutes: CompareRoutes,
    compareRoutesList: CompareRoutes[]
}

export default function UsageDialog(props: UsageDialogProps) {
    const [open, setOpen] = useState(false);
    const count: number = props.compareRoutes.comparisonResults.usages.length;

    const handleClose = () => {
        setOpen(false)
    };
    const handleClickOpen = () => {
        setOpen(true)
    };

    return (
        <Box>
            <Button disabled={props.compareRoutes.comparisonResults.usages.length === 0} color="inherit"
                    onClick={handleClickOpen}
                    sx={{display: "block", m: "0 auto", p: "0"}}>
                <Badge badgeContent={count} color="secondary" overlap="circular" sx={{width: "3.3rem"}}>
                    <CloudDoneIcon sx={{display: "block", fontSize: 60, m: "0 auto", p: "0", alignSelf: "center"}}/>
                </Badge>
            </Button>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Usages</DialogTitle>
                <List sx={{pt: 0}}>
                    {props.compareRoutes.comparisonResults.usages?.map((usage) => {
                        return <ListItem key={usage.datetime}>
                            <Typography>{usage.datetime}: {usage.bonus} kg/CO<sub>2</sub></Typography>
                        </ListItem>
                    })}
                </List>
            </Dialog>
        </Box>
    );
}
