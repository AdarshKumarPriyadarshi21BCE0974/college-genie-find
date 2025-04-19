
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const Team = () => {
  const teamMembers = [
    {
      name: "Adarsh Kumar Priyadarshi",
      role: "ML Developer & Co-founder",
      image: `${window.location.origin}/lovable-uploads/f5ec312c-7f14-40b0-9977-557c2f236cac.png`,
      description: "Adarsh specializes in machine learning algorithms and data analysis, developing the recommendation engine that powers College Genie.",
      links: {
        linkedin: "#",
        github: "#",
        twitter: "#",
      },
    },
    {
      name: "Taniya Khemchandani",
      role: "Frontend Developer & Co-founder",
      image: `${window.location.origin}/lovable-uploads/d4a9ae9b-4c1a-405d-9903-7e47c8d00d18.png`,
      description: "Taniya leads frontend development and user experience, creating the intuitive interface that makes College Genie easy to use.",
      links: {
        linkedin: "#",
        github: "#",
        twitter: "#",
      },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-orange-500 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Our Team</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Meet the dedicated individuals behind College Genie.
              </p>
            </div>
          </div>
        </div>

        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
              {teamMembers.map((member, index) => (
                <div key={index} className="space-y-5 sm:space-y-4">
                  <div className="aspect-w-1 aspect-h-1 mx-auto" style={{ maxWidth: "250px" }}>
                    <img className="object-cover shadow-lg rounded-full h-56 w-56 mx-auto" src={member.image} alt={member.name} />
                  </div>
                  <div className="space-y-2 text-center">
                    <div className="text-2xl leading-8 font-bold tracking-tight">{member.name}</div>
                    <div className="text-lg leading-7 font-medium text-orange-500">{member.role}</div>
                    <p className="text-gray-600">{member.description}</p>
                  </div>
                  <div className="flex justify-center space-x-5">
                    <a href={member.links.linkedin} className="text-gray-500 hover:text-gray-600">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href={member.links.github} className="text-gray-500 hover:text-gray-600">
                      <span className="sr-only">GitHub</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href={member.links.twitter} className="text-gray-500 hover:text-gray-600">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Team;
