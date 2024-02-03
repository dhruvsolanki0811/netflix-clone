import { useQuery } from 'react-query'
import axios from 'axios'
import { Show, VideoResult } from '@/types/type';


const fetchMovieTrailer = async ({queryKey}:any) => {
    const movie_id = queryKey[2]
    const media_type= queryKey[1]
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/${media_type}/${movie_id}/videos`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN_TMDB}`
          }
        });
    
        const data=response.data.results;
        const trailer=(data.filter((vid:VideoResult)=>vid.type=='Trailer').length>0)?data.filter((vid:VideoResult)=>vid.type=='Trailer')[0]:data[0]
        return trailer;
      } catch (error) {
        throw new Error('Failed to fetch trending movies');
      }
  }


  export const useFetchMovieTrailer = (movie_id:string,media_type:string) => {
    return useQuery(['Movie Trailer',media_type,movie_id],fetchMovieTrailer)
  }

  