import { Box, Container, Flex, Text, Spinner } from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';
import TrackList from '../components/TrackList';
import useHomeDetails from '../models/useHomeDetails';
import PageLoader from '../components/PageLoader';

function HomePage() {
    const { tracks, isLoading, searchTracks } = useHomeDetails();

    return (
        <Container maxW={'3xl'} py="8" w="100%" h="100%">
            <Box mt="8" mb="20">
                <SearchBar onSearch={searchTracks} />
            </Box>
            <Box>
                <TrackList tracks={tracks} />
            </Box>
            {!tracks.length && <PageLoader isLoading={isLoading} />}
        </Container>
    );
}

export default HomePage;
