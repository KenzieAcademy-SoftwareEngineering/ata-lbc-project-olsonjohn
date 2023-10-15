import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const getCustomers = async () => {
  const response = await axios
    .get("http://localhost:5001/customer/all")
    .then((response) => response.data);
  return response;
};
export const getCustomer = async (id) => {
  const response = await axios
    .get(`http://localhost:5001/customer/${id}`)
    .then((response) => response.data);
  return response;
};

export const addCustomer = async (data) => {
  const response = await axios
    .post("http://localhost:5001/customer", data)
    .then((response) => response.data);
  return response;
};

export const editCustomer = async (id, data) => {
  const response = await axios
    .put(`http://localhost:5001/customer/${id}`, data)
    .then((response) => response.data);
  return response;
};

export const deleteCustomer = async (id) => {
  const response = await axios
  .delete(`http://localhost:5001/customer/${id}`)
  .then((response) => response.data);
  return response;
};


export const useGetCustomers = () => {
  return useQuery({ queryKey: ["customers"], queryFn: getCustomers });
};

export const useGetCustomer = (id) => {
  return useQuery({ queryKey: ["customers", id], queryFn: () => getCustomer(id) });
};

export const useAddCustomer = (data) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCustomer) => addCustomer(newCustomer),
    onSuccess: () => queryClient.invalidateQueries(["customers"]),
  });
};

export const useEditCustomer = ({id, data }) => {
  const queryClient = useQueryClient();
  const {mutate} =  useMutation({
    mutationFn: (newCustomer) => editCustomer({ data}),
    onSuccess: () => queryClient.invalidateQueries(["customers"]),
  });
return mutate
};


export const usePrefetchCustomer = async (id) => {
  const queryClient = useQueryClient();
  await queryClient.prefetchQuery({ queryKey: ["customers", id], queryFn: () => getCustomer(id) })
}