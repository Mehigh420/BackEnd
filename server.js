const express = require('express')
const morgan = require('morgan');
const { initializeApp } =require ("firebase/app");
const { getFirestore } =require ("@firebase/firestore");
const { addDoc, collection } =require ("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCLZuj-3P0FVYpvqhjvwCQVIYeYK4JRckE",
  authDomain: "social-media-3748f.firebaseapp.com",
  projectId: "social-media-3748f",
  storageBucket: "social-media-3748f.appspot.com",
  messagingSenderId: "253386140898",
  appId: "1:253386140898:web:ab2bde9e91e23d4be402bb"
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const ref = collection(firestore, "test1");
const app = express();
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
const SaveMessage = async(message) =>{
  console.log(message);

  let data = {
      message,
  }

  try{
   
      addDoc(ref, data);

  } catch(e){
      console.log('Not working', e);
  }
}

app.post(
  "/sendMessage", async (req, res) => {
    console.log(req.body)
    await SaveMessage(req.body.message)
    res.send("message received")
  }
)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on port ${port}`))