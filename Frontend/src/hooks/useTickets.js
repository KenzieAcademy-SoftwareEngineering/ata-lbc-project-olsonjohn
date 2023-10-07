import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getTickets = async (id) => {
  const response = await axios
    .get("http://localhost:5001/ticket/all")
    .then((response) => response.data);
  return response;
};
const getTicket = async (id) => {
  const response = await axios
    .get(`http://localhost:5001/ticket/${id}`)
    .then((response) => response.data);
  return response;
};

const addTicket = async (data) => {
  const response = await axios
    .post("http://localhost:5001/ticket", data)
    .then((response) => response.data);
  return response;
};

const editTicket = async ({ id, data }) => {
  const response = await axios
    .put(`http://localhost:5001/ticket/${id}`, data)
    .then((response) => response.data);
  return response;
};

export const useGetTickets = () => {
  return useQuery({ queryKey: ["tickets"], queryFn: getTickets });
};

export const useGetTicket = (id) => {
  return useQuery({ queryKey: ["tickets", id], queryFn: () => getTicket(id) });
};

export const useAddTicket = (data) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTicket) => addTicket(newTicket),
    onSuccess: () => queryClient.invalidateQueries(["tickets"]),
  });
};

export const useEditTicket = ({ id, data }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTicket) => editTicket({ id, data: newTicket }),
    onSuccess: () => queryClient.invalidateQueries(["tickets"]),
  });
};
