import { Box, Flex, Grid, GridItem, Text, Icon, Image, Link } from '@chakra-ui/react';
import { FaClock } from 'react-icons/fa';

function TrackList({ tracks }) {
    return (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            {tracks.map((track) => (
                <GridItem
                    key={track.id}
                    p="4"
                    borderWidth="1px"
                    mb="2"
                    borderRadius="5px"
                    _hover={{ boxShadow: 'lg', transition: 'box-shadow 0.3s' }}
                >
                    <Box display={{ base: 'none', md: 'block' }} mb="5">
                        <Image
                            height="160px"
                            width="100%"
                            borderRadius="5px"
                            src={track.cover}
                            alt={`Album cover for ${track.album}`}
                        />
                    </Box>
                    <Text fontWeight="bold">{track.title}</Text>
                    <Text>
                        Artist: <Link href={`/artist/${track.artistId}`}> {track.artist}</Link>
                    </Text>
                    <Text>Album: {track.album}</Text>
                    <Flex align="center">
                        <Icon as={FaClock} mr="1" />
                        <Text>Duration: {track.duration}</Text>
                    </Flex>
                </GridItem>
            ))}
        </Grid>
    );
}

export default TrackList;
