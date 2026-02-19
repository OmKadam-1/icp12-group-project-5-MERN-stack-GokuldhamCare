import PatientNavbar from "../../components/NavbarPatient.jsx"
import HeaderSection from "../../components/HeaderSection.jsx"
import Certificate from '../../components/Certificate.jsx'
import TeamSection from '../../components/TeamSection.jsx'
import Footer from '../../components/Footer.jsx'

function PatientDashboard() {
  return (
    <div>
      <PatientNavbar />
      <HeaderSection />
      <Certificate />
      <TeamSection />
      <Footer />
    </div>
  )
}

export default PatientDashboard;