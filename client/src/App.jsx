import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Curriculum from './pages/Curriculum/CurriculumPage';
import Extracurricular from './pages/Extracurricular/ExtracurricularPage';
import TeacherPage from './pages/Teachers/TeacherPage';
import FacilitiesPage from './pages/Facilities/FacilitiesPage';
import ClassesPage from './pages/Classes/ClassesPage';
import SchedulePage from './pages/Schedules/SchedulePage';
import SubjectPage from './pages/Schedules/SubjectPage';

export default function App() {
  return (
    <main className="overflow-x-hidden bg-white text-dark">
    <BrowserRouter>
      {/* header */}
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/extracurricular' element={<Extracurricular />} />
          <Route path='/curriculum' element={<Curriculum />} />
          <Route path='/teacher' element={<TeacherPage />} />
          <Route path='/facilities' element={<FacilitiesPage />} />
          <Route path='/classes' element={<ClassesPage />} />
          <Route path='/schedules' element={<SchedulePage />} />
          <Route path='/subject' element={<SubjectPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
    </main>
  );
}
