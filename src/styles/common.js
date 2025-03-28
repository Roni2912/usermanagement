export const commonStyles = {
    pageContainer: {
      py: 4,
      px: 2,
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
      },
    },
    searchField: {
      mb: 3,
    },
    pagination: {
      mt: 4,
      display: 'flex',
      justifyContent: 'center',
    },
  };