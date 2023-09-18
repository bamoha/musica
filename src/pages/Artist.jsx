import {
    Box,
    Container,
    Text,
    Grid,
    GridItem,
    Image,
    Card,
    CardHeader,
    CardBody,
    Stack,
    StackDivider,
    Heading,
} from '@chakra-ui/react';
import useArtistDetails from '../models/useArtistDetails';
import { useParams } from 'react-router-dom';
import PageLoader from '../components/PageLoader';

function Artist() {
    const { artistId } = useParams();
    const { artistData, isLoading } = useArtistDetails(artistId);

    return (
        <Container maxW={'3xl'} py="8" w="100%" h="100%">
            {!artistData ? (
                <PageLoader isLoading={isLoading} onlySpinner />
            ) : (
                <Box>
                    <Card>
                        <CardHeader>
                            <Image
                                src={artistData.picture}
                                height="200px"
                                width="200px"
                                alt={artistData.name}
                                borderRadius="5px"
                            />
                            <Text mt="5" fontSize="xl" fontWeight="bold">
                                {artistData.name}
                            </Text>
                            <Text>Fans: {artistData.fans}</Text>
                        </CardHeader>

                        <CardBody>
                            <Box>
                                <Text my="5" fontSize="lg" fontWeight="bold">
                                    Top Tracks
                                </Text>
                                <Stack divider={<StackDivider />} spacing="4">
                                    {artistData.topTracks.map((track) => (
                                        <Box key={track.id}>
                                            <Heading
                                                size="xs"
                                                textTransform="uppercase"
                                            >
                                                {track.title}
                                            </Heading>
                                            <Text pt="2" fontSize="sm">
                                                From Album: {track.album.title}
                                            </Text>
                                        </Box>
                                    ))}
                                    {artistData.topTracks.length === 0 && (
                                        <Text as="i">No top Tracks</Text>
                                    )}
                                </Stack>
                            </Box>
                            <Box>
                                <Text my="5" fontSize="lg" fontWeight="bold">
                                    Albums ({artistData.albumDetails.length})
                                </Text>
                                <Grid
                                    templateColumns={{
                                        base: '1fr',
                                        md: 'repeat(3, 1fr)',
                                    }}
                                    gap={6}
                                >
                                    {artistData.albumDetails.map((album) => (
                                        <GridItem
                                            key={album.id}
                                            p="4"
                                            borderWidth="1px"
                                            mb="2"
                                            borderRadius="5px"
                                        >
                                            <Image
                                                src={album.cover_xl}
                                                alt={album.title}
                                                borderRadius="5px"
                                                height="160px"
                                                width="160px"
                                            />
                                            <Stack mt="6" spacing="3">
                                                <Heading size="md">
                                                    {album.title}
                                                </Heading>
                                                <Text>
                                                    {album.release_date}
                                                </Text>
                                            </Stack>
                                        </GridItem>
                                    ))}
                                </Grid>

                                {artistData.albumDetails.length === 0 && (
                                    <Text as="i">No Albums</Text>
                                )}
                            </Box>
                        </CardBody>
                    </Card>
                </Box>
            )}
        </Container>
    );
}

export default Artist;
