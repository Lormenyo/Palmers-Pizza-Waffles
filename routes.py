from flask import Flask, render_template, request, flash, get_flashed_messages
from flask_mail import Mail, Message
import pyrebase  #python wrapper for firebase

config = {
    "apiKey": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "authDomain": "pizza-record.firebaseapp.com",
    "databaseURL": "https://pizza-record.firebaseio.com",
    "projectId": "pizza-record",
    "storageBucket": "pizza-record.appspot.com",
    "messagingSenderId": "xxxxxxxxxxxxxxxxxxxxxxx",
    "serviceAccount":"./pizza-record-firebase-adminsdk-817ww-8bb7841a9b.json"
}


firebase = pyrebase.initialize_app(config)

db = firebase.database()

app = Flask(__name__)

app.config.from_pyfile('config.cfg')
app.secret_key = 'mysecretkey'
 
mail = Mail(app)
 

@app.route('/')
def index():
    return render_template("index.html")


@app.route('/contact', methods=["POST", "GET"])
def contact():
    username = request.form['name']
    user_email = request.form['email']
    phone = request.form['phone']
    message = request.form["message"]
    msg = Message(subject='Contact Message', 
                sender= user_email, 
                recipients=["ppizzery@gmail.com"],
                body= 'Hi Palmers Pizza Waffles \n \n'
                     + message +
                    '\n \n Best Regards, \n \n' + username)
    mail.send(msg)
    flash('Message sent successfully')
    return render_template('index.html')


@app.route('/admin')
def admin():
    orders = db.child("Order").get()
    return render_template("tables.html", orders=orders)

@app.route('/order', methods = ['POST', 'GET'])
def order():
    return render_template("order.html")

@app.route('/confirmOrder', methods = ['POST', 'GET'])
def confirmOrder():
    name = request.form['name']
    email = request.form['email']
    phone = request.form['phone']
    beefzaa = request.form['beefzaa']
    chicken = request.form['chicken']
    veggie = request.form['veggie']

    # Push data to Firebase database
    db.child("Order").push(
                            {"name": name,
                             "email": email,
                             "phone": phone,
                            "type_pizza":{"Beefzaa": beefzaa,
                                        "Chicken-Delight": chicken,
                                        "Veggie-Special": veggie
                                            },
                            "completed": False })

    cost = 6 * (int(beefzaa) + int(chicken) + int(veggie)) #get cost of order

    # Confirm Purchase via email
    msg = Message(subject='Order Confirmation', 
                sender='ppizzery@gmail.com', 
                recipients=[email],
                body='Hi '+ name + ',\n\n    You ordered for Pizza Waffles which cost GHC' + str(cost) + '.00 \n    Don\'t forget to pick your Pizza-Waffles at the lobby \n\n Best Regards, \n Palmers Pizza-Waffles')
    mail.send(msg)
    return render_template("index.html")



if __name__ == '__main__':
    app.run(debug=True)