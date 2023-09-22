package com.kenzie.appserver.service;

import com.kenzie.appserver.repositories.TicketRepository;
import com.kenzie.appserver.repositories.model.TicketRecord;
import com.kenzie.appserver.service.model.Ticket;

import java.util.ArrayList;
import java.util.List;

public class TicketService {
    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public Ticket createTicket(Ticket ticket) {
        TicketRecord ticketRecord = createTicketRecord(ticket);
        ticketRepository.save(ticketRecord);
        return ticket;
    }

    public Ticket findByTicketId(String ticketId) {
        Ticket ticket = ticketRepository
                .findById(ticketId)
                .map(ticketRecord -> new Ticket(
                        ticketRecord.getTicketId(),
                        ticketRecord.getTicketSubject(),
                        ticketRecord.getTicketDescription(),
                        ticketRecord.getTicketStatus(),
                        ticketRecord.getCreatedAt(),
                        ticketRecord.getFinishedAt(),
                        ticketRecord.getCustomerId(),
                        ticketRecord.getUsers()))
                .orElse(null);
        return ticket;
    }

    //TODO: create method to Find ALL tickets for a customer id using the GSI

    //TODO: UPDATE ticket method

    public List<Ticket> findAll() {
        List<Ticket> tickets = new ArrayList<>();
        ticketRepository
                .findAll()
                .forEach(ticket -> tickets.add(new Ticket(
                        ticket.getTicketId(),
                        ticket.getTicketSubject(),
                        ticket.getTicketDescription(),
                        ticket.getTicketStatus(),
                        ticket.getCreatedAt(),
                        ticket.getFinishedAt(),
                        ticket.getCustomerId(),
                        ticket.getUsers())));
        return tickets;
    }

    public TicketRecord createTicketRecord(Ticket ticket) {
        TicketRecord ticketRecord = new TicketRecord();
        ticketRecord.setTicketId(ticket.getTicketId());
        ticketRecord.setTicketSubject(ticket.getTicketSubject());
        ticketRecord.setTicketDescription(ticket.getTicketDescription());
        ticketRecord.setTicketStatus(ticket.getTicketStatus());
        ticketRecord.setCreatedAt(ticket.getCreatedAt());
        ticketRecord.setFinishedAt(ticket.getFinishedAt());
        ticketRecord.setCustomerId(ticket.getCustomerId());
        ticketRecord.setUsers(ticket.getUsers());
        return ticketRecord;
    }
}
