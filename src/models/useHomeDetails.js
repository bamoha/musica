import { useState } from 'react';
import {
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import baseUrl from './baseUrl';

function useHomeDetails() {
    const [tracks, setTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    const searchTracks = async (searchTerm) => {
        if (!searchTerm.length) {
            toast({
                description: `You need to input a search text`,
                status: 'error',
            });
            return;
        }
        setIsLoading(true);
        setTracks([]);
        try {
            const response = await axios.get(
                baseUrl(`search?q=${searchTerm}`)
            );
            const trackData = response.data.data;
            const formattedTracks = trackData.map((track) => ({
                id: track.id,
                title: track.title,
                artist: track.artist.name,
                duration: track.duration,
                album: track.album.title,
                cover: track.album.cover_xl,
                artistId: track.artist.id
            }));
            setTracks(formattedTracks);
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

    return {
        tracks,
        isLoading,
        searchTracks
    }
}

export default useHomeDetails;
