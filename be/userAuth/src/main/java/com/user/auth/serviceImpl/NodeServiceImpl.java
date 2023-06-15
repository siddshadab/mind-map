package com.user.auth.serviceImpl;

import com.user.auth.entity.NodeEntity;
import com.user.auth.repository.NodeRepository;
import com.user.auth.security.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NodeServiceImpl  {

   @Autowired
    NodeRepository nodeRepository;


    public NodeEntity saveNode(NodeEntity node) {
        // Perform any additional operations or validations before saving
        return nodeRepository.save(node);
    }
}
