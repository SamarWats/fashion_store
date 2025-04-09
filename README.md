**1. Clone the Repository**:
git clone https://github.com/SamarWats/fashion_store.git
cd fashion_store

**2. Create and Activate Virtual Environment**:
python -m venv venv
# Activate the virtual environment:
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

**3.Install Dependencies**:
pip install -r requirements.txt

**4.Configure MongoDB Connection**
Update your Django settings with the correct MongoDB connection details using MongoEngine.

**5. Run Migrations (If Required)**:
python manage.py migrate

**6.Start the Development Server**:
python manage.py runserver

**Now, open your browser and visit: http://127.0.0.1:8000/**
