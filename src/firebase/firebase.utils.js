import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB1zEHEIq1LeHh6G53tZndHIByfUAPsP-0",
    authDomain: "crwn-db-4f0ff.firebaseapp.com",
    databaseURL: "https://crwn-db-4f0ff.firebaseio.com",
    projectId: "crwn-db-4f0ff",
    storageBucket: "crwn-db-4f0ff.appspot.com",
    messagingSenderId: "217544544631",
    appId: "1:217544544631:web:49ca5b6c0c0b7a01029172"
  };

export const createUserProfileDocument = async(userAuth,additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const {displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })

    }catch(error){
      console.log('Error creating User', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
