package com.pkcoder.repositories;

import com.pkcoder.entities.User;
import com.pkcoder.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserRole(UserRole userRole);

    Optional<User> findFirstByEmail(String email);
}
