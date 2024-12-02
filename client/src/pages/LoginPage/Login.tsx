import { useState } from "react";

// TODO : En prévision de la finalisation du système d'authentification
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

import "./Login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", global: "" });

  // TODO : En prévision de la finalisation du système d'authentification
  // const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((preventDefault) => ({ ...preventDefault, [name]: value }));
    setErrors((preventDefault) => ({ ...preventDefault, [name]: "" }));
  };

  const validateFields = () => {
    const newErrors = { email: "", password: "", global: "" };
    if (!formState.email) {
      newErrors.email = "L'email est obligatoire.";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "L'email est invalide.";
    }
    if (!formState.password) {
      newErrors.password = "Le mot de passe est obligatoire.";
    }
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors((preventDefault) => ({ ...preventDefault, global: "" }));

    if (!validateFields()) {
      return;
    }

    // TODO : En prévision de l'implémentation des données.

    // try {
    //   const res = await fetch("http://localhost:4000/api/login", { // ! Besoin du changement de la méthode.
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

  const preventDefault = (event: React.SyntheticEvent) =>
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
    <main className="login-container">
      <div className="logo-xl-container">
        <img
          className="login-logo-xl"
          src="/StockManage_logo_xl.png"
          alt="Logo de StockManage version complète"
        />
      </div>
      <section className="login-form-container">
        <img
          className="login-logo-sm"
          src="/StockManage_logo.png"
          alt="Logo de StockManage version simplifiée"
          aria-hidden="true"
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
        <form className="login-inputs" onSubmit={handleSubmit}>
          <TextField
            required
            id="login"
            label="Email"
            name="email"
            autoComplete="email"
            value={formState.email}
            error={!!errors.email}
            helperText={errors.email}
            onChange={handleChange}
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
              value={formState.password}
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
              error={!!errors.password}
              label="Mot de passe"
            />
          </FormControl>
          <Link
            href="#" // ! Lien à modifier une fois le système de réinitialisation du mot de passe défini.
            role="button"
            aria-label="Réintialiser votre mot de passe"
            onClick={preventDefault}
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
          {errors.password && (
            <Typography color="error">{errors.password}</Typography>
          )}
          {errors.global && (
            <Typography color="error">{errors.global}</Typography>
          )}
          <Button variant="contained" type="submit">
            Se Connecter
          </Button>
        </form>
      </section>
    </main>
  );
}
