import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";


type ResetScoreDialogProps = {
    open: boolean,
    handleClose: () => void,
    onReset: () => void,
    dialogContent: string,
    buttonAgreeText: string,
    buttonDisagreeText: string,

}
export default function ResetDialog(props: ResetScoreDialogProps) {

    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{display: "flex", justifyContent: "space-between"}}>
                    <Button size="large"
                            onClick={props.handleClose}
                            sx={{fontSize: "1rem", color: "secondary.main"}}>
                        {props.buttonDisagreeText}
                    </Button>
                    <Button onClick={props.onReset}
                            autoFocus
                            sx={{fontSize: "1rem", color: "primary.light"}}>
                        {props.buttonAgreeText}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}