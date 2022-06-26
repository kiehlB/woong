import Auth from "../components/auth/Auth";
import AuthForm from "../components/auth/AuthForm";

import PageTemplate from "../components/base/PageTemplate";

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
