import Auth from "../components/auth/Auth";
import AuthForm from "../components/auth/AuthForm";
import Header from "../components/base/Header";
import PageTemplate from "../components/base/PageTemplate";
import View from "../components/View";
import EyeIcon from "../static/svg/eye-icon";
import GithubIcon from "../static/svg/github-icon";
import GoogleIcon from "../static/svg/google-icon";
import SslIcon from "../static/svg/ssl-icon";

export type SignUpProps = {};

function SignUp({}: SignUpProps) {
  return (
    <PageTemplate>
      <Auth>
        <AuthForm />
      </Auth>
    </PageTemplate>
  );
}

export default SignUp;
