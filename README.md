# Create react project

`npm init react-app appName`

# Create a project `wds-react-auth-dev` without analytical option in firebase

- create same for a production project `wds-react-auth-prod`
- enable signup method: `under project overview>Build>Authentication>Sign-in Method>enable email/password section`
- there are other signup method, we can enable them as needed
- under save `Authentication` tab there is `Authorized Domain`, we allow localhost in dev environment and in production environment we disallow/delete localhost
- on Project overview main content there are icons to create app for the project
- we click on web app icon and register `wds-react-auth-dev` app
- there we will get our api and config json file

  ```js
  var firebaseConfig = {
    apiKey: "",
    authDomain: "m",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  };
  ```

# create .env.local

- .env.local is for storing environment variable
- it will not push in the git
- changing local environment variable for production is easy
- no need to change app code

# install firebase

- `npm i firebase`

# firebase initialization

- create a `firebase.js` under src
- import firebase/app and firebase auth

  ```js
  import firebase from "firebase/app";
  import "firebase/auth";
  ```

- create app

  ```js
  const app = firebase.initializeApp({
    apiKey: process.env.REACT_WDS_AUTH_FIREBASE_API_KEY,
    authDomain: process.env.REACT_WDS_AUTH_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_WDS_AUTH_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_WDS_AUTH_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_WDS_AUTH_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_WDS_AUTH_FIREBASE_APP_ID,
  });
  export const auth = app.auth();
  export default app;
  ```

# install bootstrap and react-bootstrap

- `npm i bootstrap react-bootstrap`

# app cleanup

- remove all but App.js and index.js, and other npm and git files
- move App to components
- remove any unused import
- fix App import in index.js
- App return "Hello world"
- run the project `npm start`

# authContext

```js
const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const value={objects}
    return (
<AuthContext.Provider value={value}>
  {!loading && children}
</AuthContext.Provider>;
)
}
```

```js
function signup(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}
function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}
function logout() {
  return auth.signOut();
}

function resetPassword(email) {
  return auth.sendPasswordResetEmail(email);
}
function updateEmail(email) {
  return currentUser.updateEmail(email);
}
function updatePassword(password) {
  return currentUser.updatePassword(password);
}
const value = {
  currentUser,
  signup,
  login,
  logout,
  resetPassword,
  updateEmail,
  updatePassword,
};
```
