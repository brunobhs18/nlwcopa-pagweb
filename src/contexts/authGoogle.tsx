import { createContext, useState, ReactNode, useEffect } from "react";
// import { signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
// import { auth } from "../service/firebase";
// import { Navigate } from "react-router-dom";

// interface UserProps {
//   name: string;
//   avatarUrl: string;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export interface AuthContextDataProps {
//   user: UserProps;
//   signIn: () => Promise<void>;
// }
// const provider = new GoogleAuthProvider();

// export const AuthGoogleContext = createContext({} as AuthContextDataProps)



// export function AuthGoogleProvider({ children }: AuthProviderProps){
    
//     const [user, setUser] = useState<User>({} as User);    

           
//       function signIn() {
//          signInWithPopup(auth, provider)
//          .then((result) => {    
//            setUser(result.user)
//          }).catch((error) => {    
//            console.log(error); 
//          });
//   }
    
//   function signOut(){
//     sessionStorage.clear();
//     setUser('');
//     return <Navigate to="/" />;
//   }

//   return (<AuthGoogleContext.Provider 
//     value={{ 
//       signed: !!user,
//       user,
//       signIn,
//       signOut,
//     }}
//     >
//       {children}
//       </AuthGoogleContext.Provider>
//   );

  
// }

