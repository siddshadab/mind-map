package com.user.auth.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.user.auth.entity.NewNodeEntity;

public interface NewNodeRepository extends CrudRepository<NewNodeEntity, Long> {
	
    List<NewNodeEntity> findByEmail(String email);

}
