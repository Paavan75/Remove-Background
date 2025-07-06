package com.example.removebg.service.impl;

import com.example.removebg.entity.OrderEntity;
import com.example.removebg.repository.OrderRepository;
import com.example.removebg.service.OrderService;
import com.example.removebg.service.RazorpayService;
import com.example.removebg.service.UserService;
import com.razorpay.Order;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final RazorpayService razorpayService;

    private final OrderRepository orderRepository;

    private static final Map<String, PlanDetails> PLAN_DETAILS = Map.of(
            "Basic", new PlanDetails("Basic", 100, 499.00),
            "Premium", new PlanDetails("Premium", 250, 899.00),
            "Ultimate", new PlanDetails("Ultimate", 1000, 1499.00));

    private record PlanDetails(String name, int credits, double amount) {

    }

    @Override
    public Order createOrder(String planId, String clerkId) throws RazorpayException {
        PlanDetails planDetails = PLAN_DETAILS.get(planId);
        if (planDetails == null)
            throw new IllegalArgumentException("Invalid PlanId: " + planId);

        try {
            Order razorpayOrder = razorpayService.createOrder(planDetails.amount(), "INR");
            OrderEntity orderEntity = OrderEntity.builder()
                    .clerkId(clerkId)
                    .plan(planDetails.name())
                    .credits(planDetails.credits())
                    .amount(planDetails.amount())
                    .orderId(razorpayOrder.get("id"))
                    .build();
            orderRepository.save(orderEntity);
            return razorpayOrder;
        } catch (RazorpayException e) {
            throw new RazorpayException("Error while creating the order", e);
        }
    }
}
