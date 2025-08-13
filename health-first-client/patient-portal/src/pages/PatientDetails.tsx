import React, { useState } from 'react';
import { Button } from 'lightswind/dist/components/ui/button.js';
import { Input } from 'lightswind/dist/components/ui/input.js';
import { Badge } from 'lightswind/dist/components/ui/badge.js';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from 'lightswind/dist/components/ui/table.js';
import { CountUp } from 'lightswind/dist/components/ui/count-up.js';
import ScrollReveal from 'lightswind/dist/components/ui/scroll-reveal.js';
import { ShinyText } from 'lightswind/dist/components/ui/shiny-text.js';
import { BorderBeam } from 'lightswind/dist/components/ui/border-beam.js';
import { AnimatedBlobBackground } from 'lightswind/dist/components/ui/animated-blob-background.js';
import { AuroraBackground } from 'lightswind/dist/components/ui/aurora-background.js';
import {
  User,
  Heart,
  Activity,
  FileText,
  Download,
  Share,
  Calendar,
  Pill,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Edit,
  Eye,
  Filter,
  Search,
  BarChart3,
  Zap,
  Star,
  Shield
} from 'lucide-react';

export default function PatientDetails() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const patientInfo = {
    name: 'Jane Elizabeth Doe',
    id: 'P-102938',
    age: 34,
    bloodType: 'A+',
    phone: '(555) 123-4567',
    email: 'jane.doe@email.com',
    address: '123 Health St, Medical City, MC 12345',
    emergencyContact: 'John Doe - (555) 987-6543',
    insuranceProvider: 'HealthGuard Premium',
    status: 'Active',
    memberSince: 'January 2022'
  };

  const vitalSigns = [
    { 
      label: 'Heart Rate', 
      value: 72, 
      unit: 'bpm', 
      status: 'normal',
      trend: 'stable',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    { 
      label: 'Blood Pressure', 
      value: '118/76', 
      unit: 'mmHg', 
      status: 'normal',
      trend: 'down',
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    { 
      label: 'Oxygen Saturation', 
      value: 99, 
      unit: '%', 
      status: 'excellent',
      trend: 'stable',
      icon: Activity,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    { 
      label: 'Temperature', 
      value: 98.6, 
      unit: '°F', 
      status: 'normal',
      trend: 'stable',
      icon: Activity,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
  ];

  const labResults = [
    { 
      name: 'Hemoglobin', 
      value: '13.8', 
      unit: 'g/dL', 
      status: 'Normal',
      reference: '12.0-15.5',
      date: '2024-12-15',
      trend: 'stable'
    },
    { 
      name: 'White Blood Cells', 
      value: '6.2', 
      unit: '×10³/μL', 
      status: 'Normal',
      reference: '4.5-11.0',
      date: '2024-12-15',
      trend: 'up'
    },
    { 
      name: 'Glucose (Fasting)', 
      value: '112', 
      unit: 'mg/dL', 
      status: 'High',
      reference: '70-100',
      date: '2024-12-15',
      trend: 'up'
    },
    { 
      name: 'Cholesterol Total', 
      value: '185', 
      unit: 'mg/dL', 
      status: 'Normal',
      reference: '<200',
      date: '2024-12-15',
      trend: 'down'
    },
    { 
      name: 'HDL Cholesterol', 
      value: '58', 
      unit: 'mg/dL', 
      status: 'Good',
      reference: '>40',
      date: '2024-12-15',
      trend: 'stable'
    },
  ];

  const medications = [
    {
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Smith',
      startDate: '2024-06-15',
      status: 'Active'
    },
    {
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      prescribedBy: 'Dr. Johnson',
      startDate: '2024-08-20',
      status: 'Active'
    },
    {
      name: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Smith',
      startDate: '2024-09-10',
      status: 'Active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'normal':
      case 'good':
      case 'excellent':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'high':
      case 'low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-red-500" />;
      case 'down':
        return <TrendingDown className="w-3 h-3 text-green-500" />;
      default:
        return <span className="w-3 h-3 rounded-full bg-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <AuroraBackground className="absolute inset-0" showRadialGradient>
        <AnimatedBlobBackground
          className="absolute inset-0"
          firstBlobColors={["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#8B5CF6"]}
          secondBlobColors={["#F3E8FF", "#E0F7FA", "#ECFDF5", "#FEF3C7", "#F3E8FF"]}
          firstBlobOpacity={0.06}
          secondBlobOpacity={0.03}
          blurAmount="4vw"
          firstBlobSpeed={25000}
          secondBlobSpeed={30000}
          interactive
          interactiveIntensity={1.5}
        />
      </AuroraBackground>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Patient Header */}
        <div className="mb-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-green-500/20 rounded-3xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-700" />
            <BorderBeam size={120} duration={12} delay={8} />
            
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-8">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 border-2 border-purple-200 flex items-center justify-center">
                      <User className="w-12 h-12 text-purple-600" />
                    </div>
                    <Badge className="absolute -bottom-2 -right-2 bg-green-500 text-white border-white border-2">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  
                  <div className="flex-1">
                    <ScrollReveal size="xl" align="left">
                      <ShinyText
                        size="3xl"
                        weight="bold"
                        baseColor="#0F172A"
                        shineColor="#8B5CF6"
                        speed={2.5}
                        direction="left-to-right"
                        shineWidth={20}
                      >
                        {patientInfo.name}
                      </ShinyText>
                    </ScrollReveal>
                    
                    <div className="flex items-center gap-4 mt-3 mb-4">
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                        <Shield className="w-4 h-4 mr-1" />
                        Patient ID: {patientInfo.id}
                      </Badge>
                      <Badge variant="outline" className="border-blue-200 text-blue-700">
                        <Star className="w-4 h-4 mr-1" />
                        Member since {patientInfo.memberSince}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4" />
                        Age: {patientInfo.age} | Blood Type: {patientInfo.bloodType}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        {patientInfo.phone}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        {patientInfo.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {patientInfo.address}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Shield className="w-4 h-4" />
                        {patientInfo.insuranceProvider}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vital Signs */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            Current Vital Signs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vitalSigns.map((vital, index) => (
              <div key={vital.label} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur opacity-60 group-hover:opacity-80 transition-all duration-300" />
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 p-6 shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`inline-flex p-2 rounded-xl ${vital.bgColor}`}>
                      <vital.icon className={`w-5 h-5 ${vital.color}`} />
                    </div>
                    {getTrendIcon(vital.trend)}
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">
                    {typeof vital.value === 'number' ? (
                      <CountUp value={vital.value} duration={1.5} suffix={` ${vital.unit}`} animationStyle="gentle" />
                    ) : (
                      `${vital.value} ${vital.unit}`
                    )}
                  </div>
                  <div className="text-gray-600 font-medium mb-2">{vital.label}</div>
                  <Badge className={getStatusColor(vital.status)}>
                    {vital.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lab Results */}
          <div className="lg:col-span-2">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-3xl blur opacity-60 group-hover:opacity-80 transition-all duration-500" />
              <BorderBeam size={100} duration={8} delay={3} />
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                    Latest Lab Results
                  </h2>
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Eye className="w-4 h-4 mr-2" />
                      View History
                    </Button>
                  </div>
                </div>
                
                <div className="mb-4 flex items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      placeholder="Search lab results..." 
                      className="pl-10 h-9 bg-gray-50 border-gray-200"
                    />
                  </div>
                  <Button size="sm" variant="outline" className="border-gray-300">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50">
                        <TableHead className="font-semibold">Test</TableHead>
                        <TableHead className="font-semibold">Result</TableHead>
                        <TableHead className="font-semibold">Reference Range</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Trend</TableHead>
                        <TableHead className="font-semibold">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {labResults.map((result, index) => (
                        <TableRow key={result.name} className="transition-colors hover:bg-gray-50/50">
                          <TableCell className="font-medium">{result.name}</TableCell>
                          <TableCell>
                            <span className="text-lg font-semibold">{result.value}</span>
                            <span className="ml-1 text-gray-500 text-sm">{result.unit}</span>
                          </TableCell>
                          <TableCell className="text-gray-600 text-sm">{result.reference}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(result.status)}>
                              {result.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            {getTrendIcon(result.trend)}
                          </TableCell>
                          <TableCell className="text-gray-600 text-sm">{result.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>

          {/* Current Medications & Quick Actions */}
          <div className="space-y-6">
            {/* Current Medications */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 to-purple-500/20 rounded-3xl blur opacity-60 group-hover:opacity-80 transition-all duration-500" />
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Pill className="w-5 h-5 text-green-600" />
                  Current Medications
                </h3>
                <div className="space-y-3">
                  {medications.map((med, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-green-50/30 rounded-xl border border-gray-100">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{med.name}</h4>
                        <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                          {med.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><strong>Dosage:</strong> {med.dosage}</p>
                        <p><strong>Frequency:</strong> {med.frequency}</p>
                        <p><strong>Prescribed by:</strong> {med.prescribedBy}</p>
                        <p><strong>Start Date:</strong> {med.startDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 border-green-200 text-green-700 hover:bg-green-50">
                  View All Medications
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-3xl blur opacity-60 group-hover:opacity-80 transition-all duration-500" />
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    <Calendar className="w-4 h-4 mr-3" />
                    Schedule Follow-up
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 border-purple-200 text-purple-700 hover:bg-purple-50">
                    <FileText className="w-4 h-4 mr-3" />
                    Request Records
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 border-green-200 text-green-700 hover:bg-green-50">
                    <Phone className="w-4 h-4 mr-3" />
                    Contact Provider
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 border-orange-200 text-orange-700 hover:bg-orange-50">
                    <Download className="w-4 h-4 mr-3" />
                    Download Summary
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 