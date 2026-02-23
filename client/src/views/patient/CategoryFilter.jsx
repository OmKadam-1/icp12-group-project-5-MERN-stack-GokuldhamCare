function CategoryFilter({ setCategory }) {

  const categories = ["All", "General", "Fitness", "Diet", "Mental"]

  return (

    <div className="flex justify-center gap-4 mb-8 flex-wrap">

      {categories.map((cat) => (

        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          {cat}
        </button>

      ))}

    </div>

  )
}

export default CategoryFilter