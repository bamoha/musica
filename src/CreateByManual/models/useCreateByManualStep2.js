import { useMutation } from "react-query";
import * as Yup from 'yup';
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { useUserState } from "../../../../../state/StateProvider";
import patchUpdateProfile from "../../../../../queries/patchUpdateProfile";

const useCreateByManualStep2 = (nextStep) => {
    const navigate = useNavigate();
    const { userDetails } = useUserState();

    const addStep2Form = (arrayHelpers) => {
        arrayHelpers.push({
            jobTitle: '',
            company: '',
            startDate: '',
            endDate: '',
            currentRole: false,
            description: '',
        });
    };

    const removeStep2Form = (arrayHelpers, index) => {
        arrayHelpers.remove(index);
    };

    const step2InitialValues = {
        createByManualStep2: [
            {
                jobTitle: '',
                company: '',
                startDate: '',
                endDate: '',
                currentRole: false,
                description: '',
            },
        ],
    };

    const step2ValidationSchema = Yup.object().shape({
        createByManualStep2: Yup.array().of(
            Yup.object().shape({
                jobTitle: Yup.string().required('Job Title is required'),
                company: Yup.string().required('Company is required'),
                startDate: Yup.string().matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 'Invalid date format').required('Start Date is required'),
                currentRole: Yup.boolean(),
                endDate: Yup.string().when('currentRole', {
                    is: true,
                    then: () => Yup.string().notRequired(),
                    otherwise: () =>
                        Yup.string().matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 'Invalid date format').required('End Date is required'),
                }),
            })
        ),
    });

    const { mutate: step2Mutate, isLoading: isStep2Loading } = useMutation(patchUpdateProfile, {
        onError: (error) => {
            toast.error(error?.response?.data?.error || "An error occured")
        },
        onSuccess: (data, variables, context) => {
            nextStep()
            toast.success('Step 2 completed successfully')
        },
    });

    const onSubmitStep2Form = (values) => {
        const experiencesArray = values.createByManualStep2.map(item => {
            if (item.description.length) {

                return {
                    company: item.company,
                    jobTitle: item.jobTitle,
                    start_date: item.startDate,
                    end_date: item.startDate,
                    isActive: item.currentRole,
                    country: "USA",
                    description: item.description
                }
            }

            return {
                company: item.company,
                jobTitle: item.jobTitle,
                start_date: item.startDate,
                end_date: item.startDate,
                isActive: item.currentRole,
                country: "USA",
            }
        })

        const payload = {
            experiences: experiencesArray,
        };
        step2Mutate(payload)
    }

    const handleCheckboxChange = (e, index, setFieldValue) => {
        const currentRole = e.target.checked;
        setFieldValue(`createByManualStep2.${index}.currentRole`, currentRole);
        if (currentRole) {
            setFieldValue(`createByManualStep2.${index}.endDate`, ''); // Clearing end date if currentRole is selected
        }
    };

    return {
        step2InitialValues,
        step2ValidationSchema,
        onSubmitStep2Form,
        isStep2Loading,
        addStep2Form,
        removeStep2Form,
        handleCheckboxChange
    }
}

export default useCreateByManualStep2;