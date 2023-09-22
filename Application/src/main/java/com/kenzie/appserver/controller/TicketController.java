package com.kenzie.appserver.controller;

import com.kenzie.appserver.controller.model.TicketCreateRequest;
import com.kenzie.appserver.controller.model.TicketResponse;
import com.kenzie.appserver.service.TicketService;
import com.kenzie.appserver.service.model.Ticket;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
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
        ticketService.createTicket(ticket);

        TicketResponse ticketResponse = new TicketResponse(ticket);

        return ResponseEntity.created(URI.create("/ticket/" + ticketResponse.getTicketId())).body(ticketResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponse> getTicket(@PathVariable("id")String id) {
        Ticket ticket = ticketService.findByTicketId(id);
        if (ticket == null) {
            return ResponseEntity.notFound().build();
        }
        TicketResponse ticketResponse = new TicketResponse(ticket);
        return ResponseEntity.ok(ticketResponse);
    }

    //TODO: Add GET ALL customer tickets by customer id after I make GSI sorted by customer id

    //TODO: UPDATE ticket method

    @GetMapping("/all")
    public ResponseEntity<List<TicketResponse>> getAllTickets() {
        List<Ticket> tickets = ticketService.findAll();

        List<TicketResponse> responses = tickets.stream().map(TicketResponse::new).collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }
}
