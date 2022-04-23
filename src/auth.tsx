import { updateCurrentUser, User } from 'firebase/auth';
import { NextRouter } from 'next/router';
import { useState, useEffect, createContext, useContext } from 'react'
import { auth } from '../firebase/clientApp';
import { useRouter } from 'next/router';

export const AuthContext = createContext<any>(null);

export function useFirebaseAuth() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const clear = () => {
    setCurrentUser(null);
    setLoading(true);
  };

  const formatAuthUser = (user: User) => ({
    uid: user.uid,
    email: user.email
  });

  const signOut = () => {
    auth.signOut().then(clear);
    router.push('/login')
  }

  const protectedRoute = (router: NextRouter) => {
    if (!!!currentUser) {
      router.push('/login');
    }
  }

  const privateRoute = (router: NextRouter, authorizedUserID: string) => {
    protectedRoute(router);
    if (currentUser.uid !== authorizedUserID) {
      router.back();
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    });
  }, []);

  if(loading){
    return <>Loading...</>
  }

  return {
    currentUser,
    loading,
    signOut,
    protectedRoute,
    privateRoute,
  }
}

export const AuthProvider = ({ children }: {children: any}) => {
  const auth = useFirebaseAuth();
  return (
    <AuthContext.Provider
      value={auth}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// followed this tutorial: https://blog.logrocket.com/implementing-authentication-in-next-js-with-firebase/