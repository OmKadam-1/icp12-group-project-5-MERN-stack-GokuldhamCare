import TipsCard from "./TipsCard"

function TipsList({ tips }) {

  return (

    <div className="grid md:grid-cols-2 sm:grid-cols-2 gap-5">

      {tips.map((tip) => (

        <TipsCard
          key={tip.id}
          title={tip.title}
          description={tip.description}
          image={tip.image}
        />

      ))}

    </div>

  )
}

export default TipsList