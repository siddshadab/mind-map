package com.user.auth.controller;

import com.user.auth.dto.NodeDto;
import com.user.auth.entity.NodeEntity;
import com.user.auth.entity.TreeEntity;
import com.user.auth.security.ApiResponse;
import com.user.auth.service.NodeService;
import com.user.auth.service.TreeService;
import com.user.auth.serviceImpl.NodeServiceImpl;
import com.user.auth.transformer.NodeTransformer;
import com.user.auth.transformer.TreeTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/node")
public class NodeController {

      @Autowired
      NodeServiceImpl nodeService;


    @PostMapping
    public ResponseEntity<NodeEntity> saveNode(@RequestBody NodeEntity node) {
    	NodeEntity savedNode = nodeService.saveNode(node);
        return new ResponseEntity<>(savedNode, HttpStatus.CREATED);
    }

}

