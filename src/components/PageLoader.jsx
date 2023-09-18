import { Flex, Spinner, Text } from '@chakra-ui/react';

export default function PageLoader({ isLoading, onlySpinner }) {
    const LoaderToShow = () => {
        if (onlySpinner) {
            return <Spinner size="xl" />;
        }

        return (
            <>
                {isLoading ? (
                    <Spinner size="xl" />
                ) : (
                    <Text as="i" fontSize="sm" color="#555555">
                        No data, input a search item, eg: Eminem
                    </Text>
                )}
            </>
        );
    };
    return (
        <Flex
            minH="20rem"
            justifyContent="center"
            alignItems="center"
            borderWidth="1px"
            borderRadius="5px"
        >
            <LoaderToShow />
        </Flex>
    );
}
