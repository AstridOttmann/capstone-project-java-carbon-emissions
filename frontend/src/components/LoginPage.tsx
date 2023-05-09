import {Box, Button, TextField} from "@mui/material";
import {FormEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {RoutesContext} from "../contexts/RoutesContextProvider";

const sxStyleBox = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    m: "3rem"
}

type LoginPageProps = {
    onLogin: (username: string, password: string) => Promise<string | number | void>,
    getAllComparison: () => void
}
export default function LoginPage(props: LoginPageProps) {
    const {getAllRoutes} = useContext(RoutesContext)
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    function handleLoginOnSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        props.onLogin(username, password)
            .then(() => {
                navigate("/");
                getAllRoutes();
                props.getAllComparison();
            })
            .catch(error => console.error(error));

    }

    return (
        <form onSubmit={handleLoginOnSubmit}>
            <Box sx={sxStyleBox}>
                <TextField required variant="standard"
                           type="text"
                           label="User name"
                           id="username"
                           value={username}
                           onChange={e => setUsername(e.target.value)}
                           InputLabelProps={{sx: {color: "#3fd44d"}}}
                           InputProps={{sx: {color: "#3fd44d"}}}
                />
                <TextField required
                           variant="standard"
                           type="password"
                           label="Password"
                           id="password"
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           InputLabelProps={{sx: {color: "#3fd44d"}}}
                           InputProps={{sx: {color: "#3fd44d"}}}
                />
                <Button type="submit" variant="outlined">Login</Button>
            </Box>
        </form>
    )
}