import './App.css';
import { Home } from './Pages/index'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CreateEmployeAsAdmin, HomeAdminDashBord, DashbordAdmin, SignUpAdmin, RequierdSignIn } from './components/Admin/index'
import { EmployeDetails, ProfileUtilisateur, SignInEmploye, ProfileEmploye, Messenger, Payment , HistoriqueChat, MentionLegal} from './components/index'
import { AuthProvider } from './components/Admin/authAdmin'

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
            <Routes>
              {/* Public Route */}
              <Route path='/' element={<Home />} />
              <Route path='/employes/:pseudo_employe' element={<EmployeDetails />} />
              <Route path='/payment' element={<Payment />} />
              <Route path='/mention-legal' element = {<MentionLegal />}/>
              {/* Private Route */}
              <Route path='profile/:pseudo' element={<ProfileUtilisateur />} />
              <Route path='employe/profile/:pseudoEmploye' element={<ProfileEmploye />} />
              <Route path='/employe' element={<SignInEmploye />} />
              <Route path='/admin' element={<SignUpAdmin />} />
              <Route path='/admin/dashbord' element={<RequierdSignIn><DashbordAdmin /></RequierdSignIn>}>
                <Route path='home' element={<RequierdSignIn><HomeAdminDashBord /></RequierdSignIn>} />
                <Route path='createEmploye' element={<RequierdSignIn><CreateEmployeAsAdmin /></RequierdSignIn>} />
              </Route>
              <Route path='/messenger' element={<Messenger />} />
              <Route path='/historique-message' element={<HistoriqueChat />} />
            </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
