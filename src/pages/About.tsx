
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-orange-500 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">About College Genie</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Helping students find their perfect academic match through data-driven recommendations.
              </p>
            </div>
          </div>
        </div>

        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-orange-500 font-semibold tracking-wide uppercase">Our Mission</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Making University Selection Easier
              </p>
            </div>

            <div className="mt-10">
              <div className="prose prose-lg max-w-none">
                <p>
                  College Genie is a cutting-edge university recommendation platform designed to help students find 
                  the perfect universities for their Master's degree studies abroad. Using advanced machine learning 
                  algorithms, we analyze your academic profile, test scores, and preferences to suggest universities 
                  where you have the best chance of admission and academic success.
                </p>
                
                <p className="mt-4">
                  Choosing the right university is one of the most important decisions in a student's academic journey. 
                  With thousands of universities and programs worldwide, finding the perfect match can be overwhelming. 
                  College Genie simplifies this process by providing personalized recommendations based on your 
                  unique profile and aspirations.
                </p>

                <p className="mt-4">
                  Our recommendation system analyzes historical admission data, university requirements, and program 
                  specifications to identify universities where your profile aligns with successful applicants. 
                  We consider not just admission probability, but also academic fit, career outcomes, and your preferences 
                  to ensure holistic recommendations.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How It Works</h3>

                <ol className="list-decimal pl-5 space-y-2">
                  <li>Enter your academic profile, including GPA, test scores, and previous education details.</li>
                  <li>Specify your preferences for countries, programs, and other important factors.</li>
                  <li>Our ML algorithms analyze your data and compare it with our extensive database.</li>
                  <li>Receive personalized university recommendations with admission probability insights.</li>
                  <li>Explore detailed information about each recommended university and program.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
