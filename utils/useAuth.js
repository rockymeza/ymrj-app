// https://usehooks.com/useAuth/
import * as React from "react";
import firebase from "./firebase";

const AuthContext = React.createContext();

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = React.useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = React.useCallback(async (email, password) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const response = await firebase.auth().signInWithPopup(provider);
    setUser(response.user);
    return response.user;
  }, []);

  const signout = React.useCallback(async () => {
    await firebase.auth().signOut();
    setUser(null);
  }, []);

  // const sendPasswordResetEmail = email => {
  //   return firebase
  //     .auth()
  //     .sendPasswordResetEmail(email)
  //     .then(() => {
  //       return true;
  //     });
  // };
  //
  // const confirmPasswordReset = (code, password) => {
  //   return firebase
  //     .auth()
  //     .confirmPasswordReset(code, password)
  //     .then(() => {
  //       return true;
  //     });
  // };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signout
    // sendPasswordResetEmail,
    // confirmPasswordReset
  };
}

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
const useAuth = () => {
  return React.useContext(AuthContext);
};

export default useAuth;
