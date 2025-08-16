# Meeting Summarizer App Workflow

## 1. Upload Transcript (Text file / paste text)
- User uploads a `.txt` file **OR** pastes transcript in text-box.
- Extract raw transcript text.

## 2. Custom Prompt
- User enters a custom instruction.  

## 3. Generate Summary
- Send transcript + prompt  
- Receive structured summary as response.

## 4. Editable Summary
- Display AI-generated summary in a **textarea**.  
- User can edit/refine the summary before sharing.

## 5. Share via Email
- User inputs recipient email(s).  
- Backend handles sending:
  - **Resend API (recommended: easier + reliable)**  
- Email contains the summary in a nice HTML format.
