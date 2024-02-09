import { useContext, useState } from "react";

// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
// import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { useAuthContext } from "context/auth-context";
import { useToasts } from "react-toast-notifications";


function SignIn() {
  // const [rememberMe, setRememberMe] = useState(true);
  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [, authDispatch] = useAuthContext();
  const { addToast } = useToasts();

  const handleLogin = () => {

    const payload = {
      email, password
    };

    if (payload.email == 'admin@snapoffer.com' && payload.password == '12345678') {
      authDispatch({ 
        type: 'login', 
        payload: { 
          id: 1, 
          email: 'admin@snapoffer.com', 
          firstName: 'Admin',
          lastName: 'Snapoffer', 
        } 
      });
      addToast('Login success.', {
        appearance: "success",
        autoDismiss: true,
      });
      return;
    }

    addToast('Invalid username or password.', {
      appearance: "error",
      autoDismiss: true,
    });

  };

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SuiTypography>
          </SuiBox>
          <SuiInput type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        </SuiBox>
        <SuiBox mb={2}>
          <SuiBox mb={1} ml={0.5}>
            <SuiTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SuiTypography>
          </SuiBox>
          <SuiInput type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        </SuiBox>
        {/* <SuiBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SuiTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SuiTypography>
        </SuiBox> */}
        <SuiBox mt={4} mb={1}>
          <SuiButton onClick={() => handleLogin()} variant="gradient" color="info" fullWidth>
            sign in
          </SuiButton>
        </SuiBox>
        {/* <SuiBox mt={3} textAlign="center">
          <SuiTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SuiTypography>
          </SuiTypography>
        </SuiBox> */}
      </SuiBox>
    </CoverLayout>
  );
}

export default SignIn;
