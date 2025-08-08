import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Heart,
  Activity,
  Clock,
  CheckCircle,
  BadgeCheck,
  User,
  MapPin,
  ChevronDown,
} from "lucide-react";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import Button from "./Button";
import Alert from "./Alert";


const ProviderRegistration = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    licenseState: "",
    specialization: "",
    yearsOfExperience: "",
    practiceName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    acceptHIPAA: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getTimeGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleNextSection = () => {
    setCurrentSection((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevSection = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone',
      'licenseNumber', 'licenseState', 'specialization', 'yearsOfExperience',
      'practiceName', 'address', 'city', 'state', 'zipCode',
      'password', 'confirmPassword'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    const missingTerms = !formData.acceptTerms || !formData.acceptHIPAA;
    
    if (missingFields.length > 0) {
      addAlert(
        "error",
        "Missing Required Fields",
        `Please complete all required fields: ${missingFields.join(', ')}`
      );
      return;
    }
    
    if (missingTerms) {
      addAlert(
        "error",
        "Terms Not Accepted",
        "Please accept both Terms of Service and HIPAA Compliance"
      );
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      addAlert(
        "error",
        "Password Mismatch",
        "Password and Confirm Password must match"
      );
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setShowCelebration(true);
      addAlert(
        "success",
        "Registration Successful",
        "Welcome to the provider portal!"
      );
      
      // Redirect to login page after celebration
      setTimeout(() => {
        window.location.href = '/';
      }, 4000);
    }, 2000);
  };

  const addAlert = (type, title, message) => {
    const newAlert = {
      id: Date.now(),
      type,
      title,
      message,
    };
    setAlerts((prev) => [...prev, newAlert]);

    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== newAlert.id));
    }, 5000);
  };

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const isFormComplete = () => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone',
      'licenseNumber', 'licenseState', 'specialization', 'yearsOfExperience',
      'practiceName', 'address', 'city', 'state', 'zipCode',
      'password', 'confirmPassword'
    ];
    
    const allFieldsFilled = requiredFields.every(field => formData[field]);
    const termsAccepted = formData.acceptTerms && formData.acceptHIPAA;
    const passwordsMatch = formData.password === formData.confirmPassword;
    
    return allFieldsFilled && termsAccepted && passwordsMatch;
  };

  const getProgressPercentage = () => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone',
      'licenseNumber', 'licenseState', 'specialization', 'yearsOfExperience',
      'practiceName', 'address', 'city', 'state', 'zipCode',
      'password', 'confirmPassword'
    ];
    
    const filledFields = requiredFields.filter(field => formData[field]);
    const termsAccepted = formData.acceptTerms && formData.acceptHIPAA;
    const passwordsMatch = formData.password === formData.confirmPassword;
    
    const totalRequired = requiredFields.length + 2; // +2 for terms and password match
    const completed = filledFields.length + (termsAccepted ? 1 : 0) + (passwordsMatch ? 1 : 0);
    
    return Math.round((completed / totalRequired) * 100);
  };

  const sections = [
    {
      title: "Personal Information",
      icon: <User className="w-6 h-6" />,
      description: "Basic personal details for account creation",
    },
    {
      title: "Professional Credentials",
      icon: <BadgeCheck className="w-6 h-6" />,
      description: "Medical license and professional qualifications",
    },
    {
      title: "Practice Location",
      icon: <MapPin className="w-6 h-6" />,
      description: "Practice address and contact information",
    },
    {
      title: "Account Security",
      icon: <Shield className="w-6 h-6" />,
      description: "Password and security preferences",
    },
  ];

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Emergency Medicine",
    "Family Medicine",
    "Gastroenterology",
    "Internal Medicine",
    "Neurology",
    "Obstetrics & Gynecology",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Surgery",
    "Urology",
    "Other",
  ];

  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

      return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0ea5e9 0%, #ffffff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Celebration Effect */}
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.8)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              style={{
                background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                borderRadius: "50%",
                width: "120px",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
                boxShadow: "0 20px 40px rgba(5, 150, 105, 0.3)",
              }}
            >
              <CheckCircle style={{ width: "60px", height: "60px", color: "white" }} />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "white",
                marginBottom: "12px",
                textAlign: "center",
              }}
            >
              🎉 Welcome! 🎉
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                fontSize: "18px",
                color: "rgba(255, 255, 255, 0.9)",
                textAlign: "center",
                marginBottom: "24px",
              }}
            >
              Your registration was successful!<br />
              Redirecting to login page...
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "center",
              }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: `hsl(${i * 60}, 70%, 60%)`,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      

      <div className="ecg-wave-bg" />

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <motion.div
          style={{
            position: "absolute",
            top: "80px",
            left: "40px",
            color: "rgba(15, 118, 110, 0.05)",
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart style={{ width: "24px", height: "24px" }} />
        </motion.div>
        <motion.div
          style={{
            position: "absolute",
            top: "160px",
            right: "80px",
            color: "rgba(16, 185, 129, 0.05)",
          }}
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Activity style={{ width: "20px", height: "20px" }} />
        </motion.div>
        <motion.div
          style={{
            position: "absolute",
            bottom: "160px",
            left: "80px",
            color: "rgba(14, 165, 233, 0.05)",
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Shield style={{ width: "22px", height: "22px" }} />
        </motion.div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "16px",
        }}
      >
                  <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ 
              width: "100%", 
              maxWidth: "800px",
              padding: "0 16px"
            }}
          >
                      <motion.div
              className="medical-card"
              style={{ padding: "48px" }}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {/* Progress Indicator */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginBottom: "32px",
                  padding: "16px",
                  background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                  borderRadius: "12px",
                  border: "1px solid #bae6fd",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#0c4a6e" }}>
                    Form Completion Progress
                  </span>
                  <span style={{ fontSize: "12px", color: "#0369a1", fontWeight: "500" }}>
                    {getProgressPercentage()}%
                  </span>
                </div>
                <div style={{ 
                  width: "100%", 
                  height: "6px", 
                  background: "#e0f2fe", 
                  borderRadius: "3px",
                  overflow: "hidden"
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgressPercentage()}%` }}
                    transition={{ duration: 0.5 }}
                    style={{
                      height: "100%",
                      background: "linear-gradient(90deg, #0ea5e9 0%, #0284c7 100%)",
                      borderRadius: "3px",
                    }}
                  />
                </div>
                {!isFormComplete() && (
                  <div style={{ marginTop: "8px", fontSize: "12px", color: "#dc2626" }}>
                    ⚠️ Please complete all required fields to proceed
                    <div style={{ marginTop: "4px", fontSize: "10px", color: "#9ca3af" }}>
                      Missing: {(() => {
                        const requiredFields = [
                          'firstName', 'lastName', 'email', 'phone',
                          'licenseNumber', 'licenseState', 'specialization', 'yearsOfExperience',
                          'practiceName', 'address', 'city', 'state', 'zipCode',
                          'password', 'confirmPassword'
                        ];
                        const missingFields = requiredFields.filter(field => !formData[field]);
                        const missingTerms = !formData.acceptTerms || !formData.acceptHIPAA;
                        const passwordsMismatch = formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword;
                        
                        let issues = [];
                        if (missingFields.length > 0) {
                          issues.push(`Fields: ${missingFields.join(', ')}`);
                        }
                        if (missingTerms) {
                          issues.push('Terms not accepted');
                        }
                        if (passwordsMismatch) {
                          issues.push('Passwords do not match');
                        }
                        return issues.join(' | ');
                      })()}
                    </div>

                  </div>
                )}
              </motion.div>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "80px",
                  height: "80px",
                  background:
                    "linear-gradient(135deg, rgba(15, 118, 110, 0.1) 0%, rgba(15, 118, 110, 0.05) 100%)",
                  borderRadius: "50%",
                  marginBottom: "24px",
                  border: "2px solid rgba(15, 118, 110, 0.1)",
                  boxShadow: "0 8px 16px rgba(15, 118, 110, 0.15)",
                }}
              >
                                 <User
                   style={{ width: "40px", height: "40px", color: "#0f766e" }}
                 />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: "12px",
                  letterSpacing: "-0.025em",
                }}
              >
                Provider Registration
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  color: "#6b7280",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  marginBottom: "16px",
                }}
              >
                {getTimeGreeting()}, Healthcare Professional
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  backgroundColor: "rgba(15, 118, 110, 0.05)",
                  borderRadius: "20px",
                  border: "1px solid rgba(15, 118, 110, 0.1)",
                  width: "fit-content",
                  margin: "0 auto",
                }}
              >
                <Clock
                  style={{ width: "16px", height: "16px", color: "#0f766e" }}
                />
                <span
                  style={{
                    fontSize: "14px",
                    color: "#0f766e",
                    fontWeight: "500",
                  }}
                >
                  {currentTime.toLocaleTimeString()}
                </span>
              </motion.div>
            </div>

            <AnimatePresence>
              {alerts.map((alert) => (
                <Alert
                  key={alert.id}
                  type={alert.type}
                  title={alert.title}
                  message={alert.message}
                  onClose={() => removeAlert(alert.id)}
                  autoClose={true}
                />
              ))}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {currentSection === 0 && (
                  <motion.div
                    key="personal"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "24px",
                      }}
                    >
                      <TextInput
                        label="First Name"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        error={errors.firstName}
                        required
                      />

                      <TextInput
                        label="Last Name"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        error={errors.lastName}
                        required
                      />
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "32px",
                        marginTop: "32px",
                      }}
                    >
                      <TextInput
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        error={errors.email}
                        required
                      />

                      <TextInput
                        label="Phone Number"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        error={errors.phone}
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {currentSection === 1 && (
                  <motion.div
                    key="credentials"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "32px",
                        marginBottom: "32px",
                      }}
                    >
                      <TextInput
                        label="License Number"
                        placeholder="Enter your medical license number"
                        value={formData.licenseNumber}
                        onChange={(e) =>
                          handleInputChange("licenseNumber", e.target.value)
                        }
                        error={errors.licenseNumber}
                        required
                      />

                      <div className="form-group">
                        <label className="form-label">
                          License State
                          <span className="form-required">*</span>
                        </label>
                        <select
                          className="lightwind-input"
                          value={formData.licenseState}
                          onChange={(e) =>
                            handleInputChange("licenseState", e.target.value)
                          }
                          required
                        >
                          <option value="">Select state</option>
                          {states.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "32px",
                        marginTop: "32px",
                      }}
                    >
                      <div className="form-group">
                        <label className="form-label">
                          Specialization
                          <span className="form-required">*</span>
                        </label>
                        <select
                          className="lightwind-input"
                          value={formData.specialization}
                          onChange={(e) =>
                            handleInputChange("specialization", e.target.value)
                          }
                          required
                        >
                          <option value="">Select specialization</option>
                          {specializations.map((spec) => (
                            <option key={spec} value={spec}>
                              {spec}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Years of Experience
                          <span className="form-required">*</span>
                        </label>
                        <select
                          className="lightwind-input"
                          value={formData.yearsOfExperience}
                          onChange={(e) =>
                            handleInputChange(
                              "yearsOfExperience",
                              e.target.value
                            )
                          }
                          required
                        >
                          <option value="">Select experience</option>
                          {[...Array(31)].map((_, i) => (
                            <option key={i} value={i}>
                              {i} {i === 1 ? "year" : "years"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentSection === 2 && (
                  <motion.div
                    key="location"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TextInput
                      label="Practice Name"
                      placeholder="Enter your practice or hospital name"
                      value={formData.practiceName}
                      onChange={(e) =>
                        handleInputChange("practiceName", e.target.value)
                      }
                      error={errors.practiceName}
                      required
                    />

                                         <div style={{ marginTop: "32px", marginBottom: "32px" }}>
                       <TextInput
                         label="Street Address"
                         placeholder="Enter your practice address"
                         value={formData.address}
                         onChange={(e) =>
                           handleInputChange("address", e.target.value)
                         }
                         error={errors.address}
                         required
                       />
                     </div>

                     <div
                       style={{
                         display: "grid",
                         gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                         gap: "32px",
                         marginTop: "32px",
                       }}
                     >
                      <TextInput
                        label="City"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        error={errors.city}
                        required
                      />

                      <div className="form-group">
                        <label className="form-label">
                          State
                          <span className="form-required">*</span>
                        </label>
                        <select
                          className="lightwind-input"
                          value={formData.state}
                          onChange={(e) =>
                            handleInputChange("state", e.target.value)
                          }
                          required
                        >
                          <option value="">Select state</option>
                          {states.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>

                      <TextInput
                        label="ZIP Code"
                        placeholder="ZIP code"
                        value={formData.zipCode}
                        onChange={(e) =>
                          handleInputChange("zipCode", e.target.value)
                        }
                        error={errors.zipCode}
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {currentSection === 3 && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PasswordInput
                      label="Password *"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      error={errors.password}
                      required
                      showStrengthMeter={true}
                    />
                    {!formData.password && (
                      <div style={{ marginTop: "8px", fontSize: "12px", color: "#dc2626", display: "flex", alignItems: "center", gap: "4px" }}>
                        <span>⚠️</span>
                        <span>Password is required to complete registration</span>
                      </div>
                    )}

                    <div style={{ marginTop: "32px", marginBottom: "32px" }}>
                      <PasswordInput
                        label="Confirm Password *"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        error={errors.confirmPassword}
                        required
                        showStrengthMeter={false}
                      />
                      {!formData.confirmPassword && (
                        <div style={{ marginTop: "8px", fontSize: "12px", color: "#dc2626", display: "flex", alignItems: "center", gap: "4px" }}>
                          <span>⚠️</span>
                          <span>Password confirmation is required</span>
                        </div>
                      )}
                      {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <div style={{ marginTop: "8px", fontSize: "12px", color: "#dc2626", display: "flex", alignItems: "center", gap: "4px" }}>
                          <span>⚠️</span>
                          <span>Passwords do not match</span>
                        </div>
                      )}
                    </div>

                     <div style={{ marginTop: "40px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                          marginBottom: "16px",
                        }}
                      >
                        <input
                          type="checkbox"
                          id="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={(e) =>
                            handleInputChange("acceptTerms", e.target.checked)
                          }
                          style={{ marginTop: "4px" }}
                        />
                        <label
                          htmlFor="acceptTerms"
                          style={{
                            fontSize: "14px",
                            color: "#374151",
                            lineHeight: "1.5",
                          }}
                        >
                          I accept the{" "}
                          <a
                            href="#"
                            style={{
                              color: "#0f766e",
                              textDecoration: "underline",
                            }}
                          >
                            Terms and Conditions
                          </a>{" "}
                          and{" "}
                          <a
                            href="#"
                            style={{
                              color: "#0f766e",
                              textDecoration: "underline",
                            }}
                          >
                            Privacy Policy
                          </a>
                          <span style={{ color: "#dc2626", marginLeft: "4px" }}>*</span>
                        </label>
                      </div>
                      {!formData.acceptTerms && (
                        <div style={{ marginTop: "4px", fontSize: "12px", color: "#dc2626", display: "flex", alignItems: "center", gap: "4px" }}>
                          <span>⚠️</span>
                          <span>You must accept the Terms and Conditions</span>
                        </div>
                      )}

                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                        }}
                      >
                        <input
                          type="checkbox"
                          id="acceptHIPAA"
                          checked={formData.acceptHIPAA}
                          onChange={(e) =>
                            handleInputChange("acceptHIPAA", e.target.checked)
                          }
                          style={{ marginTop: "4px" }}
                        />
                        <label
                          htmlFor="acceptHIPAA"
                          style={{
                            fontSize: "14px",
                            color: "#374151",
                            lineHeight: "1.5",
                          }}
                        >
                          I acknowledge and agree to comply with HIPAA
                          regulations and data protection requirements
                          <span style={{ color: "#dc2626", marginLeft: "4px" }}>*</span>
                        </label>
                      </div>
                      {!formData.acceptHIPAA && (
                        <div style={{ marginTop: "4px", fontSize: "12px", color: "#dc2626", display: "flex", alignItems: "center", gap: "4px" }}>
                          <span>⚠️</span>
                          <span>You must accept HIPAA compliance</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

                              <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "48px",
                    paddingTop: "40px",
                    borderTop: "1px solid #e5e7eb",
                  }}
                >
                <Button
                  type="button"
                  onClick={handlePrevSection}
                  disabled={currentSection === 0}
                  style={{
                    backgroundColor:
                      currentSection === 0 ? "#f3f4f6" : "#ffffff",
                    color: currentSection === 0 ? "#9ca3af" : "#374151",
                    border: "2px solid #e5e7eb",
                  }}
                >
                  Previous
                </Button>

                {currentSection < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNextSection}
                    icon={
                      <ChevronDown
                        style={{
                          width: "16px",
                          height: "16px",
                          transform: "rotate(-90deg)",
                        }}
                      />
                    }
                  >
                    Next Section
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    loading={loading}
                    disabled={!isFormComplete()}
                    icon={
                      <CheckCircle style={{ width: "16px", height: "16px" }} />
                    }
                    style={{
                      opacity: !isFormComplete() ? 0.6 : 1,
                      cursor: !isFormComplete() ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Creating Account..." : !isFormComplete() ? "Complete All Fields" : "Complete Registration"}
                  </Button>
                )}
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: "40px",
                paddingTop: "32px",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "14px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Shield
                    style={{ width: "16px", height: "16px", color: "#059669" }}
                  />
                  <span style={{ color: "#6b7280", fontWeight: "500" }}>
                    HIPAA Compliant Registration
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#059669",
                  }}
                >
                  <CheckCircle style={{ width: "16px", height: "16px" }} />
                  <span style={{ fontSize: "12px", fontWeight: "600" }}>
                    Secure Connection
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ textAlign: "center", marginTop: "32px" }}
          >
            <div className="hipaa-badge">
              <Shield
                style={{ width: "12px", height: "12px", marginRight: "4px" }}
              />
              HIPAA Compliant
            </div>

            <p
              style={{
                fontSize: "12px",
                color: "#9ca3af",
                marginTop: "8px",
                fontStyle: "italic",
              }}
            >
              Protected by enterprise-grade security protocols
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProviderRegistration;
