package com.user.auth.transformer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.user.auth.dto.DataDto;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class JsonConverter implements AttributeConverter<DataDto, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(DataDto attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            // Handle the exception or log an error
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public DataDto convertToEntityAttribute(String dbData) {
        try {
            return objectMapper.readValue(dbData, DataDto.class);
        } catch (JsonProcessingException e) {
            // Handle the exception or log an error
            e.printStackTrace();
            return null;
        }
    }
}

