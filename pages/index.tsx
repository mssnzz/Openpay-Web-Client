import * as React from "react";
import { CssVarsProvider, styled, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import {
  CheckCircleOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}


const StyledInput = styled("input")({
  border: "none", // remove the native input border
  minWidth: 0, // remove the native input width
  outline: 0, // remove the native input outline
  padding: 0, // remove the native input padding
  paddingTop: "1em",
  flex: 1,
  color: "inherit",
  backgroundColor: "transparent",
  fontFamily: "inherit",
  fontSize: "inherit",
  fontStyle: "inherit",
  fontWeight: "inherit",
  lineHeight: "inherit",
  textOverflow: "ellipsis",
  "&::placeholder": {
    opacity: 0,
    transition: "0.1s ease-out",
  },
  "&:focus::placeholder": {
    opacity: 1,
  },
  "&:focus ~ label, &:not(:placeholder-shown) ~ label, &:-webkit-autofill ~ label":
    {
      top: "0.5rem",
      fontSize: "0.75rem",
    },
  "&:focus ~ label": {
    color: "var(--Input-focusedHighlight)",
  },
  "&:-webkit-autofill": {
    alignSelf: "stretch", // to fill the height of the root slot
  },
  "&:-webkit-autofill:not(* + &)": {
    marginInlineStart: "calc(-1 * var(--Input-paddingInline))",
    paddingInlineStart: "var(--Input-paddingInline)",
    borderTopLeftRadius:
      "calc(var(--Input-radius) - var(--variant-borderWidth, 0px))",
    borderBottomLeftRadius:
      "calc(var(--Input-radius) - var(--variant-borderWidth, 0px))",
  },
});

const StyledLabel = styled("label")(({ theme }) => ({
  position: "absolute",
  lineHeight: 1,
  top: "calc((var(--Input-minHeight) - 1em) / 2)",
  color: theme.vars.palette.text.tertiary,
  fontWeight: theme.vars.fontWeight.md,
  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
}));

const emailInput = React.forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements["input"]
>((props, ref) => {
  const id = React.useId();
  return (
    <React.Fragment>
      <StyledInput {...props} ref={ref} id={id} name="email" />
      <StyledLabel htmlFor={id}>Correo electrónico</StyledLabel>
    </React.Fragment>
  );
});

const InputWithLabel = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    placeholder: string;
    type: string;
    showPassword?: boolean;
    togglePasswordVisibility?: () => void;
  }
>((props, ref) => {
  const { label, placeholder, showPassword, togglePasswordVisibility } = props;
  const id = React.useId();

  return (
    <React.Fragment>
      <StyledInput
        {...props}
        ref={ref}
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        name="password"
      />
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <IconButton
        onClick={togglePasswordVisibility}
        aria-label="toggle password visibility"
        sx={{
          position: "absolute",
          right: "0.5rem",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </React.Fragment>
  );
});

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.elements) {
      console.error("Form elements are undefined");
      return;
    }

    const { email, password } = form.elements;

    if (!email || !password) {
      console.error("Email or password inputs are undefined");
      return;
    }

    const data = {
      email: email.value,
      password: password.value,
    };

    if (data) {
      const email = data.email; // Usar 'email' en lugar de 'correo'
      const password = data.password; // Usar 'password' en lugar de 'contra'
      const result = await signIn("credentials", {
        redirect: false, // No redirige automáticamente
        email, // Corregido de 'correo' a 'email'
        password, // Corregido de 'contra' a 'password'
      });
      router.push("/dashboard")
      if (result?.error == null) {
        console.log(result);
    }
    }
  };

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <Typography
                sx={{ fontFamily: "Uber-Bold", fontWeight: 800, fontSize: 22 }}
              >
                Openpay
              </Typography>
            </Box>
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography
                  sx={{
                    fontFamily: "Uber-Medium",
                    fontSize: 28,
                    fontWeight: 800,
                  }}
                >
                  Iniciar sesión
                </Typography>
                <Typography sx={{ fontFamily: "Uber-Medium" }}>
                  Nuevo en Openpay?&nbsp;
                  <Link
                    href="#replace-with-a-link"
                    sx={{ fontFamily: "Uber-Medium", color: "#006AFF" }}
                  >
                    Comienza gratis!
                  </Link>
                </Typography>
              </Stack>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: {
                    xs: "#FFF",
                    md: "text.tertiary",
                    fontFamily: "Uber-Medium",
                  },
                },
              })}
            >
              o
            </Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit}>
                <FormControl required>
                  <Input
                    slots={{ input: emailInput }}
                    name="email" // Asegúrate de agregar esto
                    slotProps={{
                      input: { placeholder: "", type: "email" },
                    }}
                    sx={{
                      "--Input-minHeight": "56px",
                      "--Input-radius": "6px",
                      fontFamily: "Uber-Medium",
                    }}
                  />
                </FormControl>
                <FormControl required>
                  <Input
                    slots={{ input: InputWithLabel }}
                    name="password" // Asegúrate de agregar esto
                    slotProps={{
                      input: {
                        label: "Contraseña",
                        placeholder: "",
                        type: showPassword ? "text" : "password",
                        showPassword: showPassword,
                        togglePasswordVisibility: () =>
                          setShowPassword(!showPassword),
                      },
                    }}
                    sx={{
                      "--Input-minHeight": "56px",
                      "--Input-radius": "6px",

                      fontFamily: "Uber-Medium",
                    }}
                  />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      sx={{
                        fontFamily: "Uber-Medium",
                        color: "#006AFF",
                      }}
                      href="#replace-with-a-link"
                    >
                      Olvidaste tu contraseña?
                    </Link>
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    sx={{
                      fontFamily: "Uber-Medium",
                      fontWeight: 500,
                      fontSize: 20,
                      bgcolor: "#006AFF",
                      height: 58,
                    }}
                  >
                    Continuar
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography
              level="body-xs"
              textAlign="center"
              sx={{ fontFamily: "Uber-Medium" }}
            >
              © Openpay Punto De Venta {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://d2w1ef2ao9g8r9.cloudfront.net/images/AdobeStock_226534123-copy_2023-03-27-190535_duqd.jpg)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://d2w1ef2ao9g8r9.cloudfront.net/images/AdobeStock_226534123-copy_2023-03-27-190535_duqd.jpg)",
          },
        })}
      />
    </CssVarsProvider>
  );
}
