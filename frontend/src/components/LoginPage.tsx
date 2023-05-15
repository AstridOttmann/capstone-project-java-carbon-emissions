import {Box, Button, TextField, ButtonGroup} from "@mui/material";
import {ChangeEvent, FormEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {RoutesContext} from "../contexts/RoutesContextProvider";
import {User} from "../models/MongoUserModel";

const sxStyleBox = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    m: "3rem"
}

type LoginPageProps = {
    onLogin: (username: string, password: string) => Promise<void>,
    onSignIn: (newMongoUser: User) => Promise<void>,
    getAllComparison: () => void,
    user: User,
    setUser: (user: User) => void,

}
export default function LoginPage(props: LoginPageProps) {
    const {getAllRoutes} = useContext(RoutesContext)
    // const [username, setUsername] = useState<string>('');
    // const [password, setPassword] = useState<string>('');
    const [signIn, setSignIn] = useState<boolean>();

    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        props.setUser({...props.user, [name]: value})
    }

    async function handleLoginOnSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (signIn) {
            try {
                await props.onSignIn(props.user);
                setSignIn(false);
            } catch (error) {
                console.error("error", error);
            }
        }
        await props.onLogin(props.user.username, props.user.password);
        navigate("/");
        await getAllRoutes();
        props.getAllComparison();
    }

  /*  function handleLoginOnSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (signIn) {
            props.onSignIn(props.user)
                .then(() => {
                    setSignIn(false)
                })
                .catch(error => console.error("error", error))
                .finally(() => {
                    props.onLogin(props.user.username, props.user.password)
                        .then(() => {
                            navigate("/")
                            getAllRoutes();
                            props.getAllComparison()
                        })
                })
        }
    }*/

    return (
        <form onSubmit={handleLoginOnSubmit}>
            <Box sx={sxStyleBox}>
                <TextField required variant="standard"
                           type="text"
                           label="User name"
                           id="username"
                           name="username"
                           value={props.user.username}
                           onChange={handleChange}
                           InputLabelProps={{sx: {color: "#3fd44d"}}}
                           InputProps={{sx: {color: "#3fd44d"}}}
                />
                <TextField required
                           variant="standard"
                           type="password"
                           label="Password"
                           id="password"
                           name="password"
                           value={props.user.password}
                           onChange={handleChange}
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