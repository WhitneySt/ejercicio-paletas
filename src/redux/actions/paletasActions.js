import { collection, getDocs } from "firebase/firestore";
import { dataBase } from "../../Firebase/firebaseConfig";
import { paletasTypes } from "../types/userTypes";

const collectionName = "paletas";

export const actionGetPaletasAsync = () => {
  return async (dispatch) => {
    const paletasCollection = collection(dataBase, collectionName);
    const querySnapshot = await getDocs(paletasCollection);
    const paletas = [];
    try {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        paletas.push({
          id: doc.id,
          ...doc.data(),
        });
        //   console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(actionGetPaletasSync(paletas));
    }
  };
};

const actionGetPaletasSync = (paletas) => {
  return {
    type: paletasTypes.PALETAS_GET,
    payload: {
      paletas: paletas,
    },
  };
};
