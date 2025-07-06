package com.example.removebg.controller;

import com.example.removebg.dto.RazorpayOrderDto;
import com.example.removebg.response.RemoveBgResponse;
import com.example.removebg.service.OrderService;
import com.example.removebg.service.RazorpayService;
import com.razorpay.Order;
import com.razorpay.RazorpayException;
import feign.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    private final RazorpayService razorpayService;

    public ResponseEntity<?> createOrder(@RequestParam String planId, Authentication authentication) throws RazorpayException {
        Map<String, Object> responseMap = new HashMap<>();
        RemoveBgResponse response = null;

        if (authentication.getName().isEmpty() || authentication.getName() == null) {
            response = RemoveBgResponse.builder()
                    .statusCode(HttpStatus.FORBIDDEN)
                    .success(false)
                    .data("User does not have permission/access this resource")
                    .build();
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        try {
            Order order = orderService.createOrder(planId, authentication.getName());
            RazorpayOrderDto razorpayOrderDto = convertToDto(order);
            response = RemoveBgResponse.builder()
                    .success(true)
                    .data(razorpayOrderDto)
                    .statusCode(HttpStatus.CREATED)
                    .build();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response = RemoveBgResponse.builder()
                    .statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
                    .data(e.getMessage())
                    .success(false)
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyOrder(@RequestBody Map<String, Object> request) throws RazorpayException {
        try {
            String razorpayOrderId = request.get("razorpay_order_id").toString();
            Map<String, Object> returnValue = razorpayService.verifyPayment(razorpayOrderId);
            return ResponseEntity.ok(returnValue);
        } catch (RazorpayException e){
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    private RazorpayOrderDto convertToDto(Order order) {
        return RazorpayOrderDto.builder()
                .id(order.get("id"))
                .entity(order.get("entity"))
                .amount(order.get("amount"))
                .currency(order.get("currency"))
                .status(order.get("status"))
                .created_at(order.get("created_at"))
                .receipt(order.get("receipt"))
                .build();
    }
}
