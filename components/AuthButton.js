import { Button, Image } from "theme-ui";

import useAuth from "../utils/useAuth";

const AuthButton = () => {
  const { user, signin, signout } = useAuth();
  const isSignedIn = !!user;

  const handleClick = React.useCallback(() => {
    if (isSignedIn) {
      signout();
    } else {
      signin();
    }
  }, [isSignedIn]);

  return (
    <>
      {isSignedIn && <Image src={user.photoURL} variant="avatar" />}
      <Button
        variant={isSignedIn ? "secondary" : "primary"}
        onClick={handleClick}
      >
        {isSignedIn && "Sign out"}
        {!isSignedIn && "Sign in with Google"}
      </Button>
    </>
  );
};

export default AuthButton;
