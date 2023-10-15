package com.kenzie.appserver.controller.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kenzie.appserver.repositories.model.TicketStatus;
import com.kenzie.appserver.service.model.Ticket;
import com.kenzie.appserver.service.model.User;

import javax.validation.constraints.NotEmpty;
import java.time.ZonedDateTime;
import java.util.List;

public class TicketResponse {
    @NotEmpty
    @JsonProperty("ticketId")
    private String ticketId;
    @JsonProperty("subject")
    private String ticketSubject;
    @JsonProperty("description")
    private String ticketDescription;
    @JsonProperty("created")
    private ZonedDateTime createdAt;
    @JsonProperty("finished")
    private ZonedDateTime finishedAt;
    @JsonProperty("ticketStatus")
    private TicketStatus ticketStatus;
    @JsonProperty("customerId")
    private String customerId;
    @JsonProperty("users")
    private List<String> users;

    public TicketResponse() {}

    public TicketResponse(Ticket ticket) {
        this.ticketId = ticket.getTicketId();
        this.ticketSubject = ticket.getTicketSubject();
        this.ticketDescription = ticket.getTicketDescription();
        this.createdAt = ticket.getCreatedAt();
        this.finishedAt = ticket.getFinishedAt();
        this.ticketStatus = ticket.getTicketStatus();
        this.customerId = ticket.getCustomerId();
        this.users = ticket.getUsers();
    }

    public String getTicketId() {
        return ticketId;
    }

    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }

    public String getTicketSubject() {
        return ticketSubject;
    }

    public void setTicketSubject(String ticketSubject) {
        this.ticketSubject = ticketSubject;
    }

    public String getTicketDescription() {
        return ticketDescription;
    }

    public void setTicketDescription(String ticketDescription) {
        this.ticketDescription = ticketDescription;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ZonedDateTime getFinishedAt() {
        return finishedAt;
    }

    public void setFinishedAt(ZonedDateTime finishedAt) {
        this.finishedAt = finishedAt;
    }

    public TicketStatus getTicketStatus() {
        return ticketStatus;
    }

    public void setTicketStatus(TicketStatus ticketStatus) {
        this.ticketStatus = ticketStatus;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public List<String> getUsers() {
        return users;
    }

    public void setUsers(List<String> users) {
        this.users = users;
    }
}
