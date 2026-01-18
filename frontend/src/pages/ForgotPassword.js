import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, KeyRound, ArrowLeft } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      {/* Card with Dark Theme */}
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 shadow-2xl shadow-black/50">
        <div className="p-8">
          
          {/* Header Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-black rounded-full border border-zinc-800 shadow-lg shadow-cyan-900/20">
              <KeyRound className="h-8 w-8 text-cyan-400" />
            </div>
          </div>
          
          {/* Title Area */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-white tracking-wide">Reset Password</h2>
            <p className="text-zinc-400 text-sm">
              {step === 1 && 'Enter your email to receive a verification code'}
              {step === 2 && 'Enter the 6-digit code sent to your email'}
              {step === 3 && 'Secure your account with a new password'}
            </p>
          </div>

          {/* Dark Mode Progress Indicator */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all border ${
                step >= 1 ? 'bg-cyan-600 border-cyan-500 text-white shadow-[0_0_10px_rgba(8,145,178,0.5)]' : 'bg-zinc-800 border-zinc-700 text-zinc-500'
              }`}>
                1
              </div>
            </div>
            
            {/* Line 1 */}
            <div className={`h-0.5 w-10 transition-all ${step >= 2 ? 'bg-cyan-600' : 'bg-zinc-800'}`}></div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all border ${
                step >= 2 ? 'bg-cyan-600 border-cyan-500 text-white shadow-[0_0_10px_rgba(8,145,178,0.5)]' : 'bg-zinc-800 border-zinc-700 text-zinc-500'
              }`}>
                2
              </div>
            </div>
            
            {/* Line 2 */}
            <div className={`h-0.5 w-10 transition-all ${step >= 3 ? 'bg-cyan-600' : 'bg-zinc-800'}`}></div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all border ${
                step >= 3 ? 'bg-cyan-600 border-cyan-500 text-white shadow-[0_0_10px_rgba(8,145,178,0.5)]' : 'bg-zinc-800 border-zinc-700 text-zinc-500'
              }`}>
                3
              </div>
            </div>
          </div>
          
          <CardContent className="p-0">
            {/* STEP 1: EMAIL */}
            {step === 1 && (
              <form className="space-y-5" onSubmit={handleSendOTP}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-black border-zinc-700 text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:ring-cyan-500/20"
                      placeholder="Enter your registered email"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-black hover:bg-zinc-200 font-bold py-5 transition-all"
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </Button>
              </form>
            )}

            {/* STEP 2: OTP */}
            {step === 2 && (
              <form className="space-y-5" onSubmit={handleVerifyOTP}>
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-zinc-300">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-black border-zinc-700 text-white text-center text-xl tracking-[0.5em] placeholder:text-zinc-700 focus:border-cyan-500 focus:ring-cyan-500/20"
                    placeholder="000000"
                    maxLength="6"
                    required
                  />
                  <p className="text-xs text-zinc-500 text-center mt-2">
                    Code sent to <span className="text-cyan-400">{email}</span>
                  </p>
                  
                  {timeLeft > 0 && (
                    <p className="text-xs text-zinc-400 text-center font-medium">
                      Expires in: <span className="text-white">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                    </p>
                  )}
                  
                  {canResend && (
                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={isLoading}
                        className="text-sm text-cyan-500 hover:text-cyan-400 underline underline-offset-4 transition-colors"
                      >
                        Resend OTP
                      </button>
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || timeLeft === 0}
                  className="w-full bg-white text-black hover:bg-zinc-200 font-bold py-5 transition-all"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </Button>
              </form>
            )}

            {/* STEP 3: NEW PASSWORD */}
            {step === 3 && (
              <form className="space-y-5" onSubmit={handleResetPassword}>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" classname="text-zinc-300">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                    <Input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10 pr-10 bg-black border-zinc-700 text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:ring-cyan-500/20"
                      placeholder="Enter new password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-zinc-500 hover:text-white"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" classname="text-zinc-300">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10 bg-black border-zinc-700 text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:ring-cyan-500/20"
                      placeholder="Confirm new password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-zinc-500 hover:text-white"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-black hover:bg-zinc-200 font-bold py-5 transition-all"
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </form>
            )}

            <div className="mt-8 text-center">
              <Link 
                to="/login" 
                className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center justify-center gap-2 group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;