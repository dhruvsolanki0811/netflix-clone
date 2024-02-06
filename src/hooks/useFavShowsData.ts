import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
const url = process.env.API_URL ? process.env.API_URL : "";
export const useFetchFavShows = () => {
  const fetchFavShows = async () => {
    const response = await axios.get(url + "/api/favshows");
    return response.data;
  };
  return useQuery("favshow", fetchFavShows);
};

export const useFetchFavShowStatus = (id: String) => {
  const fetchFavShowStatus = async ({ queryKey }: any) => {
    const response = await axios.post(url + "/api/favshows/getstatus", {
      imdb: id,
    });
    return response.data;
  };
  return useQuery(["show", id], fetchFavShowStatus);
};

export const useAddFavShow = (id:String) => {
  const addSuperHero = async (show: {
    id: String;
    media_type?: string;
    overview?: string;
    poster_path?: string;
    release_date?: string;
    title?: string;
    vote_average?: number;
  }) => {
    await axios.post(url + "/api/favshows", show);
  };
  const queryclient = useQueryClient()
  return useMutation(addSuperHero,{
    onSuccess:()=>{
        queryclient.invalidateQueries(["show", id]),
        queryclient.invalidateQueries("favshow")
    }
  });
};

export const useRemoveFavShow = (id:String) => {
  const RemoveSuperHero = async (id: String) => {
    await axios.delete(url + `/api/favshows?imdb=${id}`);
  };
  const queryclient = useQueryClient()
  return useMutation(RemoveSuperHero,{
    onSuccess:()=>{
        queryclient.invalidateQueries(["show", id]),
        queryclient.invalidateQueries("favshow")
    }
  });
};
