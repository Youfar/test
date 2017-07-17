package com.oh.spring.controller;

import com.oh.spring.entity.User;
import com.oh.spring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * @author cho.oh
 */
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class AuthController {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/createUser", method = RequestMethod.POST)
    public Object createUser(@RequestParam("username") String username, @RequestParam("email") String email, @RequestParam("password") String password) throws ChangeSetPersister.NotFoundException {
        User user = new User();
        //TODO Validation

        if (Pattern.matches("^[0-9a-zA-Z_]+$", username) && email.split("@").length == 2 && password.length() > 7) {

            user.setUsername(username);
            String passwordHash = passwordEncoder.encode(password);
            user.setPassword(passwordHash);
            user.setEmail(email);

            userRepository.save(user);
            Map<String, Object> result = new HashMap<>();
            // result.put("userId", user.getUserId());
            result.put("serverMsg", "Success");
            return result;
        }
        throw new ChangeSetPersister.NotFoundException();
    }
}