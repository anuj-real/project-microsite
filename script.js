// Replace these with your actual Supabase Project details
const SUPABASE_URL = 'https://ptlcvgfxfdgamhxzivam.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_E0LR4jK0w4N4v2LMLDzAzw_ziUM9jk1';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const leadForm = document.getElementById('lead-form');
const submitBtn = document.getElementById('submit-btn');
const successMsg = document.getElementById('success-msg');

leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // UI state change
    submitBtn.disabled = true;
    submitBtn.innerText = 'Processing...';

    const formData = new FormData(leadForm);
    const leadData = {
        full_name: formData.get('full_name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        source: window.location.hostname
    };

    // Insert data into Supabase 'leads' table
    const { error } = await _supabase
        .from('leads')
        .insert([leadData]);

    if (error) {
        alert('Error submitting form: ' + error.message);
        submitBtn.disabled = false;
        submitBtn.innerText = 'Submit Details';
    } else {
        leadForm.classList.add('hidden');
        successMsg.classList.remove('hidden');
    }
});
