package com.user.auth.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.user.auth.dto.NewNodeDto;
import com.user.auth.entity.NewNodeEntity;
import com.user.auth.serviceImpl.NewNodeServiceImpl;

@RestController
@RequestMapping("/api/v2/node")
public class NewNodeController {

	  private final NewNodeServiceImpl nodeService;

	    @Autowired
	    public NewNodeController(NewNodeServiceImpl nodeService) {
	        this.nodeService = nodeService;
	    }


      @PostMapping
      @CrossOrigin(origins = "http://localhost:3000")
      public ResponseEntity<NewNodeEntity> saveNode(@RequestBody NewNodeDto node) throws JsonProcessingException {
          NewNodeEntity savedNode = nodeService.saveNode(node);
          return new ResponseEntity<>(savedNode, HttpStatus.CREATED);
      }

      @GetMapping("/getByEmail/{email}")
      @CrossOrigin(origins = "http://localhost:3000")
      public ResponseEntity<List<NewNodeEntity>> getNodesByEmail(@PathVariable String email) {
          List<NewNodeEntity> nodes = nodeService.getNodesByEmail(email);
          return ResponseEntity.ok(nodes);
      }
      
      @GetMapping("/getById/{id}")
      @CrossOrigin(origins = "http://localhost:3000")
      public ResponseEntity<NewNodeEntity> getNodesById(@PathVariable Long id) {
          Optional<NewNodeEntity> nodes = nodeService.getNodesById(id);
          if (nodes.isPresent()) {
              return ResponseEntity.ok(nodes.get());
          } else {
              return ResponseEntity.notFound().build();
          }
      }

      @DeleteMapping("/deleteById/{id}")
      @CrossOrigin(origins = "http://localhost:3000")
      public ResponseEntity<String> deleteNodesById(@PathVariable Long id) {
          Optional<NewNodeEntity> nodeOptional = nodeService.getNodesById(id);
          if (nodeOptional.isPresent()) {
              NewNodeEntity node = nodeOptional.get();
              nodeService.deleteNode(node);
              return ResponseEntity.ok("Node with ID " + id + " has been deleted.");
          } else {
              return ResponseEntity.notFound().build();
          }
      }
      
      @PutMapping("/{id}")
      @CrossOrigin(origins = "http://localhost:3000")
      public ResponseEntity<NewNodeEntity> updateNode(@PathVariable Long id, @RequestBody NewNodeDto updatedNodeDto) throws JsonProcessingException {
          Optional<NewNodeEntity> existingNodeOptional = nodeService.getNodesById(id);
          if (existingNodeOptional.isPresent()) {
              NewNodeEntity existingNode = existingNodeOptional.get();
              NewNodeEntity updatedNode = nodeService.updateNode(existingNode,updatedNodeDto);
              return ResponseEntity.ok(updatedNode);
          } else {
              return ResponseEntity.notFound().build();
          }
      }
}

