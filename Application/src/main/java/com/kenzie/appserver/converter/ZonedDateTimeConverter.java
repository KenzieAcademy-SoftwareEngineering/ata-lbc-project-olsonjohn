package com.kenzie.appserver.converter;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Converts between ZonedDateTime and String.
 */
public class ZonedDateTimeConverter implements DynamoDBTypeConverter<String, ZonedDateTime> {
    @Override
    public String convert(ZonedDateTime dateTime) {
        return dateTime.format(DateTimeFormatter.ISO_INSTANT);
    }
    @Override
    public ZonedDateTime unconvert(String dateTimeAsString) {
        return ZonedDateTime.parse(dateTimeAsString);
    }
}
