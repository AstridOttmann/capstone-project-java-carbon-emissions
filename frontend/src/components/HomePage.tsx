import Form from "./Form";
import {Button, Paper} from "@mui/material";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import {useState} from "react";

type HomePageProps = {
    isEditMode: boolean,
    setIsEditMode: (arg0: boolean) => void,
}

export default function HomePage(props: HomePageProps) {
    const [addMode, setAddMode] = useState<boolean>(false)

    return (
        <Paper sx={{
            pb: "4rem",
            backgroundColor: "#282c34"
        }}>
            {addMode || props.isEditMode ?
                <Form isEditMode={props.isEditMode}
                      setIsEditMode={props.setIsEditMode}
                      setAddMode={setAddMode}
                /> :
                <Button variant="outlined" sx={{m: "1rem"}} onClick={() => setAddMode(!addMode)}><AddLocationIcon/>
                    Add Route
                </Button>}
        </Paper>
    )
}