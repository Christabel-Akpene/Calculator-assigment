"""A basic calculator program that allows a user to input two numbers and a mathematical operation"""

print("Hello, welcome to calculator program")
print("Please input two numbers and a mathematical operation('* , + , - , /')")
num1 = int(input("Enter your first number: "))
num2 = int(input("Enter your second number: "))
operator = input("Enter your mathematical operator('*', '+' , '/', '-'): ")

if operator == "+":
    result = num1 + num2
elif operator == "-":
    result = num1 - num2
elif operator == "*":
    result = num1 * num2
elif operator == "/":
    if num2 != 0:
        result = num1 / num2
    else:
        result = "Division by zero is not allowed."
print(f"{num1} {operator} {num2} = ", result)