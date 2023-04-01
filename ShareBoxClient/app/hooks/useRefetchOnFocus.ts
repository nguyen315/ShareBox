import {useFocusEffect} from '@react-navigation/native';
import React from 'react';

const useRefetchOnFocus = (refetch: () => any) => {
  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    }, [refetch]),
  );
};

export default useRefetchOnFocus;
