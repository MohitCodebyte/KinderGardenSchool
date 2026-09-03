import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', active_page='index', title='Apna School Ka Naam - Playful Preschool Learning')

@app.route('/about-us')
def about():
    return render_template('about.html', active_page='about', title='About Us - Apna Brand Name')

@app.route('/our-programs')
def programs():
    return render_template('programs.html', active_page='programs', title='Our Preschool Programs | Apna Brand Name')

@app.route('/senior-kg')
def senior_kg():
    return render_template('senior_kg.html', active_page='senior_kg', title='Senior KG Program - Apna Brand Name')

@app.route('/admissions')
def admissions():
    return render_template('admissions.html', active_page='admissions', title='Admissions - Apna Brand Name')

@app.route('/franchise')
def franchise():
    return render_template('franchise.html', active_page='franchise', title='Franchise - Apna Brand Name')

@app.route('/branches')
def branches():
    return render_template('branches.html', active_page='branches', title='Find a Branch - Apna Brand Name')

@app.route('/media')
def media():
    return render_template('media.html', active_page='media', title='Media - Apna Brand Name')

@app.route('/stories')
def stories():
    return render_template('stories.html', active_page='stories', title='Stories & Parenting Tips - Apna Brand Name')

@app.route('/contact-us')
def contact():
    return render_template('contact.html', active_page='contact', title='Contact Us - Apna Brand Name')

@app.route('/careers')
def careers():
    return render_template('careers.html', active_page='careers', title='Careers - Apna Brand Name')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting Apna Preschool Flask Server on http://0.0.0.0:{port}")
    app.run(debug=True, host='0.0.0.0', port=port)
