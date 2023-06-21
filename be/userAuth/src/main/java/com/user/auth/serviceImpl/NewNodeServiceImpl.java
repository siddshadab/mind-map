package com.user.auth.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.user.auth.dto.NewNodeDto;
import com.user.auth.entity.NewNodeEntity;
import com.user.auth.repository.NewNodeRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@Service
public class NewNodeServiceImpl  {

   @Autowired
    NewNodeRepository nodeRepository;


    public NewNodeEntity saveNode(NewNodeDto node) throws JsonProcessingException {
        // Perform any additional operations or validations before saving
        ObjectMapper objectMapper = new ObjectMapper();
    	NewNodeEntity entity = new NewNodeEntity();
    	System.out.println("Data : "+objectMapper.writeValueAsString(node.getData()));
    	//entity.setData(node.getData());
        entity.setData(objectMapper.writeValueAsString(node.getData()));
    	entity.setUniqueId(node.getUniqueId());
    	entity.setEmail(node.getEmail());
    	entity.setMapName(node.getMapName());
        return nodeRepository.save(entity);
    }
    
    public List<NewNodeEntity> getNodesByEmail(String email) {
        return nodeRepository.findByEmail(email);
    }
    
    public Optional<NewNodeEntity> getNodesById(Long id) {
        return nodeRepository.findById(id);
    }
    
    public void deleteNode(NewNodeEntity node) {
        nodeRepository.delete(node);
    }
    
    public NewNodeEntity updateNode(NewNodeEntity existingNode,NewNodeDto updatedNodeDto) throws JsonProcessingException {
    	 // Perform any additional operations or validations before saving
        ObjectMapper objectMapper = new ObjectMapper();
        existingNode.setData(objectMapper.writeValueAsString(updatedNodeDto.getData()));
        return nodeRepository.save(existingNode);
    }
}
