import {Box, Button, Snackbar, SnackbarOrigin} from "@mui/material";
import {useState} from "react";

export interface State extends SnackbarOrigin {
    open: boolean;
}

type SnackbarInfoProps = {
    message: string,
    buttonText: string
}
export default function SnackbarInfo(props: SnackbarInfoProps) {
    const [state, setState] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const {vertical, horizontal, open} = state;

    const handleClick = (newState: SnackbarOrigin) => () => {
        setState({open: true, ...newState});
    };

    const handleClose = () => {
        setState({...state, open: false});
    };

    return (
        <Box sx={{textAlign: "center"}}>
            <Button variant="text"
                    size="small"
                    color="inherit"
                    onClick={handleClick({
                        vertical: "bottom",
                        horizontal: "center"
                    })}>{props.buttonText}</Button>
            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                open={open}
                onClose={handleClose}
                message={props.message}
                key={vertical + horizontal}
            />
        </Box>
    )
}