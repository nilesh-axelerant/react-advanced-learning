import { useCallback, useEffect, useRef, useState } from 'react'
import { parseLinkHeader } from './parseLinkHeader'

export function GridInfiniteScroll() {
  const [photos, setPhotos] = useState([])
  const nextPhotosLinkRef = useRef()
  const [isLoading, setIsLoading] = useState(false)

  async function fetchPhotos(url, {overwrite = false} = {}) {

    setIsLoading(true)
    await new Promise(res => setTimeout(res, 1000))

    try {
      const res = await fetch(url)
      nextPhotosLinkRef.current = parseLinkHeader(res.headers.get('link')).next
      const photos = await res.json()
      if (overwrite) {
        setPhotos(photos)
      }
      else {
        setPhotos( prevPhotos => {
          return [...prevPhotos, ...photos]
        })
      }
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false)
    }

  }

  const imageRef = useCallback( image => {
    if (image === null) return

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchPhotos(nextPhotosLinkRef.current)
        observer.unobserve(image)
      }
    })
    observer.observe(image)
  }, [])

  useEffect(() => {
    fetchPhotos("http://127.0.0.1:3000/photos?_page=1&limit=10")
  }, [])

  return (
    <div className="grid">

      { photos.map((photo, index) => (
        <img src={photo.url} key={photo.id} ref={index===photos.length-1 ? imageRef : undefined} />
      ))}

      {isLoading && (
        Array.from({length: 10}, (_, index) => index).map(n => {
          return (
            <div key={n} className="skeleton">Loading...</div>
          )
        }))

    }
    </div>
  )
}
