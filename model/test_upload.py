import requests

# Path to your resume PDF
resume_path = r"C:\Users\admin\Desktop\au\Sample-CV.pdf"

# Upload the resume
with open(resume_path, 'rb') as f:
    files = {'file': ('resume.pdf', f, 'application/pdf')}
    response = requests.post('http://localhost:8000/upload-resume', files=files)

print("Status Code:", response.status_code)
print("Response:", response.json())

# If successful, get the user_id and fetch the profile
if response.status_code == 201:
    user_id = response.json()['user_id']
    print(f"\n✅ Resume uploaded! User ID: {user_id}")
    
    # Now get the full profile
    profile_response = requests.get(f'http://localhost:8000/profile/{user_id}')
    print("\n📋 Full Profile:")
    print(profile_response.json())