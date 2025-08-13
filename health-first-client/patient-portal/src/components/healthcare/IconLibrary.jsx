import {
  CalendarCheck,
  UserPlus,
  Pill,
  AlertCircle,
  Heart,
  Activity,
  Thermometer,
  Scale,
  Clock,
  FileText,
  Stethoscope,
  Hospital,
  Ambulance,
  Shield,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  User,
  Users,
  Calendar,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Home,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Menu,
  X,
  Info,
  HelpCircle,
  Star,
  Bookmark
} from 'lucide-react';

// Healthcare-specific icon mapping
export const HealthcareIcons = {
  // Core Medical Actions
  appointments: CalendarCheck,
  patients: UserPlus,
  prescriptions: Pill,
  emergency: AlertCircle,
  vitals: Heart,
  activity: Activity,
  temperature: Thermometer,
  weight: Scale,
  pulse: Activity,
  stethoscope: Stethoscope,
  
  // Medical Facilities & Services
  hospital: Hospital,
  ambulance: Ambulance,
  
  // Health Monitoring
  trending_up: TrendingUp,
  trending_down: TrendingDown,
  stable: Minus,
  
  // Status Indicators
  normal: CheckCircle,
  critical: XCircle,
  warning: AlertTriangle,
  protected: Shield,
  
  // Time & Scheduling
  clock: Clock,
  calendar: Calendar,
  
  // Documentation
  records: FileText,
  
  // Communication
  phone: Phone,
  email: Mail,
  location: MapPin,
  
  // User Management
  user: User,
  users: Users,
  
  // System Actions
  settings: Settings,
  notifications: Bell,
  search: Search,
  filter: Filter,
  download: Download,
  upload: Upload,
  add: Plus,
  edit: Edit,
  delete: Trash2,
  view: Eye,
  hide: EyeOff,
  lock: Lock,
  unlock: Unlock,
  
  // Navigation
  home: Home,
  next: ChevronRight,
  previous: ChevronLeft,
  up: ChevronUp,
  down: ChevronDown,
  menu: Menu,
  close: X,
  
  // Information
  info: Info,
  help: HelpCircle,
  favorite: Star,
  bookmark: Bookmark
};

// Icon component with healthcare-specific sizing and styling
export const HealthIcon = ({ 
  name, 
  size = 20, 
  className = '', 
  variant = 'default',
  status = null,
  animate = false,
  ...props 
}) => {
  const IconComponent = HealthcareIcons[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in HealthcareIcons`);
    return <AlertCircle size={size} className={`text-red-500 ${className}`} {...props} />;
  }
  
  // Status-based styling
  const statusClasses = {
    normal: 'text-green-600',
    warning: 'text-yellow-600',
    critical: 'text-red-600',
    emergency: 'text-red-700',
    info: 'text-blue-600',
    neutral: 'text-gray-600'
  };
  
  // Variant-based styling
  const variantClasses = {
    default: 'text-current',
    primary: 'text-[#2A5C8D]',
    secondary: 'text-[#4CAF50]',
    emergency: 'text-[#E53E3E]',
    muted: 'text-gray-400',
    inverse: 'text-white'
  };
  
  // Animation classes
  const animationClasses = {
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    spin: 'animate-spin',
    heartbeat: 'animate-pulse',
    none: ''
  };
  
  const baseClasses = 'inline-block';
  const statusClass = status ? statusClasses[status] || '' : '';
  const variantClass = variantClasses[variant] || variantClasses.default;
  const animationClass = animate ? animationClasses[animate] || '' : '';
  
  const combinedClassName = [
    baseClasses,
    statusClass || variantClass,
    animationClass,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <IconComponent 
      size={size} 
      className={combinedClassName}
      {...props}
    />
  );
};

// Pre-configured medical icons with semantic meaning
export const MedicalIcon = {
  // Emergency & Critical
  Emergency: (props) => <HealthIcon name="emergency" variant="emergency" animate="pulse" {...props} />,
  Critical: (props) => <HealthIcon name="critical" status="critical" {...props} />,
  Warning: (props) => <HealthIcon name="warning" status="warning" {...props} />,
  
  // Vital Signs
  HeartRate: (props) => <HealthIcon name="pulse" status="normal" animate="heartbeat" {...props} />,
  Temperature: (props) => <HealthIcon name="temperature" status="info" {...props} />,
  Weight: (props) => <HealthIcon name="weight" status="info" {...props} />,
  
  // Status Indicators
  Normal: (props) => <HealthIcon name="normal" status="normal" {...props} />,
  Stable: (props) => <HealthIcon name="stable" status="normal" {...props} />,
  Improving: (props) => <HealthIcon name="trending_up" status="normal" {...props} />,
  Declining: (props) => <HealthIcon name="trending_down" status="warning" {...props} />,
  
  // Healthcare Services
  Appointment: (props) => <HealthIcon name="appointments" variant="primary" {...props} />,
  Patient: (props) => <HealthIcon name="patients" variant="primary" {...props} />,
  Prescription: (props) => <HealthIcon name="prescriptions" variant="secondary" {...props} />,
  Records: (props) => <HealthIcon name="records" variant="primary" {...props} />,
  
  // Medical Equipment
  Stethoscope: (props) => <HealthIcon name="stethoscope" variant="primary" {...props} />,
  
  // Facilities
  Hospital: (props) => <HealthIcon name="hospital" variant="primary" {...props} />,
  Ambulance: (props) => <HealthIcon name="ambulance" variant="emergency" {...props} />
};

// Icon size presets for consistency
export const iconSizes = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48
};

// Utility function to get icon with consistent sizing
export const getHealthIcon = (name, options = {}) => {
  const { size = 'md', ...rest } = options;
  const iconSize = iconSizes[size] || size;
  
  return <HealthIcon name={name} size={iconSize} {...rest} />;
};

export default HealthIcon; 