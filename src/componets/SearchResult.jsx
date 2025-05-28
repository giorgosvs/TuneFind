import React from 'react'

export const SearchResult = ({item, isFavorite, onToggleFavorite}) => {
  return (
    <div className="card">
      {/* <h4>Name</h4>
      <label htmlFor="">{item.artistName}</label>
      <h4>Track</h4>
      <label htmlFor="">{item.trackName}</label>
      <h4>Collection</h4>
      <label htmlFor="">{item.collectionName}</label> */}
      <img src={item.artworkUrl100} alt={item.trackName} />

      <ul className='results-grid'>
        {item.artistName && <li><strong>Artist: </strong> {item.artistName}</li>}
        {item.trackName && <li><strong>Track: </strong> {item.trackName}</li>}
        {item.collectionName && <li><strong>Collection: </strong> {item.collectionName}</li>}
        {item.releaseDate && (
          <li><strong>Released: </strong>{new Date(item.releaseDate).getFullYear()}</li>
        )}
        {item.previewUrl && (
          <li><audio controls src={item.previewUrl}>Your browser does not support the audio element.</audio></li>
        )}
      </ul>
      <button onClick={() => onToggleFavorite(item)}>
  {isFavorite ? "★ Remove Favorite" : "☆ Add to Favorites"}
</button>
    </div>
  )
}
