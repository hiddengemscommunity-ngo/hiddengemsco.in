// Centralized Supabase client for HiddenGems.
// Keep the existing anon/publishable key in this file only.
const SUPABASE_URL = 'https://lyrlppgledsvdznxnpxo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5cmxwcGdsZWRzdmR6bnhucHhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MDYxMTAsImV4cCI6MjEwMTM4MjExMH0.iYb76_f_QbBlYnHSjqOjWEF3VeI9r6ziEefPyIMF5SU';

function getSupabaseClient() {
  if (typeof window === 'undefined' || !window.supabase?.createClient) {
    throw new Error('Supabase library is not loaded yet.');
  }

  return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export const supabaseClient = getSupabaseClient();

export async function submitInternApplication(formData) {
  try {
    const { data, error } = await supabaseClient
      .from('intern_applications')
      .insert([
        {
          full_name: formData.appName ?? '',
          email: formData.appEmail ?? '',
          phone: formData.appPhone ?? '',
          college: formData.appCollege ?? '',
          major: formData.appMajor ?? '',
          study_year: formData.appYear ?? '',
          city_state: formData.appCity ?? '',
          roles: Array.isArray(formData.roles) ? formData.roles : [],
          availability: formData.availability ?? '',
          duration: formData.duration ?? '',
          linkedin_url: formData.appLinkedin ?? '',
          portfolio_url: formData.appPortfolio ?? '',
          why_join: formData.appWhy ?? ''
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Supabase intern submission error:', error.message);
    return { success: false, error: error.message };
  }
}

export async function submitCommunityRequest(formData) {
  try {
    const { data, error } = await supabaseClient
      .from('community_requests')
      .insert([
        {
          full_name: formData.name ?? '',
          email: formData.email ?? '',
          mobile_number: formData.phone ?? ''
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Supabase community submission error:', error.message);
    return { success: false, error: error.message };
  }
}

export async function submitProgramRegistration(formData) {
  try {
    const { data, error } = await supabaseClient
      .from('program_registrations')
      .insert([
        {
          full_name: formData.regName ?? '',
          email: formData.regEmail ?? '',
          phone: formData.regPhone ?? '',
          location: formData.regLocation ?? '',
          program_choice: formData.programChoice ?? '',
          institution: formData.regInstitution ?? '',
          status: formData.regStatus ?? '',
          major: formData.regMajor ?? '',
          goals: formData.regGoals ?? ''
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Supabase program registration error:', error.message);
    return { success: false, error: error.message };
  }
}

export async function submitPartnerRegistration(formData) {
  try {
    const { data, error } = await supabaseClient.from('partner_registrations').insert([{
      org_name: formData.orgName ?? '',
      org_type: formData.orgType ?? '',
      org_industry: formData.orgIndustry ?? '',
      org_year: formData.orgYear ?? '',
      org_size: formData.orgSize ?? '',
      org_website: formData.orgWebsite ?? '',
      org_cin: formData.orgCIN ?? '',
      org_gstin: formData.orgGSTIN ?? '',
      org_address: formData.orgAddress ?? '',
      org_city: formData.orgCity ?? '',
      org_state: formData.orgState ?? '',
      org_pincode: formData.orgPincode ?? '',
      org_country: formData.orgCountry ?? '',
      contact_name: formData.contactName ?? '',
      contact_designation: formData.contactDesignation ?? '',
      contact_email: formData.contactEmail ?? '',
      contact_phone: formData.contactPhone ?? '',
      contact_alt: formData.contactAlt ?? '',
      contact_linkedin: formData.contactLinkedin ?? '',
      partnership_types: formData.partnershipTypes ?? [],
      programs: formData.programs ?? [],
      budget: formData.budget ?? '',
      duration: formData.duration ?? '',
      hear_about: formData.hearAbout ?? '',
      notes: formData.notes ?? ''
    }]);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Supabase partner submission error:', error.message);
    return { success: false, error: error.message };
  }
}

export async function getInternApplications() {
  try {
    const { data, error } = await supabaseClient
      .from('intern_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Supabase fetch error:', error.message);
    return { success: false, error: error.message };
  }
}