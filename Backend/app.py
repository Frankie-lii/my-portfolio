from flask import Flask, redirect, render_template, request, url_for
from flask_mail import Mail, Message
from twilio.rest import Client

app = Flask(__name__)

# Configuring the mail settings for Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'oyiengofrankline49@gmail.com'  # Replace with your email
app.config['MAIL_PASSWORD'] = 'oyiengo03'   # Replace with your email password
app.config['MAIL_DEFAULT_SENDER'] = 'oyiengofrankline49@gmail.com'  # Default sender email

mail = Mail(app)

# Twilio credentials for sending SMS
twilio_sid = 'your_twilio_sid'
twilio_auth_token = 'your_twilio_auth_token'
twilio_phone_number = 'your_twilio_phone_number'
your_phone_number = '+254110124153'

# Function to send SMS using Twilio
def send_sms(message):
    client = Client(twilio_sid, twilio_auth_token)
    client.messages.create(
        body=message,
        from_=twilio_phone_number,
        to=your_phone_number
    )

# Route for rendering the contact form
@app.route('/contact', methods=['GET'])
def contact():
    return render_template('contact.html')

# Route for handling form submission
@app.route('/send-message', methods=['POST'])
def send_message():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        message = request.form['message']
        contact_method = request.form['contact-method']

        # Create email message
        msg = Message('New Contact Form Submission', recipients=['oyiengofrankline49@gmail.com'])
        msg.body = f"Name: {name}\nEmail: {email}\nPhone: {phone}\nMessage: {message}"

        try:
            if contact_method == 'email':
                # Send email if the contact method is email
                mail.send(msg)
            elif contact_method == 'phone' and phone:
                # Send SMS if the contact method is phone
                send_sms(f"New message from {name}:\n{message}")
            
            return redirect(url_for('contact'))  # Redirect to contact page after sending message
        except Exception as e:
            print(f"Error sending email or SMS: {e}")
            return 'There was an error sending your message. Please try again later.'

if __name__ == '__main__':
    app.run(debug=True)
