export const currentUser = {
  name: "Dr. Sarah Mitchell",
  email: "sarah.mitchell@medicare.com",
  role: "Administrator",
  department: "Hospital Administration",
  phone: "+1 (555) 210-8890",
  joined: "March 2019",
};

export const patients = [
  { id: "P-1001", name: "James Wilson", age: 45, gender: "Male", bloodGroup: "O+", phone: "+1 555 0101", email: "james.wilson@mail.com", address: "221B Baker Street, NY", diagnosis: "Cardiac Arrhythmia", admissionDate: "2025-01-12", status: "Admitted", doctor: "Dr. Emily Carter" },
  { id: "P-1002", name: "Maria Garcia", age: 34, gender: "Female", bloodGroup: "A-", phone: "+1 555 0102", email: "maria.garcia@mail.com", address: "88 Pine Ave, Boston", diagnosis: "Pneumonia", admissionDate: "2025-01-10", status: "Critical", doctor: "Dr. Michael Chen" },
  { id: "P-1003", name: "Robert Brown", age: 58, gender: "Male", bloodGroup: "B+", phone: "+1 555 0103", email: "robert.brown@mail.com", address: "12 Elm St, Chicago", diagnosis: "Type 2 Diabetes", admissionDate: "2025-01-15", status: "Outpatient", doctor: "Dr. Priya Sharma" },
  { id: "P-1004", name: "Linda Martinez", age: 29, gender: "Female", bloodGroup: "AB+", phone: "+1 555 0104", email: "linda.martinez@mail.com", address: "45 Oak Rd, Austin", diagnosis: "Appendicitis", admissionDate: "2025-01-14", status: "Admitted", doctor: "Dr. James O'Brien" },
  { id: "P-1005", name: "David Lee", age: 62, gender: "Male", bloodGroup: "O-", phone: "+1 555 0105", email: "david.lee@mail.com", address: "7 Cedar Ln, Seattle", diagnosis: "Hypertension", admissionDate: "2025-01-08", status: "Discharged", doctor: "Dr. Emily Carter" },
  { id: "P-1006", name: "Sophia Anderson", age: 41, gender: "Female", bloodGroup: "A+", phone: "+1 555 0106", email: "sophia.anderson@mail.com", address: "230 Maple Dr, Denver", diagnosis: "Migraine", admissionDate: "2025-01-16", status: "Outpatient", doctor: "Dr. Raj Patel" },
  { id: "P-1007", name: "Michael Johnson", age: 52, gender: "Male", bloodGroup: "B-", phone: "+1 555 0107", email: "michael.johnson@mail.com", address: "18 Birch St, Miami", diagnosis: "Kidney Stones", admissionDate: "2025-01-11", status: "Admitted", doctor: "Dr. Sarah Mitchell" },
  { id: "P-1008", name: "Emma Thompson", age: 37, gender: "Female", bloodGroup: "O+", phone: "+1 555 0108", email: "emma.thompson@mail.com", address: "56 Willow Way, Dallas", diagnosis: "Asthma", admissionDate: "2025-01-13", status: "Discharged", doctor: "Dr. Michael Chen" },
  { id: "P-1009", name: "William Davis", age: 71, gender: "Male", bloodGroup: "AB-", phone: "+1 555 0109", email: "william.davis@mail.com", address: "90 Spruce Ave, Phoenix", diagnosis: "Coronary Artery Disease", admissionDate: "2025-01-09", status: "Critical", doctor: "Dr. Emily Carter" },
  { id: "P-1010", name: "Olivia Wilson", age: 25, gender: "Female", bloodGroup: "A+", phone: "+1 555 0110", email: "olivia.wilson@mail.com", address: "34 Redwood Ct, Portland", diagnosis: "Fractured Wrist", admissionDate: "2025-01-17", status: "Admitted", doctor: "Dr. James O'Brien" },
  { id: "P-1011", name: "Daniel Moore", age: 48, gender: "Male", bloodGroup: "O+", phone: "+1 555 0111", email: "daniel.moore@mail.com", address: "15 Palm Blvd, Tampa", diagnosis: "Gastritis", admissionDate: "2025-01-18", status: "Outpatient", doctor: "Dr. Priya Sharma" },
  { id: "P-1012", name: "Ava Taylor", age: 31, gender: "Female", bloodGroup: "B+", phone: "+1 555 0112", email: "ava.taylor@mail.com", address: "72 Ash St, Atlanta", diagnosis: "Anemia", admissionDate: "2025-01-19", status: "Admitted", doctor: "Dr. Raj Patel" },
];

export const doctors = [
  { id: "D-2001", name: "Dr. Emily Carter", specialty: "Cardiology", phone: "+1 555 0201", email: "emily.carter@medicare.com", experience: 14, patients: 320, availability: "Available", rating: 4.9 },
  { id: "D-2002", name: "Dr. Michael Chen", specialty: "Pulmonology", phone: "+1 555 0202", email: "michael.chen@medicare.com", experience: 11, patients: 285, availability: "In Surgery", rating: 4.8 },
  { id: "D-2003", name: "Dr. Priya Sharma", specialty: "Endocrinology", phone: "+1 555 0203", email: "priya.sharma@medicare.com", experience: 9, patients: 210, availability: "Available", rating: 4.7 },
  { id: "D-2004", name: "Dr. James O'Brien", specialty: "Orthopedics", phone: "+1 555 0204", email: "james.obrien@medicare.com", experience: 17, patients: 410, availability: "Available", rating: 4.9 },
  { id: "D-2005", name: "Dr. Raj Patel", specialty: "Neurology", phone: "+1 555 0205", email: "raj.patel@medicare.com", experience: 12, patients: 260, availability: "On Leave", rating: 4.6 },
  { id: "D-2006", name: "Dr. Sarah Mitchell", specialty: "Internal Medicine", phone: "+1 555 0206", email: "sarah.mitchell@medicare.com", experience: 15, patients: 450, availability: "Available", rating: 4.9 },
  { id: "D-2007", name: "Dr. Hannah Kim", specialty: "Pediatrics", phone: "+1 555 0207", email: "hannah.kim@medicare.com", experience: 8, patients: 190, availability: "Available", rating: 4.8 },
  { id: "D-2008", name: "Dr. Robert Ford", specialty: "Dermatology", phone: "+1 555 0208", email: "robert.ford@medicare.com", experience: 10, patients: 175, availability: "Available", rating: 4.5 },
];

export const appointments = [
  { id: "A-3001", patient: "James Wilson", doctor: "Dr. Emily Carter", date: "2025-01-22", time: "09:00 AM", type: "Checkup", status: "Scheduled" },
  { id: "A-3002", patient: "Maria Garcia", doctor: "Dr. Michael Chen", date: "2025-01-22", time: "09:30 AM", type: "Consultation", status: "Pending" },
  { id: "A-3003", patient: "Robert Brown", doctor: "Dr. Priya Sharma", date: "2025-01-22", time: "10:15 AM", type: "Follow-up", status: "Completed" },
  { id: "A-3004", patient: "Linda Martinez", doctor: "Dr. James O'Brien", date: "2025-01-23", time: "11:00 AM", type: "Surgery", status: "Scheduled" },
  { id: "A-3005", patient: "Sophia Anderson", doctor: "Dr. Raj Patel", date: "2025-01-23", time: "01:30 PM", type: "Checkup", status: "Cancelled" },
  { id: "A-3006", patient: "Michael Johnson", doctor: "Dr. Sarah Mitchell", date: "2025-01-24", time: "09:45 AM", type: "Consultation", status: "Scheduled" },
  { id: "A-3007", patient: "Olivia Wilson", doctor: "Dr. James O'Brien", date: "2025-01-24", time: "02:00 PM", type: "Follow-up", status: "Pending" },
  { id: "A-3008", patient: "William Davis", doctor: "Dr. Emily Carter", date: "2025-01-25", time: "10:30 AM", type: "Surgery", status: "Scheduled" },
  { id: "A-3009", patient: "Ava Taylor", doctor: "Dr. Raj Patel", date: "2025-01-25", time: "03:15 PM", type: "Checkup", status: "Scheduled" },
  { id: "A-3010", patient: "Daniel Moore", doctor: "Dr. Priya Sharma", date: "2025-01-26", time: "11:45 AM", type: "Consultation", status: "Pending" },
];

export const beds = [
  { id: "B-4001", ward: "Cardiology", number: "C-101", type: "ICU", status: "Occupied", patient: "James Wilson" },
  { id: "B-4002", ward: "Cardiology", number: "C-102", type: "ICU", status: "Available" },
  { id: "B-4003", ward: "General", number: "G-201", type: "General", status: "Occupied", patient: "Maria Garcia" },
  { id: "B-4004", ward: "General", number: "G-202", type: "General", status: "Available" },
  { id: "B-4005", ward: "General", number: "G-203", type: "General", status: "Available" },
  { id: "B-4006", ward: "Private", number: "P-301", type: "Private", status: "Occupied", patient: "William Davis" },
  { id: "B-4007", ward: "Private", number: "P-302", type: "Private", status: "Reserved" },
  { id: "B-4008", ward: "Emergency", number: "E-401", type: "Emergency", status: "Occupied", patient: "Ava Taylor" },
  { id: "B-4009", ward: "Emergency", number: "E-402", type: "Emergency", status: "Available" },
  { id: "B-4010", ward: "General", number: "G-204", type: "General", status: "Maintenance" },
  { id: "B-4011", ward: "Private", number: "P-303", type: "Private", status: "Available" },
  { id: "B-4012", ward: "ICU", number: "C-103", type: "ICU", status: "Occupied", patient: "Maria Garcia" },
];

export const medicines = [
  { id: "M-5001", name: "Amoxicillin", category: "Antibiotic", stock: 450, price: 12.5, expiry: "2026-08-15", manufacturer: "Pfizer" },
  { id: "M-5002", name: "Metformin", category: "Antidiabetic", stock: 320, price: 8.75, expiry: "2026-11-30", manufacturer: "Novartis" },
  { id: "M-5003", name: "Atorvastatin", category: "Cardiovascular", stock: 280, price: 15.2, expiry: "2026-05-20", manufacturer: "AstraZeneca" },
  { id: "M-5004", name: "Paracetamol", category: "Analgesic", stock: 600, price: 3.4, expiry: "2027-01-10", manufacturer: "Johnson & Johnson" },
  { id: "M-5005", name: "Ibuprofen", category: "Analgesic", stock: 40, price: 5.9, expiry: "2026-03-25", manufacturer: "Bayer" },
  { id: "M-5006", name: "Omeprazole", category: "Gastrointestinal", stock: 210, price: 11.8, expiry: "2026-09-05", manufacturer: "AstraZeneca" },
  { id: "M-5007", name: "Azithromycin", category: "Antibiotic", stock: 18, price: 22.0, expiry: "2026-07-12", manufacturer: "Pfizer" },
  { id: "M-5008", name: "Cetirizine", category: "Antihistamine", stock: 340, price: 6.25, expiry: "2027-02-28", manufacturer: "GSK" },
  { id: "M-5009", name: "Insulin Glargine", category: "Antidiabetic", stock: 95, price: 48.0, expiry: "2026-04-18", manufacturer: "Sanofi" },
  { id: "M-5010", name: "Lisinopril", category: "Cardiovascular", stock: 160, price: 9.6, expiry: "2026-10-22", manufacturer: "Merck" },
];

export const invoices = [
  { id: "INV-6001", patient: "James Wilson", date: "2025-01-20", items: 4, total: 1240.0, status: "Paid", method: "Credit Card" },
  { id: "INV-6002", patient: "Maria Garcia", date: "2025-01-19", items: 6, total: 2980.5, status: "Pending", method: "Insurance" },
  { id: "INV-6003", patient: "Robert Brown", date: "2025-01-18", items: 2, total: 480.0, status: "Paid", method: "Cash" },
  { id: "INV-6004", patient: "William Davis", date: "2025-01-17", items: 8, total: 5620.0, status: "Overdue", method: "Insurance" },
  { id: "INV-6005", patient: "Linda Martinez", date: "2025-01-16", items: 3, total: 1890.0, status: "Paid", method: "Debit Card" },
  { id: "INV-6006", patient: "Olivia Wilson", date: "2025-01-15", items: 5, total: 2150.0, status: "Pending", method: "Insurance" },
  { id: "INV-6007", patient: "Michael Johnson", date: "2025-01-14", items: 4, total: 1560.0, status: "Paid", method: "Credit Card" },
  { id: "INV-6008", patient: "Ava Taylor", date: "2025-01-13", items: 7, total: 3340.0, status: "Overdue", method: "Insurance" },
];

export const notifications = [
  { id: "N-1", title: "New appointment scheduled", message: "Olivia Wilson has an appointment with Dr. James O'Brien.", time: "5 min ago", type: "info", read: false },
  { id: "N-2", title: "Low stock alert", message: "Azithromycin stock is below threshold (18 units).", time: "1 hour ago", type: "warning", read: false },
  { id: "N-3", title: "Patient admitted", message: "Ava Taylor admitted to Emergency ward E-401.", time: "3 hours ago", type: "success", read: false },
  { id: "N-4", title: "Overdue invoice", message: "INV-6004 for William Davis is overdue.", time: "Yesterday", type: "error", read: true },
  { id: "N-5", title: "Doctor on leave", message: "Dr. Raj Patel is on leave starting next week.", time: "2 days ago", type: "info", read: true },
];

export const weeklyAdmissions = [
  { day: "Mon", admissions: 24, discharges: 18 },
  { day: "Tue", admissions: 32, discharges: 22 },
  { day: "Wed", admissions: 28, discharges: 25 },
  { day: "Thu", admissions: 40, discharges: 30 },
  { day: "Fri", admissions: 36, discharges: 28 },
  { day: "Sat", admissions: 22, discharges: 20 },
  { day: "Sun", admissions: 18, discharges: 16 },
];

export const departmentStats = [
  { department: "Cardiology", patients: 86 },
  { department: "Neurology", patients: 64 },
  { department: "Orthopedics", patients: 72 },
  { department: "Pediatrics", patients: 58 },
  { department: "Internal", patients: 94 },
  { department: "Pulmonology", patients: 48 },
];
