import { useQuery } from 'react-query';
import getProfile from '../../../../../queries/getProfile';

const useCreateByManual = () => {

     const {
         data: profileBody,
         isLoading: isProfileLoading,
         refetch: fetchProfile,
     } = useQuery(
         'getProfile',
         () =>
             getProfile(),
         {
             enabled: false,
         }
     );


    return {
        profileBody,
        isProfileLoading,
        fetchProfile,
    };
};

export default useCreateByManual;
