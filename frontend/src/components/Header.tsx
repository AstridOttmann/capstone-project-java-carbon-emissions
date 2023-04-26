import {Divider, Typography} from "@mui/material";

const sxStyle = {
    fontSize: "2rem",
    textAlign: "center",
    p: "1rem"
}
export default function Header(){
    return(
        <header>
            <Typography variant="h1" sx={sxStyle}>Move Green!</Typography>
            <Divider sx={{borderColor: "#808080"}}/>
        </header>
    )
}