import { useEffect, useState } from 'react';
import EXButton from '../../../../components/EXButton';
import EXInput from '../../../../components/EXInput';
import EXListItem from '../../../../components/EXListItem';
import { Formik } from 'formik';
import useCreateByManualStep3 from './models/useCreateByManualStep3';
import EXProfileBox from '../../../../components/EXProfileBox';

const CreateByManualStep3 = ({ OnMoveBack, profileBody, className, onSkip }) => {
    const [displayedSkills, setDisplayedSkills] = useState([]);

    const {
        initialValues,
        validateValues,
        onSubmitStep3,
        skillsBody,
        addSkill,
        deleteSkill,
        skills,
        isStep3Loading,
    } = useCreateByManualStep3();

    useEffect(() => {
        if (skillsBody) {
            const formattedSkillsBody = skillsBody.map((item) => ({
                value: item,
                label: item,
            }));
            setDisplayedSkills(formattedSkillsBody);
        }
    }, [skillsBody]);

    return (
        <form className={`max-w-[575px] mb-36 w-full ${className}`}>
            <h1 className="text-[40px] mt-14 mb-10 font-semibold leading-[48px] text-neautral15">
                What are your skills?
            </h1>
            <EXProfileBox profileBody={profileBody} />
            <Formik
                initialValues={initialValues}
                validate={validateValues}
                onSubmit={addSkill}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-4">
                            <div className="w-4/6">
                                <EXInput
                                    name="skill"
                                    label="Skill"

                                    placeholder={<div className='text-neautral30'>For example "Java"</div>}
                                    className="w-full"
                                    onChange={(val) =>
                                        setFieldValue('skill', val)
                                    }
                                    onBlur={handleBlur}
                                    value={values.skill}
                                    options={displayedSkills}
                                    isSearchable
                                    inputType="select"
                                    errorMessage={
                                        errors.skill &&
                                        touched.skill &&
                                        errors.skill
                                    }
                                />
                            </div>
                            <div className="w-2/6">
                                <EXInput
                                    name="experience"
                                    label="Experience"
                                    placeholder="Years"
                                    className="w-full"
                                    onInput={handleChange}
                                    onBlur={handleBlur}
                                    value={values.experience}
                                    errorMessage={
                                        errors.experience &&
                                        touched.experience &&
                                        errors.experience
                                    }
                                />
                            </div>
                        </div>
                        <EXButton
                            size="large"
                            btnType='text'
                            type="button"
                            onClick={() => handleSubmit()}
                        >
                            Add Skills
                        </EXButton>
                    </form>
                )}
            </Formik>

            <div className="mt-8 flex flex-wrap">
                {skills.map((item, index) => (
                    <EXListItem
                        isEdit
                        title={item.skill}
                        subtitle={`${item.yoe} Years`}
                        onDelete={() => deleteSkill(index)}
                    />
                ))}
            </div>

            <div className="w-full mt-10 flex justify-between items-center">
                <span className="md:block hidden text-neautral30">Step 3/3</span>
                <div className="gap-6 flex">
                    <EXButton
                        btnType="text"
                        size="large"
                        onClick={onSkip}
                        type="button"
                        className="w-full md:w-auto"
                    >
                        Skip
                    </EXButton>
                    <EXButton
                        btnType="outline"
                        size="large"
                        onClick={() => {
                            OnMoveBack();
                        }}
                        type="button"
                    >
                        Back
                    </EXButton>
                    <EXButton
                        size="large"
                        type="button"
                        isLoading={isStep3Loading}
                        onClick={() => {
                            onSubmitStep3();
                        }}
                    >
                        Continue
                    </EXButton>
                </div>
            </div>
        </form>
    );
};

export default CreateByManualStep3;
