import {Box, Button, TextField, ButtonGroup} from "@mui/material";
import {FormEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {RoutesContext} from "../contexts/RoutesContextProvider";
import {toast} from "react-toastify";

const sxStyleBox = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    m: "3rem"
}

type LoginPageProps = {
    onLogin: (username: string, password: string) => Promise<string | number | void>,
    onSignIn: (username: string, password: string) => Promise<string | number | void>,
    getAllComparison: () => void,
    // mongoUser: MongoUser

}
export default function LoginPage(props: LoginPageProps) {
    const {getAllRoutes} = useContext(RoutesContext)
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [signIn, setSignIn] = useState<boolean>();


    const navigate = useNavigate();

    function handleLoginOnSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (signIn) {
            props.onSignIn(username, password)
                .then(() => {
                    toast.success("Created an account!")
                    setSignIn(false);
                })
                .catch(error => console.error(error));
        } else {
            props.onLogin(username, password)
                .then(() => {
                    navigate("/");
                    getAllRoutes();
                    props.getAllComparison();
                })
                .catch(error => console.error(error));

        }
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
                <ButtonGroup sx={{display: "flex", justifyContent: "center"}}
                             variant="text"
                             aria-label="text button group">
                    <Button type="submit" onClick={() => setSignIn(true)}>Sign in</Button>
                    <Button type="submit">Login</Button>
                </ButtonGroup>
                {/*  <Button type="submit" variant="outlined">Login</Button>*/}
            </Box>
        </form>
    )
}