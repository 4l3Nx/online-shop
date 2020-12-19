import firebase from 'firebase/app';

import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';

const config = {
    apiKey: "AIzaSyB438AGDZEQfUCtx_YdSXtC4ad2lLJSoPU",
    authDomain: "continuumtraining-8543c.firebaseapp.com",
    databaseURL: "https://continuumtraining-8543c.firebaseio.com",
    projectId: "continuumtraining-8543c",
    storageBucket: "continuumtraining-8543c.appspot.com",
    messagingSenderId: "530150975851",
    appId: "1:530150975851:web:181b6c750609f9dccbc42e"
  }


  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firebasestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {

      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set ({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }

    }

    return userRef;

  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firebasestore = firebase.firestore();


  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;