import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import {CompareRoutes} from "../models/CompareRoutesModel";
import React, {useState} from "react";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import {Box, Button} from "@mui/material";


export interface UsageDialogProps {
    compareRoutes: CompareRoutes
}

export default function UsageDialog(props: UsageDialogProps) {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
    };
    const handleClickOpen = () => {
        setOpen(true)
    };

    return (
        <Box>
            <><Button disabled={props.compareRoutes.comparisonResults.usages.length === 0} color="inherit"
                      onClick={handleClickOpen}
                      sx={{display: "block", m: "0 auto", p: "0"}}>
                <CloudDoneIcon sx={{display: "block", fontSize: 60, m: "0 auto", p: "0", alignSelf: "center"}}/>
            </Button>
                <Dialog onClose={handleClose} open={open}>
                    <DialogTitle>Usages</DialogTitle>
                    <List sx={{pt: 0}}>
                        {props.compareRoutes.comparisonResults.usages?.map((usage) => {
                            return <ListItem>
                                <Typography key={usage.datetime} sx={{}}>{usage.datetime}: {usage.bonus} kg/Co2</Typography>
                            </ListItem>
                        })}
                    </List>
                </Dialog></>
        </Box>
    );
}
