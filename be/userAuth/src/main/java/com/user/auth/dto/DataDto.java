package com.user.auth.dto;

import java.util.List;

import lombok.Data;

@Data
public class DataDto {
    private String id;
    private String name;
    private String mapName;
    private List<DataDto> children;
    
    // Getters and setters
}
