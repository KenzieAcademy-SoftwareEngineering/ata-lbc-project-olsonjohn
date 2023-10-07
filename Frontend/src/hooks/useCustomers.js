import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getCustomers = async (id) => {
  const response = await axios
    .get("http://localhost:5001/customer/all")
    .then((response) => response.data);
  return response;
};
const getCustomer = async (id) => {
  const response = await axios
    .get(`http://localhost:5001/customer/${id}`)
    .then((response) => response.data);
  return response;
};

const addCustomer = async (data) => {
  const response = await axios
    .post("http://localhost:5001/customer", data)
    .then((response) => response.data);
  return response;
};

const editCustomer = async ({ id, data }) => {
  const response = await axios
    .put(`http://localhost:5001/customer/${id}`, data)
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

export const useEditCustomer = ({ id, data }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCustomer) => editCustomer({ id, data: newCustomer }),
    onSuccess: () => queryClient.invalidateQueries(["customers"]),
  });
};
