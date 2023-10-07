package com.kenzie.appserver.controller.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kenzie.appserver.repositories.model.TicketStatus;

import java.time.ZonedDateTime;
import java.util.List;

public class TicketUpdateRequest {
    @JsonProperty("ticketId")
    private String ticketId;
    @JsonProperty("ticketStatus")
    private TicketStatus ticketStatus;
    @JsonProperty("description")
    private String ticketDescription;
    @JsonProperty("finished")
    private ZonedDateTime finishedAt;
    @JsonProperty("users")
    private List<String> users;

    public String getTicketId() {
        return ticketId;
    }

    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }

    public TicketStatus getTicketStatus() {
        return ticketStatus;
    }

    public void setTicketStatus(TicketStatus ticketStatus) {
        this.ticketStatus = ticketStatus;
    }

    public String getTicketDescription() {
        return ticketDescription;
    }

    public void setTicketDescription(String ticketDescription) {
        this.ticketDescription = ticketDescription;
    }

    public ZonedDateTime getFinishedAt() {
        return finishedAt;
    }

    public void setFinishedAt(ZonedDateTime finishedAt) {
        this.finishedAt = finishedAt;
    }

    public List<String> getUsers() {
        return users;
    }

    public void setUsers(List<String> users) {
        this.users = users;
    }
}
