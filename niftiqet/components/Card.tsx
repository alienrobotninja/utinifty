
import Image from 'next/image'

const Card = ({
  title,
  description,
  media,

}: {
  title: string
  description: string,
  media: string,
}) => {
  return (
    <div className="flex flex-col w-full h-full nft-card cursor-pointer p-4 hover:transition-all ease-in-out duration-700">
      <div className="media-holder">
          <Image layout="fill" objectFit="cover" src={media} alt="product card"/>
          <span className="stats"></span>
      </div>
      <div className='card-content'>
          <p className="font-bold text-gray-300 sb-bold">{title}</p>
          <p className="text-gray-300 text-xs my-2 sb-light">{description}</p>
      </div>
    </div>
  )
}

export default Card
