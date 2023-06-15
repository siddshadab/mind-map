package com.user.auth.controller;

import com.user.auth.dto.UserDTO;
import com.user.auth.entity.UserEntity;
import com.user.auth.security.ApiResponse;
import com.user.auth.service.UserService;
import com.user.auth.transformer.UserTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @CrossOrigin(origins = "http://localhost:3000/")
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody  UserDTO userDTO){
        UserEntity user = UserTransformer.getEntity(userDTO);
        user = userService.create(user);
        return new ResponseEntity<>(UserTransformer.getDto(user), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @PostMapping("/login")
    public ApiResponse login(@RequestBody  UserDTO userDTO){
        UserEntity userEntity = userService.authenticate(userDTO.getEmail(), userDTO.getPassword());
        if(userEntity != null){
            return new ApiResponse("User Loged in success fully", true,userEntity);
        }else{
            return new ApiResponse("incrooect username & password", false);
        }
    }
}
