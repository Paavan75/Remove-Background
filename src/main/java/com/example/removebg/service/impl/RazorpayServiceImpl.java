package com.example.removebg.service.impl;

import com.example.removebg.dto.UserDto;
import com.example.removebg.entity.OrderEntity;
import com.example.removebg.repository.OrderRepository;
import com.example.removebg.service.RazorpayService;
import com.example.removebg.service.UserService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RazorpayServiceImpl implements RazorpayService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    private final OrderRepository orderRepository;

    private final UserService userService;

    @Override
    public Order createOrder(Double amount, String currency) throws RazorpayException {
        try {
            RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount * 100);
            orderRequest.put("currency", currency);
            orderRequest.put("receipt", "order_rcptid_" + System.currentTimeMillis());

            return razorpayClient.orders.create(orderRequest);
        } catch (RazorpayException e) {
            e.printStackTrace();
            throw new RazorpayException("Razorpay error:" + e.getMessage());
        }
    }

    @Override
    public Map<String, Object> verifyPayment(String razorpayOrderId) throws RazorpayException {
        HashMap<String, Object> returnValue = new HashMap<>();
        try {
            RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            Order orderInfo = razorpayClient.orders.fetch(razorpayOrderId);
            if (orderInfo.get("status").toString().equalsIgnoreCase("paid")) {
                OrderEntity existingOrder = orderRepository.findByOrderId(razorpayOrderId).orElseThrow(() -> new RuntimeException("Order not found " + razorpayOrderId));
                if (existingOrder.getPayment()){
                    returnValue.put("success", false);
                    returnValue.put("message", "Payment failed");
                    return returnValue;
                }

                UserDto userDto = userService.getUserByClerkId(existingOrder.getClerkId());
                userDto.setCredits(userDto.getCredits() + existingOrder.getCredits());
                userService.saveUser(userDto);
                existingOrder.setPayment(true);
                orderRepository.save(existingOrder);
                returnValue.put("success", true);
                returnValue.put("message", "Credits added");
                return returnValue;
            }
        } catch (RazorpayException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while verifying the payment");
        }
        return returnValue;
    }
}
