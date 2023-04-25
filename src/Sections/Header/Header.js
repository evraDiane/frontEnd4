import React ,{useEffect , useState} from 'react'
import './Header.css'
import { useSelector } from 'react-redux'
import { CreateAcountPopUp } from '../../components/index'

const Header = () => {
    const user = useSelector((state) => state.user)
    const [loginUser , setLoginUser] = useState(false)
    useEffect(() => {
        const loggedInUser = localStorage.getItem("LoggedIn")
        if(loggedInUser !== null){
            const found = JSON.parse(loggedInUser)
            setLoginUser(found)
        }else{
            setLoginUser(false)
        }
    },[user.login])
return (
    <div className='header'>
        <div className='header-overlay'>
            <div className='contenu'>
                <h1>Your Are Welcome There</h1>
                <p>we are Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
            </div>
            <div className='button-area'>
                {loginUser ? null :<CreateAcountPopUp title="Create Acount" className="btn-header"/>}
            </div>
        </div>
    </div>
)
}

export default Header