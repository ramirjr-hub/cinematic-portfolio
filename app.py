
from flask import Flask, render_template

# Initialize Flask application
app = Flask(__name__)


# Home Page Route
@app.route("/")
def home():
    return render_template("index.html")


# Run the application
if __name__ == "__main__":
    app.run(debug=True)
