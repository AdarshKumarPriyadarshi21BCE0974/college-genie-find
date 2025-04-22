
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FormData, University, countries } from '../types';
import CountrySelector from '../components/college-finder/CountrySelector';
import MajorSelector from '../components/college-finder/MajorSelector';
import ProgressSteps from '../components/college-finder/ProgressSteps';
import LoadingAnimation from '../components/college-finder/LoadingAnimation';
import { toast } from '../hooks/use-toast';
import { coursesData } from '@/constants/courses';
import { fetchUniversityRecommendations } from '@/utils/api';
import type { UniversityRequestPayload, UniversityResponse } from '@/types/api';

const initialFormData: Partial<FormData> = {
  degree: undefined,
  country: '',
  major: '',
  intendedCourseTaxonomyId: '',
  undergradCollege: '',
  undergradMajor: '',
  undergradMajorTaxonomyId: '',
  score: 0,
  scoreType: '10 CGPA',
  backlogs: 0,
  englishTest: null,
  englishScore: 0,
  aptitudeTest: 'None',
  workExperience: 0,
  researchPapers: 'None',
  projects: 0
};

const CollegeFinder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<Partial<FormData>>({...initialFormData});
  const [universities, setUniversities] = useState<University[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const scoreTypeDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  useEffect(() => {
    setFormData({...initialFormData});
    setCurrentStep(1);
    setShowResults(false);
    setFormErrors({});
  }, [location.key]);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (scoreTypeDropdownRef.current && !scoreTypeDropdownRef.current.contains(event.target as Node)) {
        const dropdown = document.getElementById('scoreTypeDropdown');
        if (dropdown) {
          dropdown.classList.add('hidden');
        }
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (field: keyof FormData, value: any) => {
    if (field === 'englishTest' && formData.englishTest !== value) {
      setFormData(prev => ({ 
        ...prev, 
        [field]: value,
        englishScore: 0
      }));
      return;
    }
    
    if (field === 'englishScore') {
      if (value < 0) {
        setFormErrors({...formErrors, englishScore: 'Enter valid score'});
        return;
      } else {
        const { englishScore, ...rest } = formErrors;
        setFormErrors(rest);
      }

      const maxScore = 
        formData.englishTest === 'TOEFL' ? 120 : 
        formData.englishTest === 'IELTS' ? 9 : 
        formData.englishTest === 'PTE' ? 90 : 100;
      
      if (value > maxScore) {
        value = maxScore;
      }
    }
    
    if (field === 'workExperience') {
      if (value < 0) {
        setFormErrors({...formErrors, workExperience: 'Please enter valid work experience'});
        return;
      } else {
        const { workExperience, ...rest } = formErrors;
        setFormErrors(rest);
      }
    }
    
    if (field === 'projects') {
      if (value < 0) {
        setFormErrors({...formErrors, projects: 'Please enter valid number of projects'});
        return;
      } else {
        const { projects, ...rest } = formErrors;
        setFormErrors(rest);
      }
    }
    
    if (field === 'score') {
      if (value < 0) {
        setFormErrors({...formErrors, score: 'Enter valid score'});
        return;
      } else {
        const { score, ...rest } = formErrors;
        setFormErrors(rest);
      }
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsLoading(true);
      
      try {
        const countryMapping: Record<string, string> = {
          'United States': 'united_states',
          'Canada': 'canada',
          'United Kingdom': 'united_kingdom',
          'Australia & New Zealand': 'australia_new_zealand',
          'European Union': 'european_union',
          'Singapore': 'singapore',
          'Hong Kong': 'hong_kong',
          'Netherlands': 'netherlands',
          'Germany': 'germany',
          'Switzerland': 'switzerland',
          'Ireland': 'ireland',
          'Japan': 'japan'
        };

        const mappedCountry = countryMapping[formData.country || ''] || formData.country?.toLowerCase().replace(/\s+/g, '_') || '';
        
        // Calculate GRE overall score if GRE test is selected
        let greOverall = undefined;
        if (formData.aptitudeTest === 'GRE' && formData.greVerbal && formData.greQuants) {
          greOverall = formData.greVerbal + formData.greQuants;
        }

        const payload: UniversityRequestPayload = {
          country: mappedCountry,
          intended_course_taxonomy_id: parseInt(formData.intendedCourseTaxonomyId || '0'),
          grade: formData.score?.toString() || '0',
          grade_scale: formData.scoreType?.split(' ')[0] || '10', // Extract just the number part
          college: 6, // Default value
          major: formData.undergradMajorTaxonomyId || "24252", // Use the taxonomy ID from undergradMajor if available
          backlogs: formData.backlogs || 0,
          is_stem: true, // Default to true for CS, Data Science etc.
          SOP: 3, // Default values as per requirements
          LOR: 3,
          Resume: 3,
          ielts_overall: formData.englishTest === 'IELTS' ? (formData.englishScore || 0) : 9, // Default to 9 if not IELTS
          gre_quants: formData.aptitudeTest === 'GRE' ? formData.greQuants : undefined,
          gre_verbal: formData.aptitudeTest === 'GRE' ? formData.greVerbal : undefined,
          gre_awa: formData.aptitudeTest === 'GRE' ? formData.greAwa : undefined,
          gre_overall: greOverall,
          work_experience_in_months: formData.workExperience,
          no_of_projects: formData.projects
        };

        console.log("Sending payload to API:", payload);
        const result = await fetchUniversityRecommendations(payload);
        console.log("Received API response:", result);
        
        // Transform the API response into our University format
        const allUniversities: University[] = [];
        
        // Process ambitious universities
        if (result.data.ambitious_universities && result.data.ambitious_universities.length > 0) {
          const ambitiousUnivs = result.data.ambitious_universities.map(uni => ({
            name: uni.university_name,
            country: uni.country,
            rank: uni.university_global_rank,
            logo: `https://s3.ap-south-1.amazonaws.com/testbucket.static.yocket.in/university_logos/${uni.university_logo_url}.jpg`,
            matchPercentage: Math.min(parseInt(uni.university_courses_points) || 75, 100),
            programs: [uni.university_courses_name],
            university_courses_id: uni.university_courses_id,
            university_courses_credential: uni.university_courses_credential,
            university_courses_tuition_usd: uni.university_courses_tuition_usd,
            location_name: uni.location_name,
            university_courses_duration: uni.university_courses_duration,
            annual_fee: uni.annual_fee
          }));
          allUniversities.push(...ambitiousUnivs);
        }

        // Process moderate universities
        if (result.data.moderate_universities && result.data.moderate_universities.length > 0) {
          const moderateUnivs = result.data.moderate_universities.map(uni => ({
            name: uni.university_name,
            country: uni.country,
            rank: uni.university_global_rank,
            logo: `https://s3.ap-south-1.amazonaws.com/testbucket.static.yocket.in/university_logos/${uni.university_logo_url}.jpg`,
            matchPercentage: Math.min(parseInt(uni.university_courses_points) || 65, 100),
            programs: [uni.university_courses_name],
            university_courses_id: uni.university_courses_id,
            university_courses_credential: uni.university_courses_credential,
            university_courses_tuition_usd: uni.university_courses_tuition_usd,
            location_name: uni.location_name,
            university_courses_duration: uni.university_courses_duration,
            annual_fee: uni.annual_fee
          }));
          allUniversities.push(...moderateUnivs);
        }

        // Process safe universities
        if (result.data.safe_universities && result.data.safe_universities.length > 0) {
          const safeUnivs = result.data.safe_universities.map(uni => ({
            name: uni.university_name,
            country: uni.country,
            rank: uni.university_global_rank,
            logo: `https://s3.ap-south-1.amazonaws.com/testbucket.static.yocket.in/university_logos/${uni.university_logo_url}.jpg`,
            matchPercentage: Math.min(parseInt(uni.university_courses_points) || 55, 100),
            programs: [uni.university_courses_name],
            university_courses_id: uni.university_courses_id,
            university_courses_credential: uni.university_courses_credential,
            university_courses_tuition_usd: uni.university_courses_tuition_usd,
            location_name: uni.location_name,
            university_courses_duration: uni.university_courses_duration,
            annual_fee: uni.annual_fee
          }));
          allUniversities.push(...safeUnivs);
        }

        // If we have universities from the API, use those
        if (allUniversities.length > 0) {
          setUniversities(allUniversities);
          toast({
            title: "Success",
            description: `Found ${allUniversities.length} university recommendations!`,
          });
        } else {
          // Show a toast message if no universities were returned
          console.warn("No universities returned from API");
          toast({
            title: "No Results",
            description: "No universities matched your criteria. Try adjusting your preferences.",
            variant: "destructive"
          });
          // We'll still set an empty array and show the results page
          setUniversities([]);
        }
        
        setShowResults(true);
      } catch (error) {
        console.error('Error fetching university recommendations:', error);
        toast({
          title: "Error",
          description: "Failed to fetch university recommendations. Please try again.",
          variant: "destructive"
        });
        // We'll still go to results page but with empty data
        setUniversities([]);
        setShowResults(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBachelorClick = () => {
    const event = new CustomEvent('showBachelorPopup');
    document.dispatchEvent(event);
    toast({
      title: "Coming Soon",
      description: "Bachelor's degree recommendations will be available soon!",
    });
  };

  const resetForm = () => {
    setFormData({...initialFormData});
    setCurrentStep(1);
    setShowResults(false);
    setFormErrors({});
  };

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!formData.degree && !!formData.country && !!formData.major;
      case 2:
        return !!formData.undergradCollege && !!formData.undergradMajor && 
               (formData.score !== undefined && formData.score > 0);
      case 3:
        if (!formData.englishTest) return false;
        if (formData.englishTest && (formData.englishScore === undefined || formData.englishScore <= 0)) return false;
        if (formData.aptitudeTest === 'GRE' && (!formData.greVerbal || !formData.greQuants || !formData.greAwa)) return false;
        if (formData.aptitudeTest === 'GMAT' && !formData.gmatScore) return false;
        return true;
      case 4:
        // Step 4 has optional fields, so it's always complete
        return true;
      default:
        return false;
    }
  };

  const isNextButtonDisabled = () => {
    // Check for any form errors first
    if (Object.keys(formErrors).length > 0) return true;
    
    // Then check if the current step is complete
    return !isStepComplete(currentStep);
  };

  const getEnglishScorePlaceholder = () => {
    switch(formData.englishTest) {
      case 'TOEFL': return 'out of 120';
      case 'IELTS': return 'out of 9';
      case 'PTE': return 'out of 90';
      default: return '';
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                What degree do you plan to study? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`rounded-md py-3 px-6 border ${
                    formData.degree === 'Bachelor\'s'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200'
                  }`}
                  onClick={handleBachelorClick}
                >
                  Bachelor's
                </button>
                <button
                  type="button"
                  className={`rounded-md py-3 px-6 border ${
                    formData.degree === 'Master\'s'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => handleInputChange('degree', 'Master\'s')}
                >
                  Master's
                </button>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                What are you planning to study? <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <MajorSelector
                  majors={coursesData}
                  value={formData.intendedCourseTaxonomyId || null}
                  onChange={(majorName, taxonomyId) => {
                    handleInputChange('major', majorName);
                    handleInputChange('intendedCourseTaxonomyId', taxonomyId.toString());
                  }}
                  isRequired
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Where do you want to study? <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <CountrySelector
                  countries={countries}
                  value={formData.country || null}
                  onChange={(value) => handleInputChange('country', value)}
                  isRequired
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                What was your undergraduate college name? <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3"
                placeholder="Type your College Name"
                value={formData.undergradCollege}
                onChange={(e) => handleInputChange('undergradCollege', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Which course did you major in? <span className="text-red-500">*</span>
              </label>
              <MajorSelector
                majors={coursesData}
                value={formData.undergradMajorTaxonomyId || null}
                onChange={(value, taxonomyId) => {
                  handleInputChange('undergradMajor', value);
                  handleInputChange('undergradMajorTaxonomyId', taxonomyId.toString());
                }}
                isRequired
              />
            </div>

            <div className="flex gap-6">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  What is your score/expected score? <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md p-3"
                  placeholder="e.g: 8"
                  value={formData.score || ''}
                  onChange={(e) => handleInputChange('score', parseFloat(e.target.value))}
                  min="0"
                  required
                />
                {formErrors.score && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.score}</p>
                )}
              </div>
              <div className="w-40" ref={scoreTypeDropdownRef}>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  &nbsp;
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full border border-gray-300 rounded-md p-3 text-left flex justify-between items-center bg-white"
                    onClick={() => {
                      const scoreTypeDropdown = document.getElementById('scoreTypeDropdown');
                      if (scoreTypeDropdown) {
                        scoreTypeDropdown.classList.toggle('hidden');
                      }
                    }}
                  >
                    <span>{formData.scoreType}</span>
                    <span>▼</span>
                  </button>
                  <div 
                    id="scoreTypeDropdown"
                    className="absolute z-10 hidden w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
                  >
                    {['10 CGPA', '100 %', '4 GPA', '5 GPA'].map((type) => (
                      <div 
                        key={type} 
                        className="p-3 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          handleInputChange('scoreType', type);
                          const scoreTypeDropdown = document.getElementById('scoreTypeDropdown');
                          if (scoreTypeDropdown) {
                            scoreTypeDropdown.classList.add('hidden');
                          }
                        }}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Do you have any backlogs?
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-3"
                value={formData.backlogs || 0}
                onChange={(e) => handleInputChange('backlogs', parseInt(e.target.value))}
                min={0}
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Which English test did you take? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['TOEFL', 'IELTS', 'PTE'].map((test) => (
                  <button
                    key={test}
                    type="button"
                    className={`p-3 border rounded-md ${
                      formData.englishTest === test
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-300'
                    }`}
                    onClick={() => handleInputChange('englishTest', test)}
                  >
                    {test}
                  </button>
                ))}
              </div>
              
              {formData.englishTest && (
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Overall score <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-3"
                    placeholder={getEnglishScorePlaceholder()}
                    value={formData.englishScore || ''}
                    onChange={(e) => handleInputChange('englishScore', parseFloat(e.target.value))}
                    min={0}
                    max={
                      formData.englishTest === 'TOEFL' ? 120 : 
                      formData.englishTest === 'IELTS' ? 9 : 
                      formData.englishTest === 'PTE' ? 90 : 0
                    }
                    required
                  />
                  {formData.englishScore <= 0 && (
                    <p className="mt-1 text-sm text-red-500">Score is required</p>
                  )}
                  {formErrors.englishScore && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.englishScore}</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Which aptitude test did you take? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['GRE', 'GMAT', 'None'].map((test) => (
                  <button
                    key={test}
                    type="button"
                    className={`p-3 border rounded-md ${
                      formData.aptitudeTest === test
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-300'
                    }`}
                    onClick={() => handleInputChange('aptitudeTest', test)}
                  >
                    {test}
                  </button>
                ))}
              </div>

              {formData.aptitudeTest === 'GRE' && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Verbal <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md p-3"
                      placeholder="out of 170"
                      value={formData.greVerbal || ''}
                      onChange={(e) => handleInputChange('greVerbal', parseInt(e.target.value))}
                      min={0}
                      max={170}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Quants <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md p-3"
                      placeholder="out of 170"
                      value={formData.greQuants || ''}
                      onChange={(e) => handleInputChange('greQuants', parseInt(e.target.value))}
                      min={0}
                      max={170}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      AWA <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md p-3"
                      placeholder="out of 6"
                      value={formData.greAwa || ''}
                      onChange={(e) => handleInputChange('greAwa', parseFloat(e.target.value))}
                      min={0}
                      max={6}
                      step={0.5}
                      required
                    />
                  </div>
                </div>
              )}

              {formData.aptitudeTest === 'GMAT' && (
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Total Score <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md p-3"
                    placeholder="out of 800"
                    value={formData.gmatScore || ''}
                    onChange={(e) => handleInputChange('gmatScore', parseInt(e.target.value))}
                    min={0}
                    max={800}
                    required
                  />
                </div>
              )}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  How much relevant work experience do you have?
                </label>
                <div className="flex">
                  <input
                    type="number"
                    className="flex-1 border border-gray-300 rounded-l-md p-3"
                    placeholder="e.g: 20"
                    value={formData.workExperience === 0 ? '' : formData.workExperience}
                    onChange={(e) => handleInputChange('workExperience', parseInt(e.target.value || '0'))}
                    min={0}
                  />
                  <span className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-md px-3 flex items-center">
                    Months
                  </span>
                </div>
                {formErrors.workExperience && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.workExperience}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Have you published any relevant research papers?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['International', 'National', 'None'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`p-2 border text-sm rounded-md ${
                      formData.researchPapers === type
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-300'
                    }`}
                    onClick={() => handleInputChange('researchPapers', type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                How many relevant projects have you done?
              </label>
              <div className="flex">
                <input
                  type="number"
                  className="flex-1 border border-gray-300 rounded-l-md p-3"
                  placeholder="e.g: 2"
                  value={formData.projects === 0 ? '' : formData.projects}
                  onChange={(e) => handleInputChange('projects', parseInt(e.target.value || '0'))}
                  min={0}
                />
                <span className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-md px-3 flex items-center">
                  Projects
                </span>
              </div>
              {formErrors.projects && (
                <p className="mt-1 text-sm text-red-500">{formErrors.projects}</p>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderResults = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Top University Recommendations</h2>
        {universities.length === 0 ? (
          <p className="text-gray-600">No universities found matching your criteria.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {universities.map((university, index) => (
              <div key={index} className="border rounded-lg shadow-md overflow-hidden">
                <div className="p-4 flex items-center border-b">
                  <div className="w-16 h-16 flex-shrink-0 mr-4">
                    <img 
                      src={university.logo} 
                      alt={`${university.name} logo`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=University';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{university.name}</h3>
                    <p className="text-gray-600">{university.country} {university.location_name ? `- ${university.location_name}` : ''}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <span className="text-sm text-gray-600">World Rank</span>
                    <p className="font-bold">{university.rank || 'N/A'}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Match Percentage</span>
                    <span className="font-bold text-orange-500">{university.matchPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-orange-500 h-2.5 rounded-full" 
                      style={{ width: `${university.matchPercentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-sm font-medium">Course:</span>
                      <p>{university.programs && university.programs.length > 0 ? university.programs[0] : 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Credential:</span>
                      <p>{university.university_courses_credential || 'MS'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Duration:</span>
                      <p>{university.university_courses_duration ? `${university.university_courses_duration} months` : 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Tuition Fee:</span>
                      <p>${university.university_courses_tuition_usd?.toLocaleString() || university.annual_fee?.toLocaleString() || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return <LoadingAnimation onComplete={() => {
      setIsLoading(false);
      setShowResults(true);
    }} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!showResults ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <h1 className="text-xl font-semibold text-gray-800">
                    College Finder Tool: Find Your Dream College Abroad
                  </h1>
                  <ProgressSteps currentStep={currentStep} totalSteps={4} />
                </div>
              </div>
              
              <div className="p-6">
                {currentStep === 1 && (
                  <h2 className="text-lg font-medium mb-6">Step 1 of 4</h2>
                )}
                {currentStep === 2 && (
                  <h2 className="text-lg font-medium mb-6">
                    TELL US ALL ABOUT YOUR UNDERGRAD <span className="text-teal-500">ⓘ</span>
                  </h2>
                )}
                {currentStep === 3 && (
                  <h2 className="text-lg font-medium mb-6">
                    FILL UP YOUR TEST SCORES <span className="text-teal-500">ⓘ</span>
                  </h2>
                )}
                {currentStep === 4 && (
                  <h2 className="text-lg font-medium mb-6">
                    MAKE YOUR EXPERIENCE COUNT!
                  </h2>
                )}
                
                {renderStepContent()}
                
                <div className="mt-8 flex justify-between">
                  {currentStep > 1 && (
                    <button 
                      className="text-orange-500 hover:text-orange-600"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  )}
                  {currentStep === 4 ? (
                    <button
                      className={`ml-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md ${
                        isNextButtonDisabled() ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={handleNext}
                      disabled={isNextButtonDisabled()}
                    >
                      Find Universities
                    </button>
                  ) : (
                    <button
                      className={`ml-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md ${
                        isNextButtonDisabled() ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={handleNext}
                      disabled={isNextButtonDisabled()}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              {renderResults()}
              <div className="mt-8">
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md"
                  onClick={resetForm}
                >
                  Start New Search
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CollegeFinder;
