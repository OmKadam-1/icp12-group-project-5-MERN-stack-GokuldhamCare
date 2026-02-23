import { useState } from "react"
import tipsData from "../../configs/tipsData"
import TipsList from "./TipsList"
import CategoryFilter from "./CategoryFilter"
import Footer from "../../components/Footer"
import NavbarPatient from "../../components/NavbarPatient"

function HealthTips() {

  const [category, setCategory] = useState("All")

  const filteredTips =
    category === "All"
      ? tipsData
      : tipsData.filter((tip) => tip.category === category)

  return (
    <>
    <NavbarPatient/>

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center mb-8 text-green-600">

        Health Tips & Awareness

      </h1>

      <CategoryFilter setCategory={setCategory} />

      <TipsList tips={filteredTips} />

    </div>
    <Footer/>
</>
  )
}

export default HealthTips