package com.kenzie.appserver.service.model;

import com.kenzie.appserver.repositories.model.TicketStatus;

import java.time.ZonedDateTime;
import java.util.Objects;

public class Ticket {
    private String ticketSubject;
    private String ticketDescription;
    private ZonedDateTime createdAt;
    private ZonedDateTime finishedAt;
    private TicketStatus ticketStatus;
    private String id;

    public Ticket(String id, String ticketSubject, String ticketDescription) {
        this.id = id;
        this.ticketSubject = ticketSubject;
        this.ticketDescription = ticketDescription;
        this.ticketStatus = TicketStatus.NEW;
        this.createdAt = ZonedDateTime.now();

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ticket ticket = (Ticket) o;
        return Objects.equals(ticketSubject, ticket.ticketSubject)
                && Objects.equals(ticketDescription, ticket.ticketDescription)
                && Objects.equals(createdAt, ticket.createdAt)
                && Objects.equals(finishedAt, ticket.finishedAt)
                && ticketStatus == ticket.ticketStatus
                && Objects.equals(id, ticket.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ticketSubject, ticketDescription, createdAt, finishedAt, ticketStatus, id);
    }
}
