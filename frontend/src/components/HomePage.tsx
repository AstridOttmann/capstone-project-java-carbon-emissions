import Form from "./Form";
import {Paper} from "@mui/material";

type HomePageProps = {
    isEditMode: boolean,
    setIsEditMode: (arg0: boolean) => void,
}

export default function HomePage(props: HomePageProps) {

    return (
        <Paper sx={{
            pb: "4rem",
            backgroundColor: "#282c34"
        }}>
            <Form isEditMode={props.isEditMode}
                  setIsEditMode={props.setIsEditMode}
            />
        </Paper>
    )
}