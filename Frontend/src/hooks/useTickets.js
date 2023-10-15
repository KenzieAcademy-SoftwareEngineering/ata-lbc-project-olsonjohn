import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {React, useCallback, useState} from 'react';

export const getTickets = async (id) => {
  const response = await axios
    .get("http://localhost:5001/ticket/all")
    .then((response) => response.data);

  return response;
};
export const getTicket = async (id) => {
  const response = await axios
    .get(`http://localhost:5001/ticket/${id}`)
    .then((response) => response.data);
  return response;
};

export const addTicket = async (data) => {
  console.log({data})
  const response = await axios
    .post("http://localhost:5001/ticket", data)
    .then((response) => response.data);
  return response;
};

const editTicket = async ({id, data}) => {
  const response = await axios
    .put(`http://localhost:5001/ticket/${id}`, data)
    .then((response) => response.data);
  return response;
};

export const deleteTicket = async (id) => {
  const response = await axios
  .delete(`http://localhost:5001/ticket/${id}`)
  .then((response) => response.data)
  return response
}

export const changeTicketStatus = async (id, ticket) => {
  const response = await axios
  .put(`http://localhost:5001/ticket/${id}`, ticket)
  .then(response => response.data)
  return response
}

export const useGetTickets = () => {
  const [statusFilter, setStatusFilter] = useState("new");
  const filterTickets = (data)=> {
      if (statusFilter) {
        return data.data.filter((ticket) => {
          console.log(ticket)
          return ticket.status === statusFilter;
        })
      }
      return data;
    }

  return useQuery({queryKey: ["tickets"], queryFn: getTickets});

}
  export const useGetTicket = (id) => {
    return useQuery({queryKey: ["tickets", id], queryFn: () => getTicket(id)});
  };

  export const useAddTicket = (data) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (newTicket) => addTicket(newTicket),
      onSuccess: () => queryClient.invalidateQueries(["tickets"]),
    });
  };

  export const useEditTicket = ({id, data}) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (newTicket) => editTicket({id, data: newTicket}),
      onSuccess: () => queryClient.invalidateQueries(["tickets"]),
    });
  };
