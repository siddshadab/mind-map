package com.user.auth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class NewNodeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "unique_id")
    private String uniqueId;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "mapName")
    private String mapName;

    @Column(name = "data", columnDefinition = "jsonb")
    private String data;

}
