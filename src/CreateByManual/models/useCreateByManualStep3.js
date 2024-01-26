import { useMutation, useQuery } from 'react-query';
import { useUserState } from '../../../../../state/StateProvider';
import getSkills from '../../../../../queries/getSkills';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import patchUpdateProfile from '../../../../../queries/patchUpdateProfile';
import { toast } from 'react-toastify';
import { uniqueObjectsByProperty } from '../../../../../utils';

const useCreateByManualStep3 = () => {
    const initialValues = { skill: '', experience: '' };
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);

    const validateValues = (values) => {
        const errors = {};
        if (!values.skill) {
            errors.skill = 'Skill is Required';
        }
        if (!values.experience) {
            errors.experience = 'Experience is Required';
        }
        if (values.experience.length > 2) {
            errors.experience = 'You cant have more than 2 digit experience';
        }
        return errors;
    };

    const addSkill = (values) => {
        const newSkill = [...skills, { skill: values.skill.value, yoe: values.experience }];
        const uniqueArray = uniqueObjectsByProperty(newSkill, 'skill');
        setSkills(uniqueArray);
    };

    const deleteSkill = (index) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
    };

    const { mutate: step3Mutate, isLoading: isStep3Loading } = useMutation(patchUpdateProfile, {
        onError: (error) => {
            toast.error(error?.response?.data?.error || "An error occured")
        },
        onSuccess: (data, variables, context) => {
            navigate('/candidate/dashboard/profile');
            toast.success('Step 3 completed successfully')
        },
    });

    const onSubmitStep3 = () => {
        const payload = {
            skills: [...skills],
        };
        step3Mutate(payload)
    }


    const {
        data: skillsBody,
    } = useQuery(
        'getSkills',
        () =>
            getSkills(),
    );

    return {
        initialValues,
        validateValues,
        onSubmitStep3,
        skillsBody,
        addSkill,
        deleteSkill,
        skills,
        isStep3Loading
    };
};

export default useCreateByManualStep3;
