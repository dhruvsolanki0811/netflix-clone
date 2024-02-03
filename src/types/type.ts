export type Show = {
    adult: boolean
    backdrop_path: string | null
    media_type: string | null
    budget: number | null
    homepage: string | null
    showId: string
    id: number
    imdb_id: string | null
    original_language: string
    original_title: string | null
    overview: string | null
    popularity: number
    poster_path: string | null
    number_of_seasons: number | null
    number_of_episodes: number | null
    release_date: string | null
    first_air_date: string | null
    last_air_date: string | null
    revenue: number | null
    runtime: number | null
    status: string | null
    tagline: string | null
    title: string | null
    name: string | null
    video: boolean
    vote_average: number
    vote_count: number
  }

export type CategorizedShows = {
    title: string
    shows: Show[]
}

export type VideoResult = {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
  }
  

  export  interface Episode {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    runtime: number;
    season_number: number;
    show_id: number;
    vote_average: number;
    vote_count: number;
    still_path:string
}

export interface Season {
  _id: string|number;
  air_date: string;
  name: string;
  overview: string;
  id: number|string;
  poster_path: string;
  season_number: number;
  vote_average: number;
  episodes:Episode[]
}