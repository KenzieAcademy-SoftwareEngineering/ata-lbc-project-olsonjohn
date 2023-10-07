import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchPictures = async () => {
  const response = await axios
    .get("https://randomuser.me/api/?results=1000&gender=male&nat=us&inc=picture&noinfo")
    .then((response) => response.data);
  return response;
};

export const usePictures = () => {
  return useQuery({ queryKey: ["pictures"], queryFn: fetchPictures, staleTime: Infinity });
};
