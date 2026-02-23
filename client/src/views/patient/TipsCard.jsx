function TipCard({ title, description, image }) {

  return (

    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 text-center">

      <img
        src={image}
        className="w-20 mx-auto mb-4"
      />

      <h2 className="text-xl font-semibold mb-2">
        {title}
      </h2>

      <p className="text-gray-600">
        {description}
      </p>

    </div>

  )
}

export default TipCard