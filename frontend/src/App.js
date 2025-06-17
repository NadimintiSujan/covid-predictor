import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { motion } from "framer-motion";
import { FaVirus, FaHeartbeat, FaUserShield } from "react-icons/fa";

const symptomsList = ['Fever', 'Tiredness', 'Dry-Cough', 'Difficulty-in-Breathing', 'Sore-Throat'];
const experiencesList = ['Pains', 'Nasal-Congestion', 'Runny-Nose', 'Diarrhea'];

function App() {
  const [inputs, setInputs] = useState({
    symptoms: {},
    experiences: {},
    age: '',
    gender: '',
    contact: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e, group, key) => {
    setInputs({
      ...inputs,
      [group]: { ...inputs[group], [key]: e.target.value }
    });
  };

  const handleSimpleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5001/predict", inputs) 
      //axios.post("http://127.0.0.1:5000/predict", inputs); (when running Flask on localhost)
      //axios.post("http://localhost:5001/predict", inputs); // (when running Flask on Docker)
      setResult(response.data.severity);
    } catch (err) {
      alert("❌ Prediction failed. Make sure Flask is running.");
    }
  };

  return (
    <div className="App">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        <h1><FaVirus /> COVID Severity Predictor</h1>

        <div className="form">
          <h2><FaHeartbeat /> Symptoms</h2>
          {symptomsList.map((s) => (
            <div key={s}>
              <label>{s.replace(/-/g, ' ')}:</label>
              <select onChange={(e) => handleChange(e, 'symptoms', s)} defaultValue="">
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          ))}

          <h2><FaHeartbeat /> Other Experiences</h2>
          {experiencesList.map((e) => (
            <div key={e}>
              <label>{e.replace(/-/g, ' ')}:</label>
              <select onChange={(e) => handleChange(e, 'experiences', e)} defaultValue="">
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          ))}

          <h2><FaUserShield /> Personal Info</h2>
          <input type="number" name="age" placeholder="Age" onChange={handleSimpleChange} />
          <select name="gender" onChange={handleSimpleChange} defaultValue="">
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select name="contact" onChange={handleSimpleChange} defaultValue="">
            <option value="">Contact with COVID-positive?</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="don't know">Don't Know</option>
          </select>

          <motion.button whileTap={{ scale: 0.9 }} onClick={handleSubmit}>
            Predict
          </motion.button>

          {result && (
            <motion.h2
              className="result"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              🧬 Predicted Severity: <span>{result.toUpperCase()}</span>
            </motion.h2>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default App;
