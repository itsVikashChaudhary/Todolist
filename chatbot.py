
import openai
import json

# Set up OpenAI API credentials
openai.api_key = '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'


def send_message(message):
    # Send user message to the chatbot and receive response
    response = openai.Completion.create(
        engine='text-davinci-003',
        prompt=message,
        temperature=0.7,
        max_tokens=100,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.6
    )

    # Retrieve the generated response
    reply = response.choices[0].text.strip()

    return reply


# Main loop for the chatbot
def chatbot():
    print("Chatbot: Hello! How can I assist you today?")

    while True:
        user_input = input("you: ")

        if user_input.lower() == 'bye':
            print("Chatbot: Goodbye!")
            break

        response = send_message(user_input)
        print("Chatbot:", response)


# Run the chatbot
chatbot()
