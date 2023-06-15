package com.user.auth.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;


@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class NewNodeDto {
    private String uniqueId;
    private String email;
    private String mapName;
    @JsonProperty
    private List<DataDto> data;

}
