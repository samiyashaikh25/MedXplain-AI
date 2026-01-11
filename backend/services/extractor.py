def generate_patient_explanation(values):
    explanations = []

    for item in values:
        if item["status"] == "High":
            explanations.append(
                f"{item['test']} is higher than normal. "
                f"This may cause health issues if not controlled."
            )
        elif item["status"] == "Low":
            explanations.append(
                f"{item['test']} is lower than normal. "
                f"You may feel weak or tired."
            )
        else:
            explanations.append(
                f"{item['test']} is within the normal range. "
                f"No immediate action is needed."
            )

    return explanations
