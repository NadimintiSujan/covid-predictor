import pandas as pd
import joblib

# Load model
clf = joblib.load("covid_model.pkl")

# Define features
symptoms = ['Fever', 'Tiredness', 'Dry-Cough', 'Difficulty-in-Breathing', 'Sore-Throat']
experiences = ['Pains', 'Nasal-Congestion', 'Runny-Nose', 'Diarrhea']
age_group_cols = ['Age_0-9', 'Age_10-19', 'Age_20-24', 'Age_25-59', 'Age_60+']
gender_cols = ['Gender_Female', 'Gender_Male']
contact_cols = ['Contact_Dont-Know', 'Contact_No', 'Contact_Yes']
input_features = symptoms + experiences + age_group_cols + gender_cols + contact_cols

def predict(data):
    input_data = dict.fromkeys(input_features, 0)

    for s in symptoms:
        input_data[s] = 1 if data['symptoms'].get(s, '').lower() == 'yes' else 0
    for e in experiences:
        input_data[e] = 1 if data['experiences'].get(e, '').lower() == 'yes' else 0

    age = int(data['age'])
    if 0 <= age <= 9:
        input_data['Age_0-9'] = 1
    elif 10 <= age <= 19:
        input_data['Age_10-19'] = 1
    elif 20 <= age <= 24:
        input_data['Age_20-24'] = 1
    elif 25 <= age <= 59:
        input_data['Age_25-59'] = 1
    else:
        input_data['Age_60+'] = 1

    gender = data['gender'].lower()
    if gender == 'male':
        input_data['Gender_Male'] = 1
    elif gender == 'female':
        input_data['Gender_Female'] = 1

    contact = data['contact'].lower().replace("’", "'").strip()
    contact_key = f"Contact_{contact.title().replace(' ', '-')}"
    if contact_key in contact_cols:
        input_data[contact_key] = 1

    df = pd.DataFrame([input_data])
    return clf.predict(df)[0]

