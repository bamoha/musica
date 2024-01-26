import { useMutation } from "react-query";
import * as Yup from 'yup';
import { toast } from "react-toastify"
import postCreateProfile from "../../../../../queries/postCreateProfile";
import { useUserState } from "../../../../../state/StateProvider";

const useCreateByManualStep1 = (nextStep) => {
    const { userDetails } = useUserState();

    const step1ValidationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        jobTitle: Yup.string().required('Job Title is required'),
        phone: Yup.string()
            .matches(
                /\(?\d{3}\)?-? *\d{3}-? *-?\d{4}/,
                'Invalid US phone number'
            )
            .required('Phone number is required'),
        linkedin: Yup.string()
            .url('Invalid URL format')
            .required('LinkedIn link is required')
            .matches(
                /^(https:\/\/)?(www\.)?linkedin\.com\/.*$/,
                'Please enter a valid LinkedIn profile link'
            ),
        socialMedia: Yup.array()
            .of(Yup.string().url('Invalid URL format'))
            .required(),
    });

    const { mutate: step1Mutate, isLoading: isStep1Loading } = useMutation(postCreateProfile, {
        onError: (error) => {
            toast.error(error?.response?.data?.error || "An error occured")
        },
        onSuccess: (data, variables, context) => {
            nextStep()
            toast.success('Step 1 completed successfully')
        },
    });

    const onSubmitStep1Form = (values) => {
        const payload = {
            firstName: values.firstName,
            lastName: values.lastName,
            title: values.jobTitle,
            contact: {
                phone: values.phone,
                email: userDetails.email,
                linkedin: values.linkedin,
                countryCode: '1',
            },
        };
        if (values.socialMedia.length > 0) {
            const prepareSocialLinks = values.socialMedia.map(item => ({ name: 'social', url: item }))
            payload['socialLinks'] = prepareSocialLinks
        }
        step1Mutate(payload)
    }

    return {
        step1ValidationSchema,
        onSubmitStep1Form,
        isStep1Loading,
    }
}

export default useCreateByManualStep1;