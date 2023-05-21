import {Button, Snackbar, SnackbarOrigin} from "@mui/material";
import {useState} from "react";

export interface State extends SnackbarOrigin {
    open: boolean;
}

export default function SnackbarInfo(){
    const [state, setState] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    const handleClick = (newState: SnackbarOrigin) => () => {
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    return (
        <div>
            <Button variant="text"
                    size="small"
                    color="inherit"
            onClick={handleClick({
                vertical: "bottom",
                horizontal: "center"
            })}>*click for more infos</Button>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message="Enter two routes with different options to travel.
                CO2-emissions for both routes will be calculated and compared."
                key={vertical + horizontal}
            />
        </div>
    )
}