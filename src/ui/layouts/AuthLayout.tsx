import { Outlet, useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AuthSidebar from '../components/AuthSidebar';

const AuthLayout = () => {
  const location = useLocation();

  const getSubtitle = () => {
    switch (location.pathname) {
      case '/signup':
        return 'Unlock your potential with premium Year 5 – A-Level tutoring and digital skills.';
      case '/signin':
        return 'Access your personalized learning path and reach your next academic milestone.';
      default:
        return 'Academic excellence meets digital innovation. Your journey starts here.';
    }
  };

  const subtitle = getSubtitle();

  return (
    <div className="min-h-screen w-full bg-white overflow-y-auto  grid grid-cols-1 lg:grid-cols-12">

    {/* Right Column: Main Form Container */}
      <div className="flex flex-col bg-white lg:col-span-6">
        {/* Top Header - Always visible at the top of the right column */}
        <header className="p-8 md:p-12 lg:p-16 flex justify-between items-center">
          <Link to="/" className="shrink-0">
            <img
              src="/logo.png"
              alt="Meave Training"
              className="h-16 md:h-28 w-auto object-contain -ml-7"
            />
          </Link>

          <Link
            to="https://meave-training-website.vercel.app"
            className="text-slate-400 hover:text-slate-900 flex items-center gap-2 font-bold transition-colors text-sm"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Back to Website</span>
          </Link>
        </header>

        {/* Form Content - Flows naturally with the page height */}
        <main className="flex-1 px-8 md:px-16 pb-10">
          <Outlet />
        </main>

      </div>

      {/* Left Column: Cinematic Branding Section */}
      <div className="hidden lg:block w-full p-4 md:p-6 shrink-0 lg:col-span-6">
        <div className="relative w-full h-full min-h-[400px] lg:min-h-screen rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden bg-primary-900 shadow-2xl">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <img
              src="/auth-bg.png"
              alt="Background"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-950/20 to-transparent" />
          </div>

          {/* Left Content Overlay */}
          <div className="relative z-10 w-full h-full flex flex-col justify-end p-8 md:p-12">
            <div className="w-full">
              <AuthSidebar subtitle={subtitle} />
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default AuthLayout;
