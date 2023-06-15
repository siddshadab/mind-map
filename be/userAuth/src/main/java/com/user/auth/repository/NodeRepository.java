package com.user.auth.repository;

import com.user.auth.entity.NodeEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface NodeRepository extends JpaRepository<NodeEntity, Long> {
}
