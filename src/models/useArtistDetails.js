import { useEffect, useState } from 'react';
import {
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import baseUrl from './baseUrl';

function useArtistDetails(artistId) {
    const [artistData, setArtistData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    const searchArtist = async (id) => {
        setIsLoading(true);
        try {
            const artistResponse = await axios.get(
                baseUrl(`artist/${id}`)
            );
            const artistTopTracks = await axios.get(baseUrl(`artist/${id}/top?limit=5`));
            const albumResponse = await axios.get(
                baseUrl(`artist/${id}/albums`)
            );
            const artistDetails = artistResponse.data;
            const artistTopTracksDetails = artistTopTracks.data.data;
            const albumDetails = albumResponse.data.data;

            // console.log(albumDetails)
            const formattedArtistData = {
                name: artistDetails.name,
                picture: artistDetails.picture_xl,
                fans: artistDetails.nb_fan,
                albumCount: artistDetails.nb_album,
                topTracks: artistTopTracksDetails,
                albumDetails
            }
            setArtistData(formattedArtistData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error searching tracks:', error);
            toast({
                description: `Error searching tracks: ${error}`,
                status: 'error',
            });
            setIsLoading(false);
        }
    };

    useEffect(() => {
        searchArtist(artistId)
    }, [])

    return {
        artistData,
        isLoading
    }
}

export default useArtistDetails;
