import { useState } from "react";

// TODO : En prévision de la finalisation du système d'authentification (US02).
// import { useNavigate } from 'react-router-dom';

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    form: { email: "", password: "" },
    errors: { email: "", password: "", global: "" },
  });

  // TODO : En prévision de la finalisation du système d'authentification
  // const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      form: { ...prevState.form, [name]: value },
      errors: { ...prevState.errors, [name]: "" },
    }));
  };

  const validateFields = () => {
    const newErrors = { email: "", password: "", global: "" };
    if (!formState.form.email) {
      newErrors.email = "L'email est obligatoire.";
    } else if (!/\S+@\S+\.\S+/.test(formState.form.email)) {
      newErrors.email = "L'email est invalide.";
    }
    if (!formState.form.password) {
      newErrors.password = "Le mot de passe est obligatoire.";
    }
    setFormState((prevState) => ({ ...prevState, errors: newErrors }));
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState((prevState) => ({
      ...prevState,
      errors: { ...prevState.errors, global: "" },
    }));

    if (!validateFields()) {
      return;
    }

    // TODO : En prévision de l'implémentation des données (US02).

    // try {
    //   const res = await fetch("http://localhost:4000/api/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email: formState.email, password: formState.password })
    //   });

    //   const data = await res.json();

    //   if(!res.ok) {
    //     throw new Error(data.message || "Erreur lors de la connexion")
    //   }

    //   const { token, redirectUrl } = data;

    //   localStorage.setItem("authToken", token);

    //   navigate(redirectUrl);
    // } catch (err : any) {
    //   setErrors(err.message)
    // }
  };

  const handleLinkClick = (event: React.SyntheticEvent) =>
    event.preventDefault();

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          width: "50dvw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="/StockManage_logo_xl.png"
          alt="Logo de StockManage version complète"
          loading="lazy"
          sx={{
            width: "60%",
          }}
        />
      </Box>
      <Box
        component="section"
        sx={{
          width: "50dvw",
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="/StockManage_logo.png"
          alt="Logo de StockManage version simplifiée"
          loading="lazy"
          aria-hidden="true"
          sx={{
            width: "15%",
          }}
        />
        <Typography
          variant="h6"
          component="h1"
          sx={{
            mt: 3,
            mb: 3,
          }}
        >
          Connexion à StockManage
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <TextField
            required
            id="login"
            label="Email"
            name="email"
            autoComplete="email"
            value={formState.form.email}
            error={!!formState.errors.email}
            helperText={formState.errors.email}
            onChange={handleChange}
            aria-invalid={!!formState.errors.email}
          />
          <FormControl
            sx={{
              mt: 1,
              mb: 1,
              width: "50ch",
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Mot de passe
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              value={formState.form.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              error={!!formState.errors.password}
              label="Mot de passe"
              aria-invalid={!!formState.errors.password}
            />
          </FormControl>
          <Link
            href="#" // ! Lien à modifier une fois le système de réinitialisation du mot de passe défini.
            role="button"
            aria-label="Réinitialiser votre mot de passe"
            onClick={handleLinkClick}
            sx={{
              typography: "body1",
              "& > :not(style) ~ :not(style)": {
                ml: 2,
              },
              mb: 2,
            }}
          >
            Mot de passe oublié
          </Link>
          {formState.errors.global && (
            <Typography color="error" role="alert">
              {formState.errors.global}
            </Typography>
          )}
          <Button variant="contained" type="submit">
            Se Connecter
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
