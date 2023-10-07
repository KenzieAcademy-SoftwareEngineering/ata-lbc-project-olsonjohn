package com.kenzie.appserver.controller;

import com.kenzie.appserver.controller.model.TicketCreateRequest;
import com.kenzie.appserver.controller.model.TicketResponse;
import com.kenzie.appserver.controller.model.TicketUpdateRequest;
import com.kenzie.appserver.exception.ResourceNotFoundException;
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
        try {
            Ticket ticket = new Ticket(ticketCreateRequest);
            ticketService.createTicket(ticket);
            TicketResponse ticketResponse = new TicketResponse(ticket);
            return ResponseEntity.created(URI.create("/ticket/" + ticketResponse.getTicketId())).body(ticketResponse);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponse> getTicket(@PathVariable("id")String ticketId) {
        try {
            Ticket ticket = ticketService.findByTicketId(ticketId);
            TicketResponse ticketResponse = new TicketResponse(ticket);
            return ResponseEntity.ok(ticketResponse);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException | NullPointerException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<TicketResponse>> getAllTickets() {
        try {
            List<Ticket> tickets = ticketService.findAll();
            if (tickets.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            List<TicketResponse> responses = tickets
                    .stream()
                    .map(TicketResponse::new).collect(Collectors.toList());
            return ResponseEntity.ok(responses);
        }  catch(IllegalArgumentException | NullPointerException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("by-customer/{customerId}")
    public ResponseEntity<List<TicketResponse>> getTicketsForCustomerId(@PathVariable("customerId")String customerId) {
        try {
            List<Ticket> tickets = ticketService.findTicketsForCustomerId(customerId);
            if (tickets.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            List<TicketResponse> responses = tickets
                    .stream()
                    .map(TicketResponse::new).collect(Collectors.toList());
            return ResponseEntity.ok(responses);
        } catch (IllegalArgumentException | NullPointerException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<TicketResponse> updateTicket(@PathVariable("id")String ticketId, @RequestBody TicketUpdateRequest ticketUpdateRequest) {
        try {
            Ticket ticket = new Ticket(ticketUpdateRequest);
            Ticket updatedTicket = ticketService.updateTicket(ticketId, ticket);
            TicketResponse ticketResponse = new TicketResponse(updatedTicket);
            return ResponseEntity.ok(ticketResponse);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicket(@PathVariable("id")String ticketId) {
        try {
            ticketService.deleteTicket(ticketId);
            return ResponseEntity.ok("Ticket deleted successfully.");
        } catch(ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch(IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
