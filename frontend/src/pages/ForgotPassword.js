import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, KeyRound } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpToken, setOtpToken] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && step === 2) {
      setCanResend(true);
    }
  }, [timeLeft, step]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      if (response.data.success) {
        setOtpToken(response.data.token);
        setStep(2);
        setTimeLeft(120); // 2 minutes
        setCanResend(false);
        toast.success('OTP sent to your email address');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error('Please enter the OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/verify-otp', {
        email,
        otp,
        token: otpToken
      });
      if (response.data.success) {
        setStep(3);
        toast.success('OTP verified successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      toast.error('Please enter a new password');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/reset-password', {
        email,
        otp,
        token: otpToken,
        newPassword
      });
      if (response.data.success) {
        toast.success('Password reset successfully');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      if (response.data.success) {
        setOtpToken(response.data.token);
        setTimeLeft(120);
        setCanResend(false);
        toast.success('New OTP sent to your email');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-purple-100 rounded-full">
              <KeyRound className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-slate-900 tracking-wide">Reset Password</h2>
            <p className="text-slate-500">
              {step === 1 && 'Enter your email to receive OTP'}
              {step === 2 && 'Enter the OTP sent to your email'}
              {step === 3 && 'Set your new password'}
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all ${
                step >= 1 ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <span className="text-xs text-slate-500 mt-1">Email</span>
            </div>
            <div className={`h-1 w-12 transition-all ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all ${
                step >= 2 ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <span className="text-xs text-slate-500 mt-1">OTP</span>
            </div>
            <div className={`h-1 w-12 transition-all ${step >= 3 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all ${
                step >= 3 ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
              <span className="text-xs text-slate-500 mt-1">Reset</span>
            </div>
          </div>
          
          <CardContent className="p-0">
            {step === 1 && (
              <form className="space-y-4" onSubmit={handleSendOTP}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 enhanced-input"
                      placeholder="Enter your registered email"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg shadow-purple-600/35 hover:shadow-xl hover:shadow-purple-600/45 hover:-translate-y-0.5 transition-all duration-200"
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </Button>
              </form>
            )}

            {step === 2 && (
              <form className="space-y-4" onSubmit={handleVerifyOTP}>
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="enhanced-input text-center text-lg tracking-widest"
                    placeholder="000000"
                    maxLength="6"
                    required
                  />
                  <p className="text-xs text-slate-500 text-center">
                    OTP sent to <span className="font-medium text-slate-700">{email}</span>
                  </p>
                  {timeLeft > 0 && (
                    <p className="text-xs text-purple-600 text-center font-medium">
                      Time remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </p>
                  )}
                  {canResend && (
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={isLoading}
                        className="text-sm enhanced-link"
                      >
                        Resend OTP
                      </button>
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || timeLeft === 0}
                  className="w-full bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg shadow-purple-600/35 hover:shadow-xl hover:shadow-purple-600/45 hover:-translate-y-0.5 transition-all duration-200"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </Button>
              </form>
            )}

            {step === 3 && (
              <form className="space-y-4" onSubmit={handleResetPassword}>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
                    <Input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10 pr-10 enhanced-input"
                      placeholder="Enter new password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-600" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10 enhanced-input"
                      placeholder="Confirm new password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-600" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg shadow-purple-600/35 hover:shadow-xl hover:shadow-purple-600/45 hover:-translate-y-0.5 transition-all duration-200"
                >
                  {isLoading ? 'Resetting Password...' : 'Reset Password'}
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              <Link 
                to="/login" 
                className="text-sm enhanced-link"
              >
                ← Back to Login
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;