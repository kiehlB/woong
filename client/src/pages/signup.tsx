import Auth from '../components/auth/Auth';
import AuthForm from '../components/auth/AuthForm';
import PageTemplate from '../components/base/PageTemplate';
import useRegister from '../components/auth/hooks/useRegister';

export type SignUpProps = {};

function SignUp({}: SignUpProps) {
  const { inputs, handleChange, handleSubmit, registerError } = useRegister();

  return (
    <PageTemplate>
      <Auth>
        <AuthForm
          inputs={inputs}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          authError={registerError}
          auth="Register"
        />
      </Auth>
    </PageTemplate>
  );
}

export default SignUp;
