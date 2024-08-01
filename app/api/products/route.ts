import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const data = [
        {
          "id": 1,
          "name": "Wireless Mouse",
          "category": "Electronics",
          "price": 29.99,
          "stock": 150,
          "description": "A comfortable and responsive wireless mouse.",
          "rating": 4.5,
          "reviews": [
            {
              "user": "john_doe",
              "comment": "Great mouse for the price!",
              "rating": 5
            },
            {
              "user": "jane_smith",
              "comment": "Good performance but a bit small.",
              "rating": 4
            }
          ]
        },
        {
          "id": 2,
          "name": "Bluetooth Headphones",
          "category": "Electronics",
          "price": 59.99,
          "stock": 85,
          "description": "High-quality sound and long battery life.",
          "rating": 4.7,
          "reviews": [
            {
              "user": "music_lover",
              "comment": "Excellent sound quality!",
              "rating": 5
            },
            {
              "user": "traveler_123",
              "comment": "Very comfortable for long use.",
              "rating": 4.5
            }
          ]
        },
        {
          "id": 3,
          "name": "Gaming Keyboard",
          "category": "Electronics",
          "price": 89.99,
          "stock": 60,
          "description": "Mechanical keyboard with customizable RGB lighting.",
          "rating": 4.6,
          "reviews": [
            {
              "user": "gamer_pro",
              "comment": "Perfect for gaming!",
              "rating": 5
            },
            {
              "user": "office_worker",
              "comment": "Great for both gaming and typing.",
              "rating": 4.5
            }
          ]
        },
        {
          "id": 4,
          "name": "Smartwatch",
          "category": "Wearables",
          "price": 149.99,
          "stock": 40,
          "description": "Track your fitness and stay connected with notifications.",
          "rating": 4.3,
          "reviews": [
            {
              "user": "fitness_fan",
              "comment": "Helps me keep track of my workouts!",
              "rating": 4.5
            },
            {
              "user": "tech_guru",
              "comment": "A bit pricey but worth it.",
              "rating": 4
            }
          ]
        },
        {
          "id": 5,
          "name": "4K Monitor",
          "category": "Electronics",
          "price": 299.99,
          "stock": 25,
          "description": "Ultra HD monitor with stunning picture quality.",
          "rating": 4.8,
          "reviews": [
            {
              "user": "designer_01",
              "comment": "Amazing display quality!",
              "rating": 5
            },
            {
              "user": "gamer_2020",
              "comment": "Great for gaming and movies.",
              "rating": 4.5
            }
          ]
        }
      ]
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
