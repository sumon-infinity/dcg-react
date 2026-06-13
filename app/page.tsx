"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shield,
  QrCode,
  Phone,
  MapPin,
  Heart,
  AlertTriangle,
  Hospital,
  MessageCircle,
  ArrowLeft,
  Mail,
  User,
  HelpCircle,
  Map,
  PhoneCall,
  Settings,
  Loader2,
  Eye,
  EyeOff,
  ShieldAlert,
  Camera,
  Send,
  Lock,
} from "lucide-react"

type Screen =
  | "welcome"
  | "qr-scan"
  | "login"
  | "signup"
  | "forgot-password"
  | "forgot-password-sent"
  | "otp-verification"
  | "profile"
  | "personal-info"
  | "settings"
  | "emergency-alert"
  | "safe-zone"
  | "emergency-call"
  | "medical-alert"
  | "security-report"
  | "nearest-medical"
  | "health-condition"
  | "psychology-services"
  | "make-appointment"
  | "counseling-form"
  | "faq"

export default function DCGCrisisGuard() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome")
  const [otpCode, setOtpCode] = useState(["2", "6", "0", "4"])
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [incidentType, setIncidentType] = useState<string | null>(null)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [incidentLocation, setIncidentLocation] = useState("")
  const [incidentDescription, setIncidentDescription] = useState("")
  const [reportSubmitted, setReportSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    studentId: "",
    password: "",
    email: "",
    department: "",
    semester: "",
    emergencyContact: "",
    name: "",
    id: "",
    studentName: "",
    studentMail: "",
    batch: "",
    counselingName: "",
    counselingCriteria: "",
  })

  const handleScreenTransition = (screen: Screen) => {
    setIsLoading(true)
    setTimeout(() => {
      setCurrentScreen(screen)
      setIsLoading(false)
    }, 500)
  }

  const DCGLogo = () => (
    <div className="flex flex-col items-center mb-8 animate-fade-in">
      <div className="relative mb-4">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-lg flex items-center justify-center">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-4 bg-white rounded-full opacity-80" />
        </div>
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">DCG</h1>
      <p className="text-sm text-muted-foreground font-medium">Daffodil CrisisGuard</p>
    </div>
  )

  const BackButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      className="absolute top-6 left-6 p-3 rounded-full bg-card hover:bg-muted transition-all duration-200 shadow-md z-10"
    >
      <ArrowLeft className="w-5 h-5 text-foreground" />
    </button>
  )

  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )

  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return (
          <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />

            <div className="w-full max-w-sm relative z-10">
              <DCGLogo />
              <Card className="glass-effect border-0 shadow-xl animate-slide-up">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-3">Stay Alert, Stay Safe</h2>
                  <h3 className="text-lg font-semibold text-primary mb-4">Stay Safe with DIU Safety App!</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                    Instantly connect with students, alumni, teachers, and the proctor office. Quick alerts, easy
                    communication - Because your safety, our priority!
                  </p>
                  <Button
                    onClick={() => handleScreenTransition("qr-scan")}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "qr-scan":
        return (
          <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative">
            <BackButton onClick={() => handleScreenTransition("welcome")} />
            <DCGLogo />

            <Card className="w-full max-w-sm glass-effect border-0 shadow-xl animate-slide-up">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-muted to-card rounded-2xl p-12 mb-6 flex items-center justify-center shadow-inner">
                  <QrCode className="w-32 h-32 text-muted-foreground" />
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-white mb-4 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200">
                  Scan QR Code
                </Button>

                <p className="text-center text-muted-foreground text-sm mb-6 leading-relaxed">
                  Scan the QR code to easily find details about the app and quick setup.
                </p>

                <Button
                  onClick={() => handleScreenTransition("login")}
                  variant="outline"
                  className="w-full mb-4 py-3 rounded-xl font-semibold border-2 hover:bg-muted transition-all duration-200"
                >
                  Continue
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?
                  <button
                    onClick={() => handleScreenTransition("signup")}
                    className="text-primary ml-1 font-semibold hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </CardContent>
            </Card>
          </div>
        )

      case "login":
        return (
          <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative">
            <BackButton onClick={() => handleScreenTransition("qr-scan")} />
            <DCGLogo />

            <Card className="w-full max-w-sm glass-effect border-0 shadow-xl animate-slide-up">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-foreground">Welcome Back</CardTitle>
                <p className="text-muted-foreground">Sign in to your account</p>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="space-y-4">
                  <div>
                    <Input
                      placeholder="Student ID"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      className="bg-input border-0 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-input border-0 rounded-xl py-3 px-4 pr-12 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  onClick={() => handleScreenTransition("emergency-alert")}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white mt-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Sign In
                </Button>

                <div className="text-center mt-6 space-y-3">
                  <button
                    onClick={() => handleScreenTransition("forgot-password")}
                    className="text-primary text-sm font-semibold hover:underline"
                  >
                    Forgot Password?
                  </button>
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?
                    <button
                      onClick={() => handleScreenTransition("signup")}
                      className="text-primary ml-1 font-semibold hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "signup":
        return (
          <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative">
            <BackButton onClick={() => handleScreenTransition("login")} />
            <DCGLogo />

            <Card className="w-full max-w-sm glass-effect border-0 shadow-xl animate-slide-up">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-foreground">Create Account</CardTitle>
                <p className="text-muted-foreground">Join DIU Safety Network</p>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="space-y-4">
                  <Input
                    placeholder="Student ID"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    className="bg-input border-0 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                  <Input
                    placeholder="Department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="bg-input border-0 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                  <Input
                    placeholder="Semester"
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    className="bg-input border-0 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                  <Input
                    placeholder="Emergency Contact"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="bg-input border-0 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-input border-0 rounded-xl py-3 px-4 pr-12 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white mt-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Create Account
                </Button>

                <div className="text-center mt-6">
                  <button
                    onClick={() => handleScreenTransition("forgot-password")}
                    className="text-primary text-sm font-semibold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "forgot-password":
        return (
          <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative">
            <BackButton onClick={() => handleScreenTransition("login")} />
            <DCGLogo />

            <Card className="w-full max-w-sm glass-effect border-0 shadow-xl animate-slide-up">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-foreground">Reset Password</CardTitle>
                <p className="text-muted-foreground">Enter your email to receive reset instructions</p>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <Input
                  placeholder="Enter your email address"
                  type="email"
                  className="mb-6 bg-input border-0 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <Button
                  onClick={() => handleScreenTransition("forgot-password-sent")}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Send Reset Link
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case "forgot-password-sent":
        return (
          <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative">
            <BackButton onClick={() => handleScreenTransition("forgot-password")} />
            <DCGLogo />

            <Card className="w-full max-w-sm glass-effect border-0 shadow-xl animate-slide-up">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Mail className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Check Your Email</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  We've sent password recovery instructions to your email address. Please check your inbox and follow
                  the instructions.
                </p>
                <Button
                  onClick={() => handleScreenTransition("otp-verification")}
                  variant="outline"
                  className="w-full py-3 rounded-xl font-semibold border-2 hover:bg-muted transition-all duration-200"
                >
                  Continue to Verification
                </Button>
              </CardContent>
            </Card>
          </div>
        )

      case "otp-verification":
        return (
          <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative">
            <BackButton onClick={() => handleScreenTransition("forgot-password-sent")} />
            <DCGLogo />

            <Card className="w-full max-w-sm glass-effect border-0 shadow-xl animate-slide-up">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-foreground">Verify Code</CardTitle>
                <p className="text-muted-foreground">Enter the 4-digit code sent to your email</p>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="flex justify-center space-x-3 mb-8">
                  {otpCode.map((digit, index) => (
                    <div
                      key={index}
                      className="w-14 h-14 bg-input rounded-xl flex items-center justify-center text-xl font-bold text-foreground shadow-inner border-2 border-transparent focus-within:border-primary transition-all duration-200"
                    >
                      {digit}
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleScreenTransition("profile")}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white mb-4 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Verify Code
                </Button>

                <button className="w-full text-primary text-sm font-semibold hover:underline">Resend Code</button>
              </CardContent>
            </Card>
          </div>
        )

      case "profile":
        return (
          <div className="min-h-screen bg-background p-6">
            <DCGLogo />

            <Card className="w-full max-w-sm mx-auto glass-effect border-0 shadow-xl animate-slide-up">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <User className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Rupanzel</h2>
                  <p className="text-muted-foreground">Rupanzel@gmail.com</p>
                  <Badge className="mt-2 bg-primary/10 text-primary border-primary/20">Student</Badge>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleScreenTransition("personal-info")}
                    className="w-full flex items-center justify-between p-4 bg-card hover:bg-muted rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-primary" />
                      <span className="font-medium">Personal Profile</span>
                    </div>
                    <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-180" />
                  </button>

                  <button
                    onClick={() => handleScreenTransition("settings")}
                    className="w-full flex items-center justify-between p-4 bg-card hover:bg-muted rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center space-x-3">
                      <Settings className="w-5 h-5 text-primary" />
                      <span className="font-medium">Settings</span>
                    </div>
                    <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-180" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 bg-card hover:bg-muted rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <span className="font-medium">Emergency Contacts</span>
                    </div>
                    <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-180" />
                  </button>
                </div>

                <div className="mt-8">
                  <Button
                    onClick={() => handleScreenTransition("emergency-alert")}
                    className="w-full bg-gradient-to-r from-destructive to-red-600 hover:from-destructive/90 hover:to-red-600/90 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Emergency Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "personal-info":
        return (
          <div className="min-h-screen bg-white p-6 relative">
            <BackButton onClick={() => setCurrentScreen("profile")} />
            <DCGLogo />

            <div className="w-full max-w-sm mx-auto">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold">Rupanzel</h2>
                <p className="text-gray-600">Rupanzel@gmail.com</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Personal Information:</h3>
                <Input
                  placeholder="Student Name:"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                />
                <Input
                  placeholder="Student Id:"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                />
                <Input
                  placeholder="Student mail:"
                  value={formData.studentMail}
                  onChange={(e) => setFormData({ ...formData, studentMail: e.target.value })}
                />
                <Input
                  placeholder="Department:"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
                <Input
                  placeholder="Batch:"
                  value={formData.batch}
                  onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                />
              </div>
            </div>
          </div>
        )

      case "settings":
        return (
          <div className="min-h-screen bg-white p-6 relative">
            <BackButton onClick={() => setCurrentScreen("profile")} />
            <DCGLogo />

            <div className="w-full max-w-sm mx-auto">
              <h2 className="text-xl font-semibold mb-6">Settings:</h2>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span>Notification settings</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span>Privacy Settings</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span>Student mail:</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span>Emergency contact list</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span>Pre-set distress message</span>
                </div>
              </div>
            </div>
          </div>
        )

      case "emergency-alert":
        return (
          <div className="min-h-screen bg-gradient-to-br from-destructive/5 via-background to-red-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-destructive/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl animate-pulse-slow" />

            <DCGLogo />

            <Card className="w-full max-w-sm glass-effect border-0 shadow-xl animate-slide-up relative z-10">
              <CardContent className="p-8 text-center">
                <div className="mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-destructive to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl animate-pulse">
                    <AlertTriangle className="w-16 h-16 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-destructive mb-4">EMERGENCY ALERT</h2>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    Instantly send distress signals to nearby students, teachers, alumni, and authorities for immediate
                    assistance.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <Button className="w-full bg-gradient-to-r from-destructive to-red-600 hover:from-destructive/90 hover:to-red-600/90 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    SEND ALERT
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full py-3 rounded-xl font-semibold border-2 hover:bg-muted transition-all duration-200 bg-transparent"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Emergency Chat
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleScreenTransition("safe-zone")}
                    variant="outline"
                    className="flex flex-col items-center p-4 h-auto rounded-xl border-2 hover:bg-card transition-all duration-200 hover:shadow-md"
                  >
                    <MapPin className="w-6 h-6 mb-2 text-primary" />
                    <span className="text-sm font-semibold">Safe Zones</span>
                  </Button>
                  <Button
                    onClick={() => handleScreenTransition("emergency-call")}
                    variant="outline"
                    className="flex flex-col items-center p-4 h-auto rounded-xl border-2 hover:bg-card transition-all duration-200 hover:shadow-md"
                  >
                    <Phone className="w-6 h-6 mb-2 text-primary" />
                    <span className="text-sm font-semibold">Emergency Call</span>
                  </Button>
                  <Button
                    onClick={() => handleScreenTransition("medical-alert")}
                    variant="outline"
                    className="flex flex-col items-center p-4 h-auto rounded-xl border-2 hover:bg-card transition-all duration-200 hover:shadow-md"
                  >
                    <Hospital className="w-6 h-6 mb-2 text-primary" />
                    <span className="text-sm font-semibold">Medical Alert</span>
                  </Button>
                  <Button
                    onClick={() => handleScreenTransition("psychology-services")}
                    variant="outline"
                    className="flex flex-col items-center p-4 h-auto rounded-xl border-2 hover:bg-card transition-all duration-200 hover:shadow-md"
                  >
                    <Heart className="w-6 h-6 mb-2 text-primary" />
                    <span className="text-sm font-semibold">Psychology</span>
                  </Button>
                  <Button
                    onClick={() => handleScreenTransition("security-report")}
                    variant="outline"
                    className="col-span-2 flex items-center justify-center gap-2 p-4 h-auto rounded-xl border-2 hover:bg-card transition-all duration-200 hover:shadow-md"
                  >
                    <ShieldAlert className="w-6 h-6 text-primary" />
                    <span className="text-sm font-semibold">Report Security Incident</span>
                  </Button>
                </div>

                <div className="mt-8 flex justify-center space-x-4">
                  <Button
                    onClick={() => handleScreenTransition("faq")}
                    variant="ghost"
                    className="text-primary hover:bg-primary/10 rounded-xl"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    FAQ
                  </Button>
                  <Button
                    onClick={() => handleScreenTransition("profile")}
                    variant="ghost"
                    className="text-primary hover:bg-primary/10 rounded-xl"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "safe-zone":
        return (
          <div className="min-h-screen bg-white p-6 relative">
            <BackButton onClick={() => setCurrentScreen("emergency-alert")} />

            <div className="w-full max-w-sm mx-auto">
              <div className="bg-gray-200 rounded-lg h-64 mb-6 flex items-center justify-center relative">
                <Map className="w-32 h-32 text-gray-400" />
                <div className="absolute top-4 left-4">
                  <Button size="sm" className="bg-blue-600 text-white">
                    + LOCATE ME
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-4">Safe Zone</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-xs">Police</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Hospital className="w-6 h-6 text-red-600" />
                    </div>
                    <p className="text-xs">Hospital</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <User className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-xs">DIU Proctor Office</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "emergency-call":
        return (
          <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative">
            <BackButton onClick={() => setCurrentScreen("emergency-alert")} />
            <DCGLogo />

            <div className="w-full max-w-sm text-center">
              <div className="w-24 h-24 bg-red-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <PhoneCall className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-2xl font-bold mb-8">Emergency Call</h2>

              <div className="space-y-4 mb-8">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">Police</Button>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">DIU Proctor Office</Button>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3">Emergency Contacts</Button>
              </div>

              <p className="text-gray-600 text-sm">Connection to nearby students, teachers, alumni, and authorities</p>
            </div>
          </div>
        )

      case "security-report": {
        const incidentTypes = [
          { id: "harassment", label: "Harassment", icon: User },
          { id: "theft", label: "Theft", icon: Lock },
          { id: "suspicious", label: "Suspicious Activity", icon: Eye },
          { id: "vandalism", label: "Vandalism", icon: AlertTriangle },
          { id: "assault", label: "Assault", icon: ShieldAlert },
          { id: "other", label: "Other", icon: HelpCircle },
        ]

        const resetSecurityForm = () => {
          setIncidentType(null)
          setIsAnonymous(false)
          setIncidentLocation("")
          setIncidentDescription("")
          setReportSubmitted(false)
        }

        return (
          <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-6 relative overflow-hidden">
            <div className="absolute top-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
            <BackButton
              onClick={() => {
                resetSecurityForm()
                setCurrentScreen("emergency-alert")
              }}
            />

            <div className="w-full max-w-sm mx-auto pt-20 relative z-10">
              {reportSubmitted ? (
                <Card className="glass-effect border-0 shadow-xl animate-slide-up">
                  <CardContent className="p-8 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                      <Shield className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-foreground">Report Submitted</h2>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      Campus security has been notified and will review your report. Your reference ID is{" "}
                      <span className="font-semibold text-foreground">#SEC-{Math.floor(1000 + Math.random() * 9000)}</span>.
                    </p>
                    <Button
                      onClick={() => {
                        resetSecurityForm()
                        setCurrentScreen("emergency-alert")
                      }}
                      className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Back to Dashboard
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="flex flex-col items-center mb-6 animate-fade-in">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-lg flex items-center justify-center mb-3">
                      <ShieldAlert className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Report Incident</h2>
                    <p className="text-sm text-muted-foreground text-center mt-1 text-pretty">
                      Report a security concern to campus authorities
                    </p>
                  </div>

                  <Button className="w-full mb-6 bg-gradient-to-r from-destructive to-red-600 hover:from-destructive/90 hover:to-red-600/90 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                    <PhoneCall className="w-5 h-5 mr-2" />
                    Call Campus Security Now
                  </Button>

                  <Card className="glass-effect border-0 shadow-xl animate-slide-up">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <label className="text-sm font-semibold text-foreground mb-3 block">Incident Type</label>
                        <div className="grid grid-cols-2 gap-3">
                          {incidentTypes.map((type) => {
                            const Icon = type.icon
                            const selected = incidentType === type.id
                            return (
                              <button
                                key={type.id}
                                onClick={() => setIncidentType(type.id)}
                                className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                                  selected
                                    ? "border-primary bg-primary/10 shadow-md"
                                    : "border-border bg-card hover:bg-muted"
                                }`}
                              >
                                <Icon
                                  className={`w-5 h-5 ${selected ? "text-primary" : "text-muted-foreground"}`}
                                />
                                <span
                                  className={`text-xs font-medium text-center leading-tight ${
                                    selected ? "text-primary" : "text-foreground"
                                  }`}
                                >
                                  {type.label}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            value={incidentLocation}
                            onChange={(e) => setIncidentLocation(e.target.value)}
                            placeholder="e.g. Library, 2nd floor"
                            className="pl-9 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-foreground mb-2 block">Description</label>
                        <textarea
                          value={incidentDescription}
                          onChange={(e) => setIncidentDescription(e.target.value)}
                          placeholder="Describe what happened..."
                          rows={4}
                          className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>

                      <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:bg-muted transition-all duration-200">
                        <Camera className="w-5 h-5" />
                        <span className="text-sm font-medium">Add Photo Evidence</span>
                      </button>

                      <button
                        onClick={() => setIsAnonymous(!isAnonymous)}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-primary" />
                          <div className="text-left">
                            <p className="text-sm font-semibold text-foreground">Report Anonymously</p>
                            <p className="text-xs text-muted-foreground">Hide your identity</p>
                          </div>
                        </div>
                        <div
                          className={`w-11 h-6 rounded-full transition-all duration-200 flex items-center px-0.5 ${
                            isAnonymous ? "bg-primary justify-end" : "bg-border justify-start"
                          }`}
                        >
                          <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                        </div>
                      </button>
                    </CardContent>
                  </Card>

                  <Button
                    onClick={() => setReportSubmitted(true)}
                    disabled={!incidentType}
                    className="w-full mt-6 bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Submit Report
                  </Button>
                </>
              )}
            </div>
          </div>
        )
      }

      case "medical-alert":
        return (
          <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative">
            <BackButton onClick={() => setCurrentScreen("emergency-alert")} />

            <div className="w-full max-w-sm text-center">
              <h2 className="text-2xl font-bold mb-8">Medical Alert</h2>

              <div className="bg-red-50 rounded-lg p-8 mb-8">
                <Hospital className="w-24 h-24 text-red-600 mx-auto mb-4" />
                <div className="w-12 h-12 bg-red-600 rounded mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">+</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => setCurrentScreen("nearest-medical")}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                >
                  Nearest Medical Center
                </Button>
                <Button
                  onClick={() => setCurrentScreen("health-condition")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  Health Condition
                </Button>
              </div>
            </div>
          </div>
        )

      case "nearest-medical":
        return (
          <div className="min-h-screen bg-white p-6 relative">
            <BackButton onClick={() => setCurrentScreen("medical-alert")} />
            <DCGLogo />

            <div className="w-full max-w-sm mx-auto">
              <h2 className="text-xl font-semibold text-center mb-6">Nearest Medical Center</h2>

              <div className="bg-gray-200 rounded-lg h-64 mb-6 flex items-center justify-center relative">
                <Map className="w-32 h-32 text-gray-400" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">DIU Medical Center</h3>
                <p className="text-gray-600 text-sm mb-4">Show nearest Medical Center location</p>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Get Directions</Button>
              </div>
            </div>
          </div>
        )

      case "health-condition":
        return (
          <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative">
            <BackButton onClick={() => setCurrentScreen("medical-alert")} />
            <DCGLogo />

            <div className="w-full max-w-sm mx-auto">
              <div className="w-12 h-12 bg-red-600 rounded mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">+</span>
              </div>

              <h2 className="text-2xl font-bold mb-8">Health Condition</h2>

              <div className="space-y-4 mb-8">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">Primary Level</Button>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3">Medium Level</Button>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3">Serious Level</Button>
              </div>

              <p className="text-gray-600 text-sm">
                Click any option according to your health condition and found medical help
              </p>
            </div>
          </div>
        )

      case "psychology-services":
        return (
          <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative">
            <BackButton onClick={() => setCurrentScreen("emergency-alert")} />
            <DCGLogo />

            <div className="w-full max-w-sm text-center">
              <div className="bg-blue-600 text-white py-3 px-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold">DIU Psychology Services</h2>
              </div>

              <div className="bg-blue-50 rounded-lg p-8 mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-200 rounded-full mr-4 flex items-center justify-center">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-600" />
                  </div>
                </div>
                <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-gray-600" />
                </div>
              </div>

              <Button
                onClick={() => setCurrentScreen("make-appointment")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                Get Counseling
              </Button>
            </div>
          </div>
        )

      case "make-appointment":
        return (
          <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative">
            <BackButton onClick={() => setCurrentScreen("psychology-services")} />
            <DCGLogo />

            <div className="w-full max-w-sm text-center">
              <Button
                onClick={() => setCurrentScreen("counseling-form")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mb-8"
              >
                Make an Appointment
              </Button>

              <div className="bg-pink-50 rounded-lg p-6 mb-6">
                <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4" />
              </div>

              <div className="text-left space-y-4">
                <p className="text-gray-600 text-sm">
                  To make an appointment for the first time you must register with your details.
                </p>
                <Button
                  onClick={() => setCurrentScreen("counseling-form")}
                  variant="link"
                  className="text-blue-600 p-0"
                >
                  Click here for Register
                </Button>
                <p className="text-gray-600 text-sm">
                  Our psychologist will call you for confirming schedule of your appointment.
                </p>
              </div>

              <div className="mt-8">
                <Heart className="w-6 h-6 text-pink-500 mx-auto" />
              </div>
            </div>
          </div>
        )

      case "counseling-form":
        return (
          <div className="min-h-screen bg-white p-6 relative">
            <BackButton onClick={() => setCurrentScreen("make-appointment")} />

            <div className="w-full max-w-sm mx-auto">
              <h2 className="text-xl font-bold text-center mb-6">Psychological Counseling Registration Form</h2>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  All Information will be kept confidential. Only the relevant professionals will know this for the
                  benefit of the client.
                </p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">noor2405191019@diu.edu.bd Switch account</p>
                <Badge variant="secondary" className="text-xs">
                  Not shared
                </Badge>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Name: <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Your answer"
                    value={formData.counselingName}
                    onChange={(e) => setFormData({ ...formData, counselingName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select your Criteria: <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.counselingCriteria}
                    onChange={(e) => setFormData({ ...formData, counselingCriteria: e.target.value })}
                  >
                    <option value="">Choose</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-6">* Indicates required question</p>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-8">Submit</Button>
            </div>
          </div>
        )

      case "faq":
        return (
          <div className="min-h-screen bg-white p-6 relative">
            <BackButton onClick={() => setCurrentScreen("emergency-alert")} />
            <DCGLogo />

            <div className="w-full max-w-sm mx-auto">
              <h2 className="text-4xl font-light text-gray-300 text-center mb-8">FAQ</h2>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">What is DCG?</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">How do i send an emergency alert</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">Who will be contacted when I use the app</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">Does the app share my location?</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">How can I find nearby police station and hospital</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">How do I registered for psychological support?</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Still need help</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Contact Us</Button>
              </div>
            </div>
          </div>
        )

      default:
        return <div>Screen not found</div>
    }
  }

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen relative">
      {isLoading && <LoadingOverlay />}
      {renderScreen()}
    </div>
  )
}
