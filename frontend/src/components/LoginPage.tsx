import {Box, Button, Container, TextField, Typography} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {User} from "../models/MongoUserModel";


const sxStyleContainer = {
    position: "relative",
    top: "10rem",
}
const sxStyleBox2 = {
    width: "90%",
    m: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
}

type LoginPageProps = {
    onLogin: (username: string, password: string) => Promise<User>,
    onSignIn: (newMongoUser: User) => Promise<void>,
    user: User,
    setUser: (user: User) => void,

}
export default function LoginPage(props: LoginPageProps) {
    const [signUp, setSignUp] = useState<boolean>();

    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        props.setUser({...props.user, [name]: value})
    }

    async function handleLoginOnSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (signUp) {
            try {
                await props.onSignIn(props.user);
                setSignUp(false);
            } catch (error) {
                console.error("error", error);
            }
        }
        await props.onLogin(props.user.username, props.user.password);
        navigate("/");
    }

    return (
        <Container maxWidth="sm" sx={sxStyleContainer}>
            <form onSubmit={handleLoginOnSubmit}>
                <Box sx={sxStyleBox2}>
                    <Typography variant="h6" component="h2" sx={{textDecoration: "underline"}}
                                gutterBottom>Login</Typography>
                    <TextField required
                               size="small"
                               type="text"
                               label="username"
                               id="username"
                               name="username"
                               value={props.user.username}
                               onChange={handleChange}
                               sx={{mt: "1.2rem"}}
                        /*InputLabelProps={{sx: {color: "#fff"}}}
                        InputProps={{sx: {color: "primary"}}}*/
                    />
                    <TextField required
                               size="small"
                               type="password"
                               label="password"
                               id="password"
                               name="password"
                               value={props.user.password}
                               onChange={handleChange}
                               sx={{mt: "1.2rem"}}
                        /*  InputLabelProps={{sx: {color: "#fff"}}}
                          InputProps={{sx: {color: "primary"}}}*/
                    />
                    <Box sx={{display: "flex", justifyContent: "space-between", mt: "1.2rem"}}>
                        <Button type="submit" onClick={() => setSignUp(true)}>
                            <Typography color="text.primary" sx={{textDecoration: "underline", fontSize: "1rem"}}>Sign
                                Up?</Typography></Button>
                        <Button type="submit" color="inherit" size="large"><LoginIcon/></Button>
                    </Box>
                </Box>
            </form>
        </Container>
    )
}