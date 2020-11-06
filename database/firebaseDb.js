
import firebase from "firebase";
import "firebase/firestore";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const firebaseConfig = {
  apiKey: "AIzaSyBSrgJWqUkma_Z0yOfzHJUmZh2HuWU7JcQ",
  authDomain: "citycleaner-d5ad9.firebaseapp.com",
  databaseURL: "https://citycleaner-d5ad9.firebaseio.com",
  projectId: "citycleaner-d5ad9",
  storageBucket: "citycleaner-d5ad9.appspot.com",
  messagingSenderId: "795300739759",
  appId: "1:795300739759:web:fea5d27510b865edffb25a"
};


firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
