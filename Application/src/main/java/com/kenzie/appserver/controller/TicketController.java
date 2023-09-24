package com.kenzie.appserver.controller;

import com.kenzie.appserver.controller.model.TicketCreateRequest;
import com.kenzie.appserver.controller.model.TicketResponse;
import com.kenzie.appserver.controller.model.TicketUpdateRequest;
import com.kenzie.appserver.converter.UserListConverter;
import com.kenzie.appserver.repositories.model.TicketStatus;
import com.kenzie.appserver.service.TicketService;
import com.kenzie.appserver.service.model.Ticket;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/ticket")
public class TicketController {
    private TicketService ticketService;

    TicketController(TicketService ticketService) {this.ticketService = ticketService;}

    @PostMapping
    public ResponseEntity<TicketResponse> addNewTicket(@RequestBody TicketCreateRequest ticketCreateRequest) {
        Ticket ticket = new Ticket(ticketCreateRequest);
        ticket.setUsers(new ArrayList<>());
        ticket.setTicketStatus(TicketStatus.NEW);
        ticketService.createTicket(ticket);

        TicketResponse ticketResponse = new TicketResponse(ticket);

        return ResponseEntity.created(URI.create("/ticket/" + ticketResponse.getTicketId())).body(ticketResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponse> getTicket(@PathVariable("id")String ticketId) {
        Ticket ticket = ticketService.findByTicketId(ticketId);
        if (ticket == null) {
            return ResponseEntity.notFound().build();
        }
        TicketResponse ticketResponse = new TicketResponse(ticket);
        return ResponseEntity.ok(ticketResponse);
    }

    @GetMapping("/all")
    public ResponseEntity<List<TicketResponse>> getAllTickets() {
        List<Ticket> tickets = ticketService.findAll();

        List<TicketResponse> responses = tickets.stream().map(TicketResponse::new).collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    @GetMapping("by-customer/{customerId}")
    public ResponseEntity<List<TicketResponse>> getTicketsForCustomerId(@PathVariable("customerId")String customerId) {
        List<Ticket> tickets = ticketService.findTicketsForCustomerId(customerId);

        List<TicketResponse> responses = tickets.stream().map(TicketResponse::new).collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TicketResponse> updateTicket(@PathVariable("id")String ticketId, @RequestBody TicketUpdateRequest ticketUpdateRequest) {
        UserListConverter userListConverter = new UserListConverter();
        Ticket updateTicket = ticketService.findByTicketId(ticketId);
        updateTicket.setTicketDescription(ticketUpdateRequest.getTicketDescription());
        updateTicket.setUsers(ticketUpdateRequest.getUsers());
        updateTicket.setTicketStatus(ticketUpdateRequest.getTicketStatus());
        if (ticketUpdateRequest.getTicketStatus().equals(TicketStatus.COMPLETED)) {
            ZonedDateTime now = ZonedDateTime.now();
            updateTicket.setFinishedAt(now);
        }
        ticketService.updateTicket(updateTicket);
        TicketResponse ticketResponse = new TicketResponse(updateTicket);
        return ResponseEntity.ok(ticketResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicket(@PathVariable("id")String ticketId) {
        ticketService.deleteTicket(ticketId);
        return ResponseEntity.ok("Ticket deleted successfully.");
    }
}
