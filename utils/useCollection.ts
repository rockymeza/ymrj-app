import * as React from "react";
import firebase from "./firebase";

const db = firebase.firestore();

const useCollection = (
  queryFn,
  dependentBits
): [any[], { isLoading: boolean }] => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const query = React.useMemo(() => queryFn(db), dependentBits);

  React.useEffect(() => {
    setIsLoading(true);

    const unsubscribe = query.onSnapshot(querySnapshot => {
      setIsLoading(false);
      setItems(querySnapshot.docs);
    });

    return unsubscribe;
  }, [query, name]);

  return [items, { isLoading }];
};

export default useCollection;
