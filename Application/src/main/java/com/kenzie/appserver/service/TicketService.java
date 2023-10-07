package com.kenzie.appserver.service;

import com.kenzie.appserver.exception.ResourceNotFoundException;
import com.kenzie.appserver.repositories.TicketRepository;
import com.kenzie.appserver.repositories.model.TicketRecord;
import com.kenzie.appserver.repositories.model.TicketStatus;
import com.kenzie.appserver.service.model.Ticket;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
public class TicketService {
    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public Ticket createTicket(Ticket ticket) throws IllegalArgumentException {
        TicketRecord ticketRecord = createTicketRecord(ticket);
        ticketRepository.save(ticketRecord);
        return ticket;
    }

    public Ticket findByTicketId(String ticketId) throws IllegalArgumentException, NullPointerException {
        return ticketRepository
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
                .orElseThrow(() -> new ResourceNotFoundException("Ticket does not exist with id: " + ticketId));
    }

    public List<Ticket> findAll() throws IllegalArgumentException, NullPointerException {
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

    public List<Ticket> findTicketsForCustomerId(String customerId) throws IllegalArgumentException, NullPointerException {
        List<Ticket> tickets = new ArrayList<>();
        ticketRepository
                .findAllById(Collections.singleton(customerId))
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
        if (ticket != null) {
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
        } else {
            throw new IllegalArgumentException("Input ticket can not be null");
        }
    }

    public Ticket updateTicket(String ticketId, Ticket updateTicket) throws IllegalArgumentException {
        TicketRecord ticketRecord = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + ticketId));
        if (updateTicket.getTicketStatus() != null && updateTicket.getTicketStatus().equals(TicketStatus.COMPLETED)) {
            ticketRecord.setFinishedAt(ZonedDateTime.now());
            ticketRecord.setTicketStatus(updateTicket.getTicketStatus());
        } else if (updateTicket.getTicketStatus() != null && updateTicket.getTicketStatus() != ticketRecord.getTicketStatus()) {
            ticketRecord.setTicketStatus(updateTicket.getTicketStatus());
        }
        if (updateTicket.getTicketSubject() != null && !Objects.equals(updateTicket.getTicketSubject(), ticketRecord.getTicketSubject())) {
            ticketRecord.setTicketSubject(updateTicket.getTicketSubject());
        }
        if (updateTicket.getTicketDescription() != null && !Objects.equals(updateTicket.getTicketDescription(), ticketRecord.getTicketDescription())) {
            ticketRecord.setTicketDescription(updateTicket.getTicketDescription());
        }
        if (updateTicket.getUsers() != null && !Objects.equals(updateTicket.getUsers(), ticketRecord.getUsers())) {
            ticketRecord.setUsers(updateTicket.getUsers());
        }
        ticketRepository.save(ticketRecord);
        return new Ticket(ticketRecord);
    }

    public void deleteTicket(String ticketId) throws IllegalArgumentException {
        TicketRecord ticketRecord = ticketRepository
                .findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket does not exist with id: " + ticketId));
        ticketRepository.delete(ticketRecord);
    }

}
