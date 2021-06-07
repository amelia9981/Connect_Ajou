# Connect Ajou

<img src="./assets/logo1.png">

## What is this?

It is a mobile application project for international students at Ajou University and Korean students who want to join various exchange programs from Ajou University.

## Tech Stack

React Native, Firebase

## Pages

1. Login/Register
<div style="text-align: center">
  <img width="30%" src="https://user-images.githubusercontent.com/57990029/120586886-52882480-c46f-11eb-97bd-470f6063c4f6.jpeg"/>
  <img width="30%" src="https://user-images.githubusercontent.com/57990029/120587036-8f541b80-c46f-11eb-9c17-e7b9812b7133.PNG"/>
</div>

2. Home
<img width="30%" src="https://user-images.githubusercontent.com/57990029/120586696-f1605100-c46e-11eb-86b1-552732426a1b.PNG"/>

3. Community
<div style="text-align: center">
  <img width="30%" src="https://user-images.githubusercontent.com/57990029/120587689-cb3bb080-c470-11eb-82ce-4d668256917d.PNG"/>
  <img width="30%" src="https://user-images.githubusercontent.com/57990029/120587858-1a81e100-c471-11eb-9c95-b5a6ca6f24a0.PNG"/>
  <img width="30%" src="https://user-images.githubusercontent.com/57990029/120587891-2a012a00-c471-11eb-9a45-b83af8912ae0.PNG"/>
</div>

4. Timetable
<div style="text-align: center">
  <img width="30%" src="https://user-images.githubusercontent.com/57990029/120588006-5ddc4f80-c471-11eb-92f2-356be77c3a48.PNG"/>
  <img width="30%" src="https://user-images.githubusercontent.com/57990029/120588060-764c6a00-c471-11eb-8d0a-b0028a41e8d6.PNG"/>
</div>

5. Notice Notification
<div style="text-align: center">
  <img width="30%" src="https://user-images.githubusercontent.com/57990029/120627703-e6251980-c49e-11eb-8103-336b3fa7cbc2.PNG"/>
</div>

6. Chat
<div style="text-align: center">
  <img width="30%" src="https://user-images.githubusercontent.com/57990029/120627912-1b316c00-c49f-11eb-834a-35e5717708fc.jpeg"/>
</div>

7. My Page
<div style="text-align: center">
  <img width="30%" src="https://user-images.githubusercontent.com/57990029/120628053-3ac89480-c49f-11eb-8268-6132e73b3d17.jpeg"/>
</div>

## Getting Started

### 1. git clone

```
git clone https://github.com/amelia9981/Connect_Ajou.git
```

### 2. run server

```
yarn start
```

### 3. device emulator

- iOS:
  - 1) Click 'Run on iOS simulator' on Expo Developer Tools
  
    ***Warning: You must encounter this alert when you run this app on the emulator***
    <div style="text-align: center">
      <img width="30%" src="https://user-images.githubusercontent.com/57990029/120945800-5a98da80-c775-11eb-8f78-6b732845edd1.png"/>
    </div>
    
    You should change App.js like this:
    ```
    export default function App() {
    const [fontloaded, setFontsLoaded] = useState(false);
    const [loaded, setLoaded] = useState(true);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");
    const [notification, setNotification] = useState({});
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
      // SKIP THESE LINES!
      // registerForPushNotification().then((token) => setToken(token));
      // notificationListener.current =
      //   Notifications.addNotificationReceivedListener((notification) => {
      //     setNotification(notification);
      //   });
      // responseListener.current =
      //   Notifications.addNotificationResponseReceivedListener((response) => {
      //     console.log(response);
      //   });

      const usersRef = firebase.firestore().collection("users");
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          usersRef
            .doc(user.email)
            .get()
            .then((document) => {
              const userData = document.data();
              setLoaded(false);
              setUser(userData);
            })
            .catch((error) => {
              setLoaded(false);
            });
        } else {
          setLoaded(false);
        }
      });

      return () => {
        // SKIP THESE LINES!
        // Notifications.removeNotificationSubscription(
        //   notificationListener.current
        // );
        // Notifications.removeNotificationSubscription(responseListener.current);
        unsubscribe();
      };
    }, []);
    ```
    
    
  - 2) Download Expo app in your phone and scan the QR code with your camera **(RECOMMENDED)**


- Android: Download Expo app in your phone and scan the QR code on Expo Developer Tools **(RECOMMENDED)**

## Contact

<img alt="Gmail" src="https://img.shields.io/badge/amelia9981@gmail.com-D14836?&logo=gmail&logoColor=white" />
<img alt="Gmail" src="https://img.shields.io/badge/hanjieun9874@gmail.com-D14836?&logo=gmail&logoColor=white" />
