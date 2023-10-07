import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getUsers = async (id) => {
  const response = await axios
    .get("http://localhost:5001/user/all")
    .then((response) => response.data);
  return response;
};
const getUser = async (id) => {
  const response = await axios
    .get(`http://localhost:5001/user/${id}`)
    .then((response) => response.data);
  return response;
};

const addUser = async (data) => {
  const response = await axios
    .post("http://localhost:5001/user", data)
    .then((response) => response.data);
  return response;
};

const editUser = async ({ id, data }) => {
  const response = await axios
    .put(`http://localhost:5001/user/${id}`, data)
    .then((response) => response.data);
  return response;
};

export const useGetUsers = () => {
  return useQuery({ queryKey: ["users"], queryFn: getUsers });
};

export const useGetUser = (id) => {
  return useQuery({ queryKey: ["users", id], queryFn: () => getUser(id) });
};

export const useAddUser = (data) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newUser) => addUser(newUser),
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
};

export const useEditUser = ({ id, data }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUser) => editUser({ id, data: newUser }),
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
};
