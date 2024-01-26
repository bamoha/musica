import { useState } from 'react';
import EXButton from '../../../../components/EXButton';
import EXInput from '../../../../components/EXInput';
import DeleteIcon from '../../../../components/images/deleteIcon';
import { Formik, FieldArray, Form } from 'formik';
import useCreateByManualStep1 from './models/useCreateByManualStep1';

const CreateByManualStep1 = ({
    OnMoveToNextStep,
    OnMoveBack,
    isProfileLoading,
    className,
}) => {
    const {
        step1ValidationSchema,
        onSubmitStep1Form,
        isStep1Loading,
    } = useCreateByManualStep1(OnMoveToNextStep);
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                jobTitle: '',
                phone: '',
                linkedin: '',
                socialMedia: [],
            }}
            validationSchema={step1ValidationSchema}
            onSubmit={onSubmitStep1Form}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                <Form className={`max-w-[575px] mb-36 w-full ${className}`}>
                    <h1 className="text-[40px] mt-14 mb-10 font-semibold leading-[48px] text-neautral15">
                        Profile information
                    </h1>
                    <EXInput
                        name="firstName"
                        label="First Name"
                        className="w-full max-w-full"
                        onChange={handleChange}
                        value={values.firstName}
                        errorMessage={
                            errors.firstName &&
                            touched.firstName &&
                            errors.firstName
                        }
                    />
                    <EXInput
                        name="lastName"
                        label="Last Name"
                        className="w-full max-w-full"
                        onChange={handleChange}
                        value={values.lastName}
                        errorMessage={
                            errors.lastName &&
                            touched.lastName &&
                            errors.lastName
                        }
                    />
                    <EXInput
                        name="jobTitle"
                        label="Job Title"
                        className="w-full max-w-full"
                        onChange={handleChange}
                        value={values.jobTitle}
                        errorMessage={
                            errors.jobTitle &&
                            touched.jobTitle &&
                            errors.jobTitle
                        }
                    />
                    <EXInput
                        name="phone"
                        label="Phone"
                        className="w-full max-w-full"
                        onChange={handleChange}
                        value={values.phone}
                        errorMessage={
                            errors.phone && touched.phone && errors.phone
                        }
                    />

                    <EXInput
                        name="linkedin"
                        label="Add Your LinkedIn"
                        className="w-full max-w-full"
                        onChange={handleChange}
                        value={values.linkedin}
                        errorMessage={
                            errors.linkedin &&
                            touched.linkedin &&
                            errors.linkedin
                        }
                    />

                    <FieldArray name="socialMedia">
                        {({ push, remove }) => (
                            <div>
                                {values.socialMedia.map((social, index) => (
                                    <div className="flex gap-2 items-center" key={index}>
                                        <EXInput
                                            name={`socialMedia[${index}]`}
                                            label="Social Media"
                                            className="w-full max-w-full"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={social}
                                            errorMessage={
                                                errors.socialMedia &&
                                                touched.socialMedia &&
                                                errors.socialMedia
                                            }
                                        />
                                        <DeleteIcon
                                            className="cursor-pointer"
                                            onClick={() => remove(index)}
                                        />
                                    </div>
                                ))}

                                <EXButton
                                    onClick={() => push('')}
                                    type="button"
                                    btnType='text'
                                    size="small"
                                >
                                    Add Other Reference Links (e.g. GitHub)
                                </EXButton>
                            </div>
                        )}
                    </FieldArray>

                    <div className="w-full mt-10 flex justify-between items-center">
                        <span className="md:block hidden text-neautral30">Step 1/3</span>
                        <div className="gap-6 flex w-full md:w-auto">
                            <EXButton
                                btnType="outline"
                                size="large"
                                onClick={OnMoveBack}
                                type="button"
                                className="w-full md:w-auto"
                            >
                                Back
                            </EXButton>
                            <EXButton
                                size="large"
                                type="submit"
                                className="w-full md:w-auto"
                                isLoading={isStep1Loading || isProfileLoading}
                            >
                                Continue
                            </EXButton>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default CreateByManualStep1;
