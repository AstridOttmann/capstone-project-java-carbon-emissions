import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useState} from "react";
import {CompareRoutes} from "../models/CompareRoutesModel";

type DeleteDialogProps = {
    compareRoutes: CompareRoutes,
    deleteComparisonById: (id: string) => void,
}
export default function DeleteDialog(props: DeleteDialogProps) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleDelete() {
        props.deleteComparisonById(props.compareRoutes.id);
        setOpen(false);
    }

    return (
        <>
            <Button size="small" variant="text" color="error" onClick={handleClickOpen}
                    sx={{alignSelf: "start", minWidth: "fit-content", m: "0", p: "0"}}>
                <DeleteIcon sx={{fontSize: 25}}/>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting this comparison is final and cannot be reversed. Do you want to continue?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{display: "flex", justifyContent: "space-between"}}>
                    <Button size="large" onClick={handleClose} sx={{fontSize: "1rem", color: "secondary.main"}}>No,
                        keep it!</Button>
                    <Button onClick={handleDelete} autoFocus sx={{fontSize: "1rem", color: "primary.light"}}>
                        Yes, delete!
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}