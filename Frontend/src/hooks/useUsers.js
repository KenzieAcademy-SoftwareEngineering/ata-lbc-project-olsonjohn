import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async (id) => {
  const response = await axios
    .get("http://localhost:5001/user/all")
    .then((response) => response.data);
  return response;
};
const fetchUsersId = async (id) => {
  const response = await axios
    .get(`http://localhost:5001/user/${id}`)
     .then((response) => response.data);
  return response;
};


export const useUsers = () => {
  return useQuery({ queryKey: ["users"], queryFn: fetchUsers });
};

export const useUsersId = (id) => {
  return useQuery({ queryKey: ["users", id], queryFn: () => fetchUsersId(id) });
};



// export const useUsersID = (id) => {
//   return useQuery({ queryKey: ["users", id], queryFn: fetchUsers(id) });
// };