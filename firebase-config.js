import { initializeApp } from 'firebase/app'
import { getAuth,GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAWSPlqPL6F-ejmIII2CuMF3ri5iyy4qGs',
  authDomain: 'medium-clone-8e7f7.firebaseapp.com',
  projectId: 'medium-clone-8e7f7',
  storageBucket: 'medium-clone-8e7f7.appspot.com',
  messagingSenderId: '144738514660',
  appId: '1:144738514660:web:84eccbdb2d9da7b4809ef1',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
