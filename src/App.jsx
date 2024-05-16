import { useState , useEffect } from 'react'
import { Header , Footer } from './components'
import { useDispatch } from 'react-redux';
import authservices from './appwrite/authentication';
import { login , logout } from './store/authSlice';

function App() {
  const [loading , setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
        try {
            const UserData = await authservices.getCurrentUser();
            if (UserData) {
                dispatch(login(UserData));
            } else {
                dispatch(logout());
                console.log("User logged out successfully");
            }
        } catch (err) {
            console.log("There is an error:", err);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, [dispatch]);

  return (
    <>
     {
      loading?(
        <p>Loading...........</p>
      ):(
        <div>
      <Header/>
      <h1>HEllo</h1>
      <Footer/>
     </div>
      )
     }
    </>
  )
}

export default App
