import React from 'react'
import {
  // Appointments & Scheduling
  CalendarCheck,
  CalendarPlus,
  Clock,
  CalendarDays,
  
  // Patients & People
  UserPlus,
  Users,
  User,
  UserCheck,
  
  // Medical & Prescriptions
  Pill,
  Syringe,
  Stethoscope,
  Heart,
  Thermometer,
  
  // Emergency & Alerts
  AlertCircle,
  AlertTriangle,
  Zap,
  Phone,
  
  // Charts & Data
  Activity,
  BarChart3,
  TrendingUp,
  PieChart,
  
  // Communication
  MessageSquare,
  Mail,
  Bell,
  
  // Navigation & Actions
  Search,
  Settings,
  LogOut,
  Edit,
  Save,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  
  // Medical Specialties
  Eye,
  Brain,
  Zap as Cardio,
  
  // Status & Indicators
  CheckCircle,
  XCircle,
  Clock as Pending,
  AlertOctagon,
  
  // File & Documents
  FileText,
  Download,
  Upload,
  Printer
} from 'lucide-react'

// Medical icon mappings with standardized sizing and colors
export const medicalIcons = {
  // Appointments
  appointments: CalendarCheck,
  scheduleAppointment: CalendarPlus,
  appointmentTime: Clock,
  calendar: CalendarDays,
  
  // Patients
  patients: Users,
  patient: User,
  newPatient: UserPlus,
  patientVerified: UserCheck,
  
  // Medical
  prescriptions: Pill,
  injection: Syringe,
  examination: Stethoscope,
  vitals: Heart,
  temperature: Thermometer,
  
  // Emergency
  emergency: AlertCircle,
  critical: AlertTriangle,
  urgent: Zap,
  emergencyCall: Phone,
  
  // Data & Analytics
  vitalsChart: Activity,
  reports: BarChart3,
  trends: TrendingUp,
  analytics: PieChart,
  
  // Communication
  messages: MessageSquare,
  email: Mail,
  notifications: Bell,
  
  // Actions
  search: Search,
  settings: Settings,
  logout: LogOut,
  edit: Edit,
  save: Save,
  close: X,
  expand: ChevronDown,
  next: ChevronRight,
  previous: ChevronLeft,
  add: Plus,
  remove: Minus,
  
  // Specialties
  ophthalmology: Eye,
  neurology: Brain,
  cardiology: Cardio,
  
  // Status
  success: CheckCircle,
  error: XCircle,
  pending: Pending,
  warning: AlertOctagon,
  
  // Documents
  document: FileText,
  download: Download,
  upload: Upload,
  print: Printer
}

// Icon component with healthcare-specific styling
export const MedicalIcon = ({ 
  name, 
  size = 20, 
  className = '', 
  variant = 'default',
  ...props 
}) => {
  const IconComponent = medicalIcons[name]
  
  if (!IconComponent) {
    console.warn(`Medical icon "${name}" not found`)
    return null
  }
  
  // Healthcare-specific variant styles
  const variantStyles = {
    default: 'text-healthcare-primary',
    emergency: 'text-healthcare-emergency animate-pulse',
    success: 'text-healthcare-secondary',
    warning: 'text-yellow-500',
    muted: 'text-gray-400',
    inverse: 'text-white'
  }
  
  const iconClasses = `${variantStyles[variant]} ${className}`
  
  return (
    <IconComponent 
      size={size} 
      className={iconClasses} 
      {...props}
    />
  )
}

// Predefined icon sets for common medical scenarios
export const iconSets = {
  vitals: {
    heartRate: { name: 'vitals', size: 16, variant: 'success' },
    temperature: { name: 'temperature', size: 16, variant: 'default' },
    bloodPressure: { name: 'vitalsChart', size: 16, variant: 'default' }
  },
  
  appointment: {
    scheduled: { name: 'appointments', size: 20, variant: 'success' },
    pending: { name: 'appointmentTime', size: 20, variant: 'warning' },
    cancelled: { name: 'close', size: 20, variant: 'error' }
  },
  
  patient: {
    new: { name: 'newPatient', size: 24, variant: 'default' },
    existing: { name: 'patient', size: 24, variant: 'muted' },
    verified: { name: 'patientVerified', size: 24, variant: 'success' }
  },
  
  emergency: {
    critical: { name: 'emergency', size: 24, variant: 'emergency' },
    urgent: { name: 'urgent', size: 20, variant: 'warning' },
    call: { name: 'emergencyCall', size: 20, variant: 'emergency' }
  }
}

// Quick access to commonly used medical icons
export const QuickIcons = {
  Appointment: (props) => <MedicalIcon name="appointments" {...props} />,
  Patient: (props) => <MedicalIcon name="patient" {...props} />,
  Prescription: (props) => <MedicalIcon name="prescriptions" {...props} />,
  Emergency: (props) => <MedicalIcon name="emergency" variant="emergency" {...props} />,
  Vitals: (props) => <MedicalIcon name="vitals" variant="success" {...props} />,
  Schedule: (props) => <MedicalIcon name="scheduleAppointment" {...props} />,
  Reports: (props) => <MedicalIcon name="reports" {...props} />,
  Settings: (props) => <MedicalIcon name="settings" {...props} />
}

// Accessibility helper for screen readers
export const IconWithLabel = ({ iconName, label, ...iconProps }) => (
  <span className="inline-flex items-center">
    <MedicalIcon name={iconName} {...iconProps} />
    <span className="sr-only">{label}</span>
  </span>
)

export default MedicalIcon 