import {Box, Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

type CardButtonGroupProps = {
    onDeleteClick: () => void,
    onDetailsClick: () => void
}
export default function CardButtonGroup(props: CardButtonGroupProps) {
    return (
        <Box sx={{display: "flex", justifyContent: "space-between", mt: "1.5rem"}}>
            <Button size="small"
                    variant="text"
                    color="error"
                    onClick={props.onDeleteClick}
                    sx={{minWidth: "fit-content", m: "0", p: "0"}}>
                <DeleteIcon sx={{fontSize: 20}}/>
            </Button>
            <Button size="small"
                    variant="text"
                    onClick={props.onDetailsClick}
                    sx={{minWidth: "fit-content", m: "0", p: "0"}}>
                <EditNoteIcon/>
            </Button>
        </Box>
    )
}