package com.kenzie.appserver.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kenzie.appserver.IntegrationTest;
import com.kenzie.appserver.controller.model.TicketCreateRequest;
import com.kenzie.appserver.controller.model.TicketResponse;
import com.kenzie.appserver.controller.model.TicketUpdateRequest;
import com.kenzie.appserver.exception.ResourceNotFoundException;
import com.kenzie.appserver.service.TicketService;
import com.kenzie.appserver.service.model.Ticket;
import net.andreinc.mockneat.MockNeat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;


import java.util.ArrayList;
import java.util.List;

import static java.util.UUID.randomUUID;
import static net.andreinc.mockneat.unit.address.Addresses.addresses;
import static net.andreinc.mockneat.unit.text.Strings.strings;
import static net.andreinc.mockneat.unit.user.Emails.emails;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.hamcrest.Matchers.is;
import static net.andreinc.mockneat.unit.user.Names.names;
import static org.junit.Assert.assertThrows;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@IntegrationTest
public class TicketControllerTest {
    @Autowired
    private MockMvc mvc;
    @Autowired
    TicketService ticketService;
    private final MockNeat mockNeat = MockNeat.threadLocal();
    private final ObjectMapper mapper = new ObjectMapper();

    @Test
    public void addNewTicket_ticketAdded() throws Exception {
        String subject = strings().size(15).toString();
        String description = strings().size(100).toString();
        String customerId = randomUUID().toString();
        List<String> users = new ArrayList<>();
        users.add("user1");

        TicketCreateRequest ticketCreateRequest = new TicketCreateRequest();
        ticketCreateRequest.setTicketSubject(subject);
        ticketCreateRequest.setTicketDescription(description);
        ticketCreateRequest.setCustomerId(customerId);
        ticketCreateRequest.setUsers(users);

        mapper.registerModule(new JavaTimeModule());
        MvcResult result = mvc.perform(post("/ticket")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(ticketCreateRequest)))
                .andExpect(jsonPath("ticketId")
                        .exists())
                .andExpect(jsonPath("subject")
                        .value(is(subject)))
                .andExpect(jsonPath("description")
                        .value(is(description)))
                .andExpect(jsonPath("customerId")
                        .value(is(customerId)))
                .andExpect(jsonPath("users")
                        .value(is(users)))
                .andExpect(status().isCreated())
                .andReturn();

        String jsonResponse = result.getResponse().getContentAsString();
        TicketResponse ticketResponse = mapper.readValue(jsonResponse, TicketResponse.class);
        String id = ticketResponse.getTicketId();

        mvc.perform(delete("/ticket/{id}", id)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void addNewTicket_nullTicket_statusCode400() throws Exception {
        TicketCreateRequest ticketCreateRequest = null;

        mapper.registerModule(new JavaTimeModule());
        mvc.perform(post("/ticket")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void getTicket_ticketExists() throws Exception {
        String ticketId = randomUUID().toString();
        String subject = strings().size(15).toString();
        String description = strings().size(100).toString();
        String customerId = randomUUID().toString();

        Ticket ticket = new Ticket(
                ticketId,
                customerId,
                subject,
                description);
        Ticket persistedTicket = ticketService.createTicket(ticket);

        mvc.perform(get("/ticket/{id}", persistedTicket.getTicketId())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("ticketId")
                        .value(is(ticketId)))
                .andExpect(jsonPath("customerId")
                        .value(is(customerId)))
                .andExpect(jsonPath("subject")
                        .value(is(subject)))
                .andExpect(jsonPath("description")
                        .value(is(description)))
                .andExpect(status().isOk());

        mvc.perform(delete("/ticket/{id}", ticketId)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void getAllTickets_ticketListReturned() throws Exception {
        String ticketId1 = randomUUID().toString();
        String subject1 = strings().size(15).toString();
        String description1 = strings().size(100).toString();
        String customerId1 = randomUUID().toString();

        Ticket ticket1 = new Ticket(
                ticketId1,
                customerId1,
                subject1,
                description1);
        Ticket persistedTicket1 = ticketService.createTicket(ticket1);

        String ticketId2 = randomUUID().toString();
        String subject2 = strings().size(15).toString();
        String description2 = strings().size(100).toString();
        String customerId2 = randomUUID().toString();

        Ticket ticket2 = new Ticket(
                ticketId2,
                customerId2,
                subject2,
                description2);
        Ticket persistedTicket2 = ticketService.createTicket(ticket2);

        Integer numOfTickets = ticketService.findAll().size();

        ResultActions actions = mvc.perform(get("/ticket/all")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mapper.registerModule(new JavaTimeModule());
        String responseBody = actions.andReturn().getResponse().getContentAsString();
        List<TicketResponse> responses = mapper.readValue(responseBody, new TypeReference<List<TicketResponse>>(){});
        assertThat(responses.size()).isEqualTo(numOfTickets);

        mvc.perform(delete("/ticket/{id}", ticketId1)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mvc.perform(delete("/ticket/{id}", ticketId2)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void updateTicket_updateSuccessful() throws Exception {
        String ticketId = randomUUID().toString();
        String subject = strings().size(15).toString();
        String description = strings().size(100).toString();
        String customerId = randomUUID().toString();

        Ticket ticket = new Ticket(
                ticketId,
                customerId,
                subject,
                description);
        Ticket persistedTicket = ticketService.createTicket(ticket);

        String newDescription = strings().size(50).toString();

        TicketUpdateRequest ticketUpdateRequest = new TicketUpdateRequest();
        ticketUpdateRequest.setTicketDescription(newDescription);

        mapper.registerModule(new JavaTimeModule());
        mvc.perform(put("/ticket/{id}", persistedTicket.getTicketId())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(ticketUpdateRequest)))
                .andExpect(jsonPath("ticketId")
                        .exists())
                .andExpect(jsonPath("customerId")
                        .value(is(customerId)))
                .andExpect(jsonPath("subject")
                        .value(is(subject)))
                .andExpect(jsonPath("description")
                        .value(is(newDescription)))
                .andExpect(status().isOk());

        mvc.perform(delete("/ticket/{id}", ticketId)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void updateTicket_invalidTicket_statusCode400() throws Exception {
        String ticketId = "Invalid ticket Id";
        TicketUpdateRequest ticketUpdateRequest = null;

        mapper.registerModule(new JavaTimeModule());
        mvc.perform(put("/ticket/{id}", ticketId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void deleteTicket_deleteSuccessful() throws Exception {
        String ticketId = randomUUID().toString();
        String subject = strings().size(15).toString();
        String description = strings().size(100).toString();
        String customerId = randomUUID().toString();

        Ticket ticket = new Ticket(
                ticketId,
                customerId,
                subject,
                description);
        Ticket persistedTicket = ticketService.createTicket(ticket);

        mvc.perform(delete("/ticket/{id}", ticketId)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        assertThrows(ResourceNotFoundException.class, () -> ticketService.findByTicketId(ticketId));
    }

}
