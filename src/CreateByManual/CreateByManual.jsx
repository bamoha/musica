import { useEffect, useState } from 'react';
import CreateByManualStep1 from './CreateByManualStep1';
import CreateByManualStep2 from './CreateByManualStep2';
import CreateByManualStep3 from './CreateByManualStep3';
import EXSlimNavbar from '../../../../components/EXSlimNavbar';
import useCreateByManual from './models/useCreateByManual';
import { useNavigate } from 'react-router-dom';

const CreateByManual = () => {
    const [currentStep, setCurrentStep] = useState('step1');
    const navigate = useNavigate();

    const { profileBody, isProfileLoading, fetchProfile } = useCreateByManual();

    const ReturnCurrentStep = () => {
        if (currentStep === 'step1') {
            return (
                <CreateByManualStep1
                    isProfileLoading={isProfileLoading}
                    OnMoveBack={() => { navigate('/candidate/onboarding/create-by-linkedin') }}
                    OnMoveToNextStep={() => {
                        fetchProfile();
                        setCurrentStep('step2');
                    }}
                />
            );
        }
        if (currentStep === 'step2') {
            return (
                <CreateByManualStep2
                    profileBody={profileBody}
                    OnMoveToNextStep={() => {
                        fetchProfile();
                        setCurrentStep('step3');
                    }}
                    onSkip={() => {
                        setCurrentStep('step3');
                        return
                    }}
                    OnMoveBack={() => setCurrentStep('step1')}
                />
            );
        }
        if (currentStep === 'step3') {
            return (
                <CreateByManualStep3
                    profileBody={profileBody}
                    OnMoveBack={() => setCurrentStep('step2')}
                    onSkip={() => {
                        navigate('/candidate/dashboard/profile')
                        return
                    }}
                />
            );
        }
    };

    return (
        <>
            <EXSlimNavbar />
            <section className="px-10 py-4 md:px-[120px] md:py-8 w-full">
                <div className="container mx-auto flex justify-between flex-col-reverse sm:flex-row gap-6">
                    <ReturnCurrentStep />
                    {currentStep !== 'step1' && profileBody ? (
                        <div className="hidden md:block mt-14">
                            <div className="p-6 bg-neautral97 rounded-2xl min-w-full  md:min-w-[380px]">
                                <h4 className="text-2xl text-neautral15">
                                    Your profile
                                </h4>
                                <div className="mt-6">
                                    <div className="mb-4">
                                        <p className="text-neautral15">
                                            {profileBody.firstName}{' '}
                                            {profileBody.lastName}
                                        </p>
                                        <p className="text-sm text-neautral30">
                                            Your Name
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-neautral15">
                                            {profileBody.title}
                                        </p>
                                        <p className="text-sm text-neautral30">
                                            Job Title
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-neautral15">
                                            {profileBody.contact.email}
                                        </p>
                                        <p className="text-neautral15">
                                            +{profileBody.contact.countryCode}
                                            {profileBody.contact.phone}
                                        </p>
                                        <p className="text-neautral15">
                                            in: {profileBody.contact.linkedin}
                                        </p>
                                        <p className="text-sm text-neautral30">
                                            Contact Info
                                        </p>
                                    </div>
                                    {currentStep === 'step3' &&
                                        profileBody.experiences && (
                                            <div className="mb-4">
                                                <p className="text-neautral15">
                                                    {
                                                        profileBody
                                                            .experiences[0]
                                                            .jobTitle
                                                    }
                                                </p>
                                                <p className="text-sm text-neautral30">
                                                    {
                                                        profileBody
                                                            .experiences[0]
                                                            .company
                                                    }
                                                    ,{' '}
                                                    {
                                                        profileBody
                                                            .experiences[0]
                                                            .start_date
                                                    }{' '}
                                                    -{' '}
                                                    {
                                                        profileBody
                                                            .experiences[0]
                                                            .end_date
                                                    }
                                                </p>

                                                {profileBody.experiences
                                                    .length > 1 && (
                                                        <p className="text-neautral30 bg-neautral90 px-4 py-2 rounded-lg w-fit mt-4">
                                                            +
                                                            {
                                                                profileBody
                                                                    .experiences
                                                                    .length
                                                            }{' '}
                                                            more company
                                                        </p>
                                                    )}
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </section>
        </>
    );
};

export default CreateByManual;
