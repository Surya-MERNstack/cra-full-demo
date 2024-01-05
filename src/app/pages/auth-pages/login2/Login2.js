import React from "react";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { Facebook, Google, Twitter } from "@mui/icons-material";
import Div from "@jumbo/shared/Div";
import { alpha } from "@mui/material/styles";
import { ASSET_IMAGES } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";
import * as yup from "yup";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import authServices from "../../../services/auth-services";
import { useNavigate } from "react-router-dom";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const Login2 = ({ disableSmLogin }) => {
  const { setAuthToken } = useJumboAuth();
  const navigate = useNavigate();

  const onSignIn = (email, password) => {
    authServices.signIn({ email, password }).then((data) => {
      setAuthToken(data?.token);
      navigate("/dashboards/misc");
    });
  };

  return (
    <Div
      sx={{
        maxWidth: "100%",
        marginLeft: "15rem",
        marginTop: "4rem",
        p: 4,
      }}
    >
      <Card
        sx={{
          display: "flex",
          minWidth: 0,
          flexDirection: { xs: "column", md: "row" },
          background: "transparent",
          // border :"0.2px solid white"
        }}
      >
        <CardContent
          sx={{
            flex: "0 1 300px",
            position: "relative",
            backgroundImage: `#0267a0 url(${getAssetPath(
              `${ASSET_IMAGES}/auth/login-img.png`,
              "640x428"
            )}) no-repeat center`,

            "&::after": {
              display: "inline-block",
              position: "absolute",
              content: `''`,
              inset: 0,
              // backgroundColor: "rgb(92, 71, 142)",
              background: "transparent",
              borderRight: "1px solid aqua",
              borderBottom: "1px solid aqua",
            },
          }}
        >
          <Div
            sx={{
              display: "flex",
              minWidth: 0,
              flex: 1,
              flexDirection: "column",
              color: "common.white",
              position: "relative",
              zIndex: -1,
              height: "100%",
            }}
          >
            <Div sx={{ mb: 2 }}>
              <Typography
                variant={"h3"}
                color={"inherit"}
                fontWeight={500}
                mb={3}
              >
                Sign In
              </Typography>
              <Typography variant={"body1"} mb={2}>
                By signing in, you can avail full features of the Jumbo.
              </Typography>
              <Typography variant={"body1"}>
                <Link href={"#"} color={"dodgerblue"} underline={"none"}>
                  Forgot your password? Recover Now
                </Link>
              </Typography>
            </Div>

            <Div sx={{ mt: "auto" }}>
              <Link
                href="#"
                underline="none"
                sx={{
                  display: "inline-flex",
                  filter: "drop-shadow(rgb(75, 58, 116))",
                }}
              >
                <img src={`${ASSET_IMAGES}/logo.png`} alt="Jumbo React" />
              </Link>
            </Div>
          </Div>
        </CardContent>
        <CardContent sx={{ flex: 1, p: 4, borderBottom: "1px solid aqua" }}>
          <Div
            sx={{
              width: "200px",
              height: "40px",
              marginLeft: "-2rem",
              marginTop: "-1.5rem",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
              // background: "rgb(115, 82, 199)",
              textAlign: "center",
              overflow: "clip",
              background: "transparent",
              color: "white",
            }}
          >
            <Typography
              variant={"h3"}
              color={"inherit"}
              fontWeight={500}
              mb={3}
            >
              Welcome Back
            </Typography>
          </Div>
          <Formik
            validateOnChange={true}
            initialValues={{
              email: "demo@example.com",
              password: "ABC123DEF",
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              onSignIn(data.email, data.password);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form
                style={{ textAlign: "left", marginTop: "2rem" }}
                noValidate
                autoComplete="off"
              >
                <Div sx={{ mt: 1, mb: 3 }}>
                  <JumboTextField fullWidth name="email" label="Email" />
                </Div>
                <Div sx={{ mt: 1, mb: 2 }}>
                  <JumboTextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                  />
                </Div>
                <Div sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember me"
                  />
                </Div>
                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ mb: 3 }}
                  loading={isSubmitting}
                >
                  Sign{" "}
                </LoadingButton>
                {!disableSmLogin && (
                  <React.Fragment>
                    <Typography variant={"body1"} mb={2}>
                      Or sign in with
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mb={1}
                    >
                      <IconButton
                        sx={{
                          bgcolor: "#385196",
                          color: "common.white",
                          p: (theme) => theme.spacing(1.25),

                          "&:hover": {
                            backgroundColor: "#385196",
                          },
                        }}
                        aria-label="Facebook"
                      >
                        <Facebook fontSize="small" />
                      </IconButton>
                      <IconButton
                        sx={{
                          bgcolor: "#00a8ff",
                          color: "common.white",
                          p: (theme) => theme.spacing(1.25),
                          "&:hover": {
                            backgroundColor: "#00a8ff",
                          },
                        }}
                        aria-label="Twitter"
                      >
                        <Twitter fontSize="small" />
                      </IconButton>
                      <IconButton
                        sx={{
                          bgcolor: "#23272b",
                          color: "common.white",
                          p: (theme) => theme.spacing(1.25),

                          "&:hover": {
                            backgroundColor: "#23272b",
                          },
                        }}
                        aria-label="Twitter"
                      >
                        <Google fontSize="small" />
                      </IconButton>
                    </Stack>
                  </React.Fragment>
                )}
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Div>
  );
};

export default Login2;
