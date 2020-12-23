import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();
  }
  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);
  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then((snapshot) => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  // *** Message API ***
  message = (uid) => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref("messages");
}

export default Firebase;

// Ścieżki w metodzie ref () odpowiadają lokalizacji, w której Twoje encje (użytkownicy) będą przechowywane
//  w interfejsie API bazy danych czasu rzeczywistego Firebase. Jeśli usuniesz użytkownika
//   pod adresem „users / 5”, użytkownik o identyfikatorze 5 zostanie usunięty z bazy danych.
//    Jeśli utworzysz nowego użytkownika w grupie „Użytkownicy”, Firebase utworzy identyfikator
//     za Ciebie i przypisze wszystkie przekazane mu informacje. Ścieżki są zgodne
//     z filozofią REST, w której każda jednostka (np. Użytkownik, wiadomość, książka, autor)
//     jest powiązana z identyfikatorem URI, a metody HTTP służą do tworzenia, aktualizowania,
//      usuwania i pobierania jednostek. W Firebase RESTful URI staje się prostą ścieżką,
//  a metody HTTP stają się interfejsem API Firebase.
