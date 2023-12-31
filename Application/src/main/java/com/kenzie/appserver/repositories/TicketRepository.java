package com.kenzie.appserver.repositories;

import com.kenzie.appserver.repositories.model.TicketRecord;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

@EnableScan
public interface TicketRepository extends CrudRepository<TicketRecord, String> {
}
