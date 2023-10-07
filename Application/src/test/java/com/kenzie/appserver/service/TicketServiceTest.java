package com.kenzie.appserver.service;

import com.kenzie.appserver.exception.ResourceNotFoundException;
import com.kenzie.appserver.repositories.TicketRepository;
import com.kenzie.appserver.repositories.model.TicketRecord;
import com.kenzie.appserver.repositories.model.TicketStatus;
import com.kenzie.appserver.service.model.Ticket;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.*;

import static java.util.UUID.randomUUID;
import static net.andreinc.mockneat.unit.text.Strings.strings;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TicketServiceTest {
    private TicketRepository ticketRepository;
    private TicketService ticketService;

    @BeforeEach
    void setup() {
        ticketRepository = mock(TicketRepository.class);
        ticketService = new TicketService(ticketRepository);
    }

    @Test
    void findById_validId_returnsCorrectTicket() {
        String id = randomUUID().toString();

        TicketRecord record = new TicketRecord();
        record.setTicketId(id);
        record.setTicketSubject(strings().size(15).toString());
        record.setTicketDescription(strings().size(100).toString());
        record.setTicketStatus(TicketStatus.NEW);

        when(ticketRepository.findById(id)).thenReturn(Optional.of(record));
        Ticket ticket = ticketService.findByTicketId(id);

        assertNotNull(ticket, "A ticket object should be returned");
        assertEquals(record.getTicketId(), ticket.getTicketId(), "The id should match");
        assertEquals(record.getTicketSubject(), ticket.getTicketSubject(), "The ticket subject should match");
        assertEquals(record.getTicketDescription(), ticket.getTicketDescription(), "The ticket description should match");
        assertEquals(record.getTicketStatus(), ticket.getTicketStatus(), "The ticket status should match");
    }

    @Test
    void findById_invalidId_throwsException() {
        String id = randomUUID().toString();

        doThrow(ResourceNotFoundException.class).when(ticketRepository).findById(id);

        assertThrows(ResourceNotFoundException.class, () -> ticketService.findByTicketId(id), "Expected findByTicketId() to throw, but it didn't");
    }

    @Test
    void findAll_returnsAllTickets() {
        TicketRecord record1 = new TicketRecord();
        record1.setTicketId(randomUUID().toString());
        record1.setTicketSubject(strings().size(15).toString());
        record1.setTicketDescription(strings().size(100).toString());
        record1.setTicketStatus(TicketStatus.NEW);

        TicketRecord record2 = new TicketRecord();
        record2.setTicketId(randomUUID().toString());
        record2.setTicketSubject(strings().size(15).toString());
        record2.setTicketDescription(strings().size(100).toString());
        record2.setTicketStatus(TicketStatus.IN_PROGRESS);

        List<TicketRecord> tickets = Arrays.asList(record1, record2);

        when(ticketRepository.findAll()).thenReturn(tickets);

        List<Ticket> result = ticketService.findAll();

        assertEquals(2, result.size(), "List should contain 2 tickets");
        assertEquals(record1.getTicketId(), result.get(0).getTicketId(), "List order is maintained and ticket has correct id");
        assertEquals(record2.getTicketId(), result.get(1).getTicketId(), "List order is maintained and ticket has correct id");
    }

    @Test
    void findTicketsForCustomerId_validCustomerId_returnsAllTicketsWithCustomerId() {
        String customerId = randomUUID().toString();

        TicketRecord record1 = new TicketRecord();
        record1.setTicketId(randomUUID().toString());
        record1.setTicketSubject(strings().size(15).toString());
        record1.setTicketDescription(strings().size(100).toString());
        record1.setTicketStatus(TicketStatus.NEW);
        record1.setCustomerId(customerId);

        TicketRecord record2 = new TicketRecord();
        record2.setTicketId(randomUUID().toString());
        record2.setTicketSubject(strings().size(15).toString());
        record2.setTicketDescription(strings().size(100).toString());
        record2.setTicketStatus(TicketStatus.IN_PROGRESS);
        record2.setCustomerId(customerId);

        List<TicketRecord> tickets = Arrays.asList(record1, record2);

        when(ticketRepository.findAllById(Collections.singleton(customerId))).thenReturn(tickets);

        List<Ticket> result = ticketService.findTicketsForCustomerId(customerId);

        assertEquals(2, result.size(), "List should contain 2 tickets with the given customer id");
        assertEquals(record1.getCustomerId(), result.get(0).getCustomerId(), "List order is maintained and ticket contains correct customerId");
        assertEquals(record2.getCustomerId(), result.get(1).getCustomerId(), "List order is maintained and ticket contains correct customerId");
    }

    @Test
    void createTicket_validInputs_newTicketCreated() {
        Ticket ticket = new Ticket(
                randomUUID().toString(),
                randomUUID().toString(),
                strings().size(15).toString(),
                strings().size(100).toString());

        TicketRecord record = ticketService.createTicketRecord(ticket);

        when(ticketRepository.save(record)).thenReturn(record);

        Ticket result = ticketService.createTicket(ticket);

        verify(ticketRepository).save(record); //verify that save was called with ticket record
        assertEquals(ticket, result, "Ticket saved should match ticket returned");
    }

    @Test
    void updateTicket_validInputs_ticketUpdated() {
        String ticketId = randomUUID().toString();
        String customerId = randomUUID().toString();

        Ticket updateTicket = new Ticket(
                ticketId,
                customerId,
                "NewSubject",
                "NewDescription");

        TicketRecord existingTicketRecord = new TicketRecord();
        existingTicketRecord.setTicketId(ticketId);
        existingTicketRecord.setCustomerId(customerId);
        existingTicketRecord.setTicketSubject("OldSubject");
        existingTicketRecord.setTicketDescription("OldDescription");

        TicketRecord updatedTicketRecord = ticketService.createTicketRecord(updateTicket);

        when(ticketRepository.findById(ticketId)).thenReturn(Optional.of(existingTicketRecord));
        when(ticketRepository.save(updatedTicketRecord)).thenReturn(updatedTicketRecord);

        Ticket result = ticketService.updateTicket(ticketId, updateTicket);

        verify(ticketRepository).findById(ticketId); //verify findById() was called with ticketId
        verify(ticketRepository).save(any(TicketRecord.class)); //verify save() was called with a TicketRecord
        assertEquals(result.getTicketSubject(), updateTicket.getTicketSubject(), "Ticket status should have been updated");
        assertEquals(result.getTicketDescription(), updateTicket.getTicketDescription(), "Ticket description should have been updated");
    }

    @Test
    void updateTicket_ticketStatusCompleted_returnedTicketUpdatesFinishedAt() {
        String ticketId = randomUUID().toString();

        Ticket updateTicket = new Ticket();
        updateTicket.setTicketId(ticketId);
        updateTicket.setTicketStatus(TicketStatus.COMPLETED);

        TicketRecord existingTicketRecord = new TicketRecord();
        existingTicketRecord.setTicketId(ticketId);

        TicketRecord updatedTicketRecord = ticketService.createTicketRecord(updateTicket);

        when(ticketRepository.findById(ticketId)).thenReturn(Optional.of(existingTicketRecord));
        when(ticketRepository.save(updatedTicketRecord)).thenReturn(updatedTicketRecord);

        Ticket result = ticketService.updateTicket(ticketId ,updateTicket);

        verify(ticketRepository).findById(ticketId); //verify findById() was called with ticketId
        verify(ticketRepository).save(any(TicketRecord.class)); //verify save() was called with a TicketRecord
        assertNotNull(result, "Returned ticket should not be null");
        assertNotNull(result.getFinishedAt(), "Returned ticket finishedAt should not be null");
        assertEquals(TicketStatus.COMPLETED, result.getTicketStatus(), "Returned ticket should have COMPLETED ticket status");
    }

    @Test
    void updateTicket_userAddedToTicket_returnedTicketUpdatesUserList() {
        String ticketId = randomUUID().toString();

        List<String> users = new ArrayList<>();
        users.add("User1");

        List<String> updatedUserList = new ArrayList<>(users);
        updatedUserList.add("User2");

        TicketRecord existingTicketRecord = new TicketRecord();
        existingTicketRecord.setTicketId(ticketId);
        existingTicketRecord.setUsers(users);

        when(ticketRepository.findById(ticketId)).thenReturn(Optional.of(existingTicketRecord));

        Ticket updateTicket = new Ticket();
        updateTicket.setTicketId(ticketId);
        updateTicket.setUsers(updatedUserList);

        TicketRecord updatedTicketRecord = ticketService.createTicketRecord(updateTicket);

        when(ticketRepository.save(updatedTicketRecord)).thenReturn(updatedTicketRecord);

        Ticket result = ticketService.updateTicket(ticketId, updateTicket);

        verify(ticketRepository).findById(ticketId); //verify findById() was called with ticketId
        verify(ticketRepository).save(any(TicketRecord.class)); //verify save() was called with a TicketRecord
        assertNotNull(result, "Returned ticket should not be null");
        assertEquals(2, result.getUsers().size(), "Returned list should now contain 2 Users");
    }

    @Test
    void createTicketRecord_nullTicket_throwsException() {
        assertThrows(IllegalArgumentException.class, () -> ticketService.createTicketRecord(null), "Exception should be thrown when ticket is null");
    }

    @Test
    void deleteTicket_validId_deletesTicket() {
        String id = randomUUID().toString();

        TicketRecord record = new TicketRecord();
        record.setTicketId(id);
        record.setTicketSubject(strings().size(15).toString());
        record.setTicketDescription(strings().size(100).toString());
        record.setTicketStatus(TicketStatus.NEW);

        when(ticketRepository.findById(id)).thenReturn(Optional.of(record));
        doNothing().when(ticketRepository).delete(record);

        ticketService.deleteTicket(id);

        verify(ticketRepository).delete(record); //verify delete was called with ticket record
    }
}
