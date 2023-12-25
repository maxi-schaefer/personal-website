import './Spotify.scss'

const Projects = (props) => {
    const { data, listening_to_spotify } = props

  return listening_to_spotify && (
    <div className="spotify_container">
        <h2>Currently listening to:</h2>
        <a href={`https://open.spotify.com/intl-de/track/${data.track_id}`} target='_blank'>
            <div className='spotify_card'>
                <img src={data.album_art_url}/>
                <div className='song_information'>
                    <h2>{data.song}</h2>
                    <p className='artist'>{data.artist}</p>
                </div>
            </div>
        </a>
    </div>
  )
}

export default Projects