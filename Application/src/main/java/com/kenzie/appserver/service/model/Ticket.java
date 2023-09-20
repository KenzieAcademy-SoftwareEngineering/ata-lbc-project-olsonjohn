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
    private String ticketId;

    public String getTicketId() {
        return ticketId;
    }

    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    private Customer customer;

    public Ticket(String ticketId, Customer customer,  String ticketSubject, String ticketDescription) {
        this.ticketId = ticketId;
        this.ticketSubject = ticketSubject;
        this.ticketDescription = ticketDescription;
        this.ticketStatus = TicketStatus.NEW;
        this.createdAt = ZonedDateTime.now();
        this.customer = customer;
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
        return Objects.hash(ticketSubject, ticketDescription, createdAt, finishedAt, ticketStatus);
    }
}
