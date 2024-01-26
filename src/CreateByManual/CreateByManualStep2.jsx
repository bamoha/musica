import { useState } from 'react';
import EXButton from '../../../../components/EXButton';
import EXInput from '../../../../components/EXInput';
import DeleteIcon from '../../../../components/images/deleteIcon';
import EXProfileBox from '../../../../components/EXProfileBox';
import { Formik, FieldArray, Form } from 'formik';
import useCreateByManualStep2 from './models/useCreateByManualStep2';

const CreateByManualStep2 = ({ profileBody, OnMoveToNextStep, OnMoveBack, className, onSkip }) => {
    const {
        step2InitialValues,
        step2ValidationSchema,
        onSubmitStep2Form,
        isStep2Loading,
        addStep2Form,
        removeStep2Form,
        handleCheckboxChange,
    } = useCreateByManualStep2(OnMoveToNextStep);

    return (
        <Formik
            initialValues={step2InitialValues}
            validationSchema={step2ValidationSchema}
            onSubmit={onSubmitStep2Form}
        >
            {({
                values,
                handleSubmit,
                errors,
                touched,
                setFieldValue,
                handleChange,
            }) => (
                <Form className={`max-w-[575px] mb-36 w-full ${className}`}>
                    <h1 className="text-[40px] mt-14 mb-10 font-semibold leading-[48px] text-neautral15">
                        Your experience
                    </h1>
                    <EXProfileBox profileBody={profileBody} />
                    <FieldArray
                        name="createByManualStep2"
                        render={(arrayHelpers) => (
                            <>
                                {values.createByManualStep2.map(
                                    (step2, index) => (
                                        <div
                                            key={index}
                                            className={`mb-6 ${index > 0
                                                ? 'rounded-2xl border p-6 border-neautral80'
                                                : ''
                                                }`}
                                        >
                                            {index > 0 && (
                                                <div className="flex justify-between mb-3">
                                                    <h4 className="text-2xl">
                                                        Previous experience
                                                    </h4>
                                                    <DeleteIcon
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            removeStep2Form(
                                                                arrayHelpers,
                                                                index
                                                            )
                                                        }
                                                    />
                                                </div>
                                            )}
                                            <EXInput
                                                name={`createByManualStep2.${index}.jobTitle`}
                                                label="Job Title"
                                                className="w-full max-w-full"
                                                onChange={handleChange}
                                                value={step2.jobTitle}
                                                errorMessage={
                                                    errors.createByManualStep2 &&
                                                        touched.createByManualStep2 &&
                                                        errors.createByManualStep2[
                                                        index
                                                        ] &&
                                                        touched.createByManualStep2[
                                                        index
                                                        ] &&
                                                        errors.createByManualStep2[
                                                            index
                                                        ].jobTitle
                                                        ? errors
                                                            .createByManualStep2[
                                                            index
                                                        ].jobTitle
                                                        : ''
                                                }
                                            />
                                            <EXInput
                                                name={`createByManualStep2.${index}.company`}
                                                label="Company"
                                                className="w-full max-w-full"
                                                onChange={handleChange}
                                                value={step2.company}
                                                errorMessage={
                                                    errors.createByManualStep2 &&
                                                        touched.createByManualStep2 &&
                                                        errors.createByManualStep2[
                                                        index
                                                        ] &&
                                                        touched.createByManualStep2[
                                                        index
                                                        ] &&
                                                        errors.createByManualStep2[
                                                            index
                                                        ].company
                                                        ? errors
                                                            .createByManualStep2[
                                                            index
                                                        ].company
                                                        : ''
                                                }
                                            />
                                            <div className="flex gap-4">
                                                <div className="w-1/2">
                                                    <EXInput
                                                        name={`createByManualStep2.${index}.startDate`}
                                                        label="Start Date"
                                                        inputType="datePicker"
                                                        className={
                                                            'w-full max-w-full'
                                                        }
                                                        onChange={(date) => {
                                                            const dateString =
                                                                new Date(
                                                                    date
                                                                ).toLocaleDateString();
                                                            setFieldValue(
                                                                `createByManualStep2.${index}.startDate`,
                                                                dateString
                                                            );
                                                        }}
                                                        value={step2.startDate}
                                                        errorMessage={
                                                            errors.createByManualStep2 &&
                                                                touched.createByManualStep2 &&
                                                                errors
                                                                    .createByManualStep2[
                                                                index
                                                                ] &&
                                                                touched
                                                                    .createByManualStep2[
                                                                index
                                                                ] &&
                                                                errors
                                                                    .createByManualStep2[
                                                                    index
                                                                ].startDate
                                                                ? errors
                                                                    .createByManualStep2[
                                                                    index
                                                                ].startDate
                                                                : ''
                                                        }
                                                    />
                                                </div>
                                                {!values.createByManualStep2[
                                                    index
                                                ].currentRole && (
                                                        <div className="w-1/2">
                                                            <EXInput
                                                                name={`createByManualStep2.${index}.endDate`}
                                                                label="Last Date"
                                                                inputType="datePicker"
                                                                className={'w-full'}
                                                                onChange={(
                                                                    date
                                                                ) => {
                                                                    const dateString =
                                                                        new Date(
                                                                            date
                                                                        ).toLocaleDateString();
                                                                    setFieldValue(
                                                                        `createByManualStep2.${index}.endDate`,
                                                                        dateString
                                                                    );
                                                                }}
                                                                value={step2.endDate}
                                                                errorMessage={
                                                                    errors.createByManualStep2 &&
                                                                        touched.createByManualStep2 &&
                                                                        errors
                                                                            .createByManualStep2[
                                                                        index
                                                                        ] &&
                                                                        touched
                                                                            .createByManualStep2[
                                                                        index
                                                                        ] &&
                                                                        errors
                                                                            .createByManualStep2[
                                                                            index
                                                                        ].endDate
                                                                        ? errors
                                                                            .createByManualStep2[
                                                                            index
                                                                        ].endDate
                                                                        : ''
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                            </div>
                                            <div className="mb-6">
                                                <div className="flex items-center">
                                                    <input
                                                        name={`createByManualStep2.${index}.currentRole`}
                                                        type="checkbox"
                                                        checked={
                                                            step2.currentRole
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxChange(
                                                                e,
                                                                index,
                                                                setFieldValue
                                                            )
                                                        }
                                                        className="w-6 h-6 text-primary50 accent-primary50 border-neautral60 rounded ml-2 focus:ring-0 focus:outline-0"
                                                    />
                                                    <label
                                                        htmlFor="default-checkbox"
                                                        className="ml-2 text-sm text-neautral30"
                                                    >
                                                        I am currently working
                                                        in this role
                                                    </label>
                                                </div>
                                            </div>
                                            <EXInput
                                                name={`createByManualStep2.${index}.description`}
                                                label="Description"
                                                className="w-full max-w-full"
                                                inputType="textArea"
                                                onChange={handleChange}
                                                value={step2.description}
                                                errorMessage={
                                                    errors.createByManualStep2 &&
                                                        touched.createByManualStep2 &&
                                                        errors.createByManualStep2[
                                                        index
                                                        ] &&
                                                        touched.createByManualStep2[
                                                        index
                                                        ] &&
                                                        errors.createByManualStep2[
                                                            index
                                                        ].description
                                                        ? errors
                                                            .createByManualStep2[
                                                            index
                                                        ].description
                                                        : ''
                                                }
                                            />
                                        </div>
                                    )
                                )}


                                <EXButton
                                    size="large"
                                    btnType='text'
                                    type="button"
                                    onClick={() => addStep2Form(arrayHelpers)}
                                >
                                    Add other Company
                                </EXButton>
                            </>
                        )}
                    />

                    <div className="w-full mt-10 flex justify-between items-center">
                        <span className="md:block hidden text-neautral30">Step 2/3</span>
                        <div className="gap-6 flex w-full md:w-auto">
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
                                onClick={OnMoveBack}
                                type="button"
                                className="w-full md:w-auto"
                            >
                                Back
                            </EXButton>
                            <EXButton
                                size="large"
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full md:w-auto"
                                isLoading={isStep2Loading}
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

export default CreateByManualStep2;
