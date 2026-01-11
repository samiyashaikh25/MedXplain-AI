import re

def extract_medical_values(text):
    values = []

    sugar_match = re.search(r"(Blood Sugar|Glucose).*?(\d+)\s*mg/dL", text, re.I)
    if sugar_match:
        sugar = int(sugar_match.group(2))
        values.append({
            "test": "Blood Sugar (Fasting)",
            "value": f"{sugar} mg/dL",
            "range": "70–100 mg/dL",
            "status": "High" if sugar > 100 else "Normal"
        })

    hb_match = re.search(r"(Hemoglobin|Hb).*?(\d+\.?\d*)\s*g/dL", text, re.I)
    if hb_match:
        hb = float(hb_match.group(2))
        values.append({
            "test": "Hemoglobin",
            "value": f"{hb} g/dL",
            "range": "12–15 g/dL",
            "status": "Normal"
        })

    return values


def generate_patient_explanation():
    return {
        "simpleSummary": "Your sugar level is higher than normal. If not controlled, it may slowly harm your body.",
        "translatedSummary": "आपका ब्लड शुगर सामान्य से अधिक है। समय पर ध्यान नहीं दिया गया तो यह नुकसान कर सकता है।",
        "do": [
            "Walk daily for 30 minutes",
            "Eat vegetables and whole grains",
            "Drink plenty of water"
        ],
        "dont": [
            "Avoid sweets and sugary drinks",
            "Do not skip meals",
            "Avoid stress"
        ]
    }
