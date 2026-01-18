import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Globe, Cpu, Activity } from 'lucide-react';
import useAuthStore from '../store/authStore';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiClient.post('/auth/login', formData);
      if (response.data.success) {
        setAuth(response.data.token, response.data.user);
        toast.success('Login successful!');
        navigate('/dashboard-main');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      
      <Card className="w-full max-w-4xl overflow-hidden bg-zinc-900 border-zinc-800 shadow-2xl shadow-black/50">
        <div className="flex flex-col md:flex-row">
          
          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 relative">
            <div className="flex justify-start mb-8">
               <h2 className="text-2xl font-bold tracking-tighter text-white">Career Synapse</h2>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-white tracking-tight">Welcome Back</h2>
              <p className="text-zinc-400">Enter your credentials to access your intelligence roadmap.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                {/* Username Label - White/Light Zinc */}
                <Label htmlFor="username" className="text-zinc-300">Username or Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="pl-10 bg-black border-zinc-700 text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:ring-cyan-500/20"
                    placeholder="Enter username or email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                {/* Password Label - White/Light Zinc (Fixed typo here) */}
                <Label htmlFor="password" className="text-zinc-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  {/* Password Input - Text is White */}
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 bg-black border-zinc-700 text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:ring-cyan-500/20"
                    placeholder="Enter your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-zinc-500 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-cyan-500 hover:text-cyan-400 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black hover:bg-zinc-200 font-bold py-5 transition-all"
              >
                {isLoading ? 'Authenticating...' : 'Sign In'}
              </Button>
            </form>

            <div className="relative mt-8">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900 px-2 text-zinc-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button
                variant="outline"
                className="bg-black border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                onClick={() => {
                  window.location.href = 'http://localhost:5000/api/auth/google';
                }}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>

              <Button
                variant="outline"
                className="bg-black border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                onClick={() => {
                  window.location.href = 'http://localhost:5000/api/auth/github';
                }}
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </Button>
            </div>

            <div className="text-center text-sm mt-8">
              <span className="text-zinc-500">Don't have an account? </span>
              <Link 
                to="/signup" 
                className="text-white hover:text-cyan-400 font-medium transition-colors"
              >
                Create one
              </Link>
            </div>
          </div>

          {/* Right Side - Info Panel (Dark Theme) */}
          <div className="hidden md:flex w-1/2 bg-zinc-950 p-12 flex-col justify-center border-l border-zinc-800 relative overflow-hidden">
            {/* Ambient Background Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-900/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl -ml-16 -mb-16"></div>
            
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-6 text-white tracking-tight">
                Skill Intelligence <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                  Realized.
                </span>
              </h1>
              <p className="text-lg mb-8 text-zinc-400 leading-relaxed">
                Map your academic journey to real-world career paths with our intelligent tracking system.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                    <Globe className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Global Mapping</h3>
                    <p className="text-sm text-zinc-500">Connect with career paths worldwide.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                    <Cpu className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">AI-Driven Insights</h3>
                    <p className="text-sm text-zinc-500">Personalized recommendations for your growth.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                    <Activity className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Live Tracking</h3>
                    <p className="text-sm text-zinc-500">Monitor your skill evolution in real-time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;