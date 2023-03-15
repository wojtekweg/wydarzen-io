import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../config.json'
import placeholder from '../assets/placeholder.png'
import handleError from '../helpers/helpers'

const Places = () => {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    refreshPlaces()
  }, [])

  const refreshPlaces = async () => {
    axios
      .get(`${config.url}places/`)
      .then((res) => setPlaces(res.data))
      .catch((err) => handleError(err))
  }

  const renderPlaces = () => {
    return places.map((place) => (
      <div
        className='lg:w-1/4 md:w-1/2 p-4 w-full 
        shadow-lg hover:shadow-2xl
        m-4 '
        key={place.id}>
        <a className='block relative h-48 rounded overflow-hidden' href={`places/${place.id}`}>
          <img
            alt='ecommerce'
            class='object-cover object-center w-full h-full block'
            style={{ position: 'inherit', zIndex: -1 }}
            src={place.picture || placeholder}
          />
        </a>
        <div className='mt-4'>
          <h3 class='text-gray-500 text-xs tracking-widest title-font mb-1'>{place.country}</h3>
          <h2 className='text-gray-900 dark:text-zinc-200 title-font text-lg font-medium'>
            <a href={`places/${place.id}`}>{place.name}</a>
          </h2>
          <p className='mt-1'>
            {place.lat}, {place.long}
          </p>
        </div>
      </div>
    ))
  }

  return (
    <section class='text-gray-600 body-font'>
      <div class='container px-5 py-24 mx-auto'>
        <div class='flex flex-wrap m-4 justify-center'>{renderPlaces()}</div>
      </div>
    </section>
  )
}

export default Places
