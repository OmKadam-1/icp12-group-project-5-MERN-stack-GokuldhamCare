import { useState } from "react"
import tipsData from "../tipsData"
import TipsList from "../TipsList"
import CategoryFilter from "../CategoryFilter"

function HealthTips() {

  const [category, setCategory] = useState("All")

  const filteredTips =
    category === "All"
      ? tipsData
      : tipsData.filter((tip) => tip.category === category)

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center mb-8 text-green-600">

        Health Tips & Awareness

      </h1>

      <CategoryFilter setCategory={setCategory} />

      <TipsList tips={filteredTips} />

    </div>

  )
}

export default HealthTips